(function () {
  const DEFAULT_SETTINGS = {
    enabled: true,
    hasCompletedOnboarding: false,
    targetLanguage: "tr",
    sourceMode: "auto",
    translationProvider: "google_gtx",
    libreTranslateEndpoint: "https://libretranslate.de/translate",
    pollIntervalMs: 350,
    hideOriginalCaptions: true
  };

  const LANGUAGE_NAMES = {
    ar: "Arabic",
    de: "German",
    el: "Greek",
    en: "English",
    es: "Spanish",
    fr: "French",
    hi: "Hindi",
    id: "Indonesian",
    it: "Italian",
    ja: "Japanese",
    ko: "Korean",
    nl: "Dutch",
    pl: "Polish",
    pt: "Portuguese",
    "pt-BR": "Portuguese (Brazil)",
    ro: "Romanian",
    ru: "Russian",
    sv: "Swedish",
    th: "Thai",
    tr: "Turkish",
    uk: "Ukrainian",
    vi: "Vietnamese",
    "zh-CN": "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)"
  };

  const CAPTION_SELECTORS = [
    ".vjs-text-track-display",
    ".shaka-text-container",
    "[data-purpose*='captions']",
    "[class*='captions-display']",
    "[class*='captions-overlay']",
    "[class*='caption-container']"
  ];

  const TRANSCRIPT_SELECTORS = [
    "[data-purpose*='transcript']",
    "[class*='transcript']",
    "[aria-label*='Transcript']",
    "[aria-label*='transcript']"
  ];

  const TRANSCRIPT_ACTIVE_SELECTORS = [
    "[aria-current='true']",
    "[class*='active']",
    "[class*='current']",
    "[class*='selected']",
    "[class*='highlight']",
    "[data-active='true']"
  ];

  const state = {
    settings: { ...DEFAULT_SETTINGS },
    overlay: null,
    overlayHost: null,
    video: null,
    localTranslationCache: new Map(),
    transcriptTimeline: [],
    lastNormalizedSourceText: "",
    lastStatusKey: "",
    lastSourceLabel: "",
    requestSerial: 0,
    idleTicks: 0,
    overlayUpdateScheduled: false,
    lastOverlayBoxKey: "",
    lastTranscriptTimeKey: ""
  };

  function storageGet(defaults) {
    return new Promise((resolve) => chrome.storage.sync.get(defaults, resolve));
  }

  function storageSet(values) {
    return new Promise((resolve) => chrome.storage.sync.set(values, resolve));
  }

  function sendMessage(message) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }

        resolve(response);
      });
    });
  }

  function rememberLocalTranslation(key, value) {
    state.localTranslationCache.set(key, value);
    if (state.localTranslationCache.size <= 300) {
      return;
    }

    const oldestKey = state.localTranslationCache.keys().next().value;
    state.localTranslationCache.delete(oldestKey);
  }

  function normalizeLanguageCode(code) {
    const raw = typeof code === "string" ? code.trim() : "";
    if (!raw) {
      return "";
    }

    return raw
      .replace(/_/g, "-")
      .split("-")
      .filter(Boolean)
      .map((part, index) => {
        if (index === 0) {
          return part.toLowerCase();
        }

        return part.length <= 3 ? part.toUpperCase() : part.toLowerCase();
      })
      .join("-");
  }

  function getTargetLanguageCode() {
    return normalizeLanguageCode(state.settings.targetLanguage) || DEFAULT_SETTINGS.targetLanguage;
  }

  function getTargetLanguageName() {
    const languageCode = getTargetLanguageCode();
    return LANGUAGE_NAMES[languageCode] || LANGUAGE_NAMES[languageCode.split("-")[0]] || languageCode.toUpperCase();
  }

  function getTargetLanguageBadge() {
    const languageCode = getTargetLanguageCode().toUpperCase();
    return languageCode.length <= 5 ? languageCode : languageCode.slice(0, 5);
  }

  function getLocalTranslationCacheKey(text) {
    return `${getTargetLanguageCode()}::${text}`;
  }

  function normalizeWhitespace(text) {
    return (text || "")
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function cleanTranscriptText(text) {
    const flattened = (text || "")
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => line && !/^\d{1,2}:\d{2}(?::\d{2})?$/.test(line))
      .join(" ");

    return normalizeWhitespace(flattened)
      .replace(/\s*-->\s*/g, " ")
      .replace(/\[[^\]]+\]/g, (match) => (match.length <= 24 ? "" : match))
      .trim();
  }

  function parseTimestampToSeconds(raw) {
    const value = normalizeWhitespace(raw);
    if (!value) {
      return null;
    }

    const parts = value.split(":").map((part) => Number.parseInt(part, 10));
    if (parts.some((part) => Number.isNaN(part))) {
      return null;
    }

    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }

    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }

    return null;
  }

  function getTimestampMatches(text) {
    return (text || "").match(/\b\d{1,2}:\d{2}(?::\d{2})?\b/g) || [];
  }

  function extractTranscriptTimelineEntry(element) {
    const rawText = normalizeWhitespace(element.innerText || element.textContent || "");
    if (!rawText) {
      return null;
    }

    const timestampMatches = getTimestampMatches(rawText);
    if (timestampMatches.length !== 1) {
      return null;
    }

    const start = parseTimestampToSeconds(timestampMatches[0]);
    if (start === null) {
      return null;
    }

    const text = cleanTranscriptText(rawText);
    if (!text || text.length < 2) {
      return null;
    }

    return {
      start,
      text
    };
  }

  function cacheTranscriptTimeline(entries) {
    if (!Array.isArray(entries) || !entries.length) {
      return;
    }

    const signature = entries
      .slice(0, 8)
      .map((entry) => `${entry.start}:${entry.text}`)
      .join("|") + `|${entries.length}`;

    if (signature && signature === state.lastTranscriptTimeKey) {
      return;
    }

    const mergedEntries = [
      ...state.transcriptTimeline.map((entry) => ({
        start: entry.start,
        text: entry.text
      })),
      ...entries
    ];

    const deduped = [];
    const seen = new Set();
    for (const entry of mergedEntries) {
      const key = `${entry.start}::${entry.text}`;
      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      deduped.push(entry);
    }

    deduped.sort((left, right) => left.start - right.start);
    state.transcriptTimeline = deduped.map((entry, index) => ({
      start: entry.start,
      text: entry.text,
      end: deduped[index + 1]?.start ?? entry.start + 12
    }));
    state.lastTranscriptTimeKey = signature;
  }

  function isVisible(element) {
    if (!element) {
      return false;
    }

    const style = window.getComputedStyle(element);
    if (style.visibility === "hidden" || style.display === "none" || Number(style.opacity) === 0) {
      return false;
    }

    const rect = element.getBoundingClientRect();
    return rect.width > 4 && rect.height > 4;
  }

  function intersects(a, b) {
    return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
  }

  function findBestVideo() {
    const videos = Array.from(document.querySelectorAll("video"));
    let best = null;
    let bestScore = 0;

    for (const video of videos) {
      const rect = video.getBoundingClientRect();
      const isPlayingSurface = rect.width >= 280 && rect.height >= 160;
      if (!isPlayingSurface) {
        continue;
      }

      const visibleArea = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0)) *
        Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));

      if (visibleArea <= bestScore) {
        continue;
      }

      best = video;
      bestScore = visibleArea;
    }

    return best;
  }

  function ensureOverlay() {
    if (state.overlay) {
      return state.overlay;
    }

    const root = document.createElement("div");
    root.id = "udtr-root";
    root.innerHTML = `
      <div class="udtr-toolbar">
        <button class="udtr-toggle" type="button" data-role="toggle">${getTargetLanguageBadge()}</button>
        <div class="udtr-badge" data-role="badge">Waiting</div>
      </div>
      <div class="udtr-subtitle-shell">
        <div class="udtr-subtitle-stack">
          <div class="udtr-status" data-role="status"></div>
          <div class="udtr-translation" data-role="translation"></div>
        </div>
      </div>
    `;

    document.documentElement.appendChild(root);

    const overlay = {
      root,
      toggleButton: root.querySelector("[data-role='toggle']"),
      badge: root.querySelector("[data-role='badge']"),
      status: root.querySelector("[data-role='status']"),
      translation: root.querySelector("[data-role='translation']")
    };

    overlay.toggleButton.addEventListener("click", async () => {
      state.settings.enabled = !state.settings.enabled;
      await storageSet({ enabled: state.settings.enabled });
      applySettings();
      if (state.settings.enabled) {
        tick();
      }
    });

    state.overlay = overlay;
    state.overlayHost = document.documentElement;
    return overlay;
  }

  function getOverlayHost() {
    return document.fullscreenElement || document.documentElement;
  }

  function syncOverlayMount() {
    const overlay = ensureOverlay();
    const nextHost = getOverlayHost();
    if (state.overlayHost !== nextHost) {
      nextHost.appendChild(overlay.root);
      state.overlayHost = nextHost;
    }

    overlay.root.classList.toggle("udtr-fullscreen", Boolean(document.fullscreenElement));
  }

  function applySettings() {
    const overlay = ensureOverlay();
    overlay.toggleButton.textContent = getTargetLanguageBadge();
    overlay.toggleButton.dataset.enabled = String(state.settings.enabled);
    overlay.badge.textContent = state.settings.enabled ? state.lastSourceLabel || `Target: ${getTargetLanguageName()}` : "Disabled";
    document.documentElement.classList.toggle(
      "udtr-hide-native-captions",
      Boolean(state.settings.enabled && state.settings.hideOriginalCaptions)
    );

    if (!state.settings.enabled) {
      state.lastNormalizedSourceText = "";
      state.requestSerial += 1;
      overlay.translation.textContent = "";
      overlay.status.textContent = "Overlay disabled";
    }
  }

  function updateOverlayPosition() {
    const overlay = ensureOverlay();
    syncOverlayMount();
    state.video = findBestVideo();

    if (document.fullscreenElement) {
      state.lastOverlayBoxKey = "fullscreen";
      overlay.root.classList.add("udtr-visible");
      overlay.root.style.left = "0px";
      overlay.root.style.top = "0px";
      overlay.root.style.width = "100vw";
      overlay.root.style.height = "100vh";
      return;
    }

    if (!state.video) {
      state.lastOverlayBoxKey = "";
      overlay.root.classList.remove("udtr-visible");
      return;
    }

    const rect = state.video.getBoundingClientRect();
    if (rect.width < 20 || rect.height < 20) {
      state.lastOverlayBoxKey = "";
      overlay.root.classList.remove("udtr-visible");
      return;
    }

    overlay.root.classList.add("udtr-visible");
    const nextBoxKey = [
      Math.round(rect.left),
      Math.round(rect.top),
      Math.round(rect.width),
      Math.round(rect.height)
    ].join(":");

    if (nextBoxKey === state.lastOverlayBoxKey) {
      return;
    }

    state.lastOverlayBoxKey = nextBoxKey;
    overlay.root.style.left = `${Math.round(rect.left)}px`;
    overlay.root.style.top = `${Math.round(rect.top)}px`;
    overlay.root.style.width = `${Math.round(rect.width)}px`;
    overlay.root.style.height = `${Math.round(rect.height)}px`;
  }

  function scheduleOverlayPositionUpdate() {
    if (state.overlayUpdateScheduled) {
      return;
    }

    state.overlayUpdateScheduled = true;
    window.requestAnimationFrame(() => {
      state.overlayUpdateScheduled = false;
      updateOverlayPosition();
    });
  }

  function getVideoSearchRoot() {
    if (!state.video) {
      return document.body || document.documentElement;
    }

    return (
      state.video.closest("[data-purpose*='video'], [class*='video-player'], [class*='player'], main") ||
      state.video.parentElement ||
      document.body ||
      document.documentElement
    );
  }

  function getTranscriptSearchRoot() {
    return document.querySelector("main") || document.body || document.documentElement;
  }

  function buildTranscriptTimelineFromContainer(container) {
    const candidateSelectors = [
      "button",
      "[role='button']",
      "li",
      "[data-purpose*='cue']",
      "[data-purpose*='transcript'] button",
      "[class*='cue']",
      "[class*='item']",
      "[class*='row']",
      "[class*='segment']"
    ];

    const rawCandidates = Array.from(container.querySelectorAll(candidateSelectors.join(",")));
    const timelineEntries = rawCandidates
      .filter((element) => {
        if (!isVisible(element)) {
          return false;
        }

        const text = normalizeWhitespace(element.innerText || element.textContent || "");
        const timestampMatches = getTimestampMatches(text);
        return Boolean(text) && timestampMatches.length === 1;
      })
      .map(extractTranscriptTimelineEntry)
      .filter(Boolean);

    if (timelineEntries.length >= 2) {
      cacheTranscriptTimeline(timelineEntries);
    }
  }

  function trackScore(track) {
    const meta = `${track.language || ""} ${track.label || ""}`.toLowerCase();
    let score = 100;

    if (/english|\ben\b/.test(meta)) {
      score -= 40;
    }

    if (meta.startsWith(getTargetLanguageCode().toLowerCase())) {
      score += 25;
    }

    if (track.mode === "showing") {
      score -= 10;
    }

    return score;
  }

  function readFromTextTracks() {
    if (!state.video || !state.video.textTracks?.length) {
      return null;
    }

    const tracks = Array.from(state.video.textTracks)
      .filter((track) => track.kind === "captions" || track.kind === "subtitles" || track.cues?.length)
      .sort((left, right) => trackScore(left) - trackScore(right));

    for (const track of tracks) {
      try {
        if (track.mode === "disabled") {
          track.mode = "hidden";
        }
      } catch (error) {
        // Ignore mode changes that the player rejects.
      }

      const cueText = Array.from(track.activeCues || [])
        .map((cue) => cue.text)
        .join(" ");
      const cleaned = cleanTranscriptText(cueText);

      if (cleaned) {
        return {
          label: "Text track",
          text: cleaned
        };
      }
    }

    return null;
  }

  function captionCandidateScore(element, rect, videoRect, text) {
    const className = `${element.className || ""}`.toLowerCase();
    let score = 0;

    if (/caption|subtitle|track/.test(className)) {
      score += 30;
    }

    if (rect.top >= videoRect.top + videoRect.height * 0.35) {
      score += 18;
    }

    const distanceToCenter = Math.abs((rect.left + rect.width / 2) - (videoRect.left + videoRect.width / 2));
    score -= distanceToCenter / 20;
    score -= Math.max(0, 220 - text.length);

    return score;
  }

  function readFromNativeCaptions() {
    if (!state.video) {
      return null;
    }

    const videoRect = state.video.getBoundingClientRect();
    const searchRoot = getVideoSearchRoot();
    const candidates = Array.from(searchRoot.querySelectorAll(CAPTION_SELECTORS.join(",")));
    let best = null;

    for (const element of candidates) {
      if (!isVisible(element) || state.overlay?.root.contains(element)) {
        continue;
      }

      const rect = element.getBoundingClientRect();
      if (!intersects(rect, videoRect)) {
        continue;
      }

      const text = cleanTranscriptText(element.innerText || element.textContent || "");
      if (!text || text.length < 3) {
        continue;
      }

      const score = captionCandidateScore(element, rect, videoRect, text);
      if (!best || score > best.score) {
        best = { score, text };
      }
    }

    if (!best) {
      return null;
    }

    return {
      label: "Native caption",
      text: best.text
    };
  }

  function readFromTranscriptPanel() {
    const searchRoot = getTranscriptSearchRoot();
    const containers = Array.from(searchRoot.querySelectorAll(TRANSCRIPT_SELECTORS.join(","))).filter(isVisible);

    for (const container of containers) {
      buildTranscriptTimelineFromContainer(container);
      const activeItems = Array.from(container.querySelectorAll(TRANSCRIPT_ACTIVE_SELECTORS.join(",")));
      for (const item of activeItems) {
        const text = cleanTranscriptText(item.innerText || item.textContent || "");
        if (text) {
          return {
            label: "Transcript",
            text
          };
        }
      }
    }

    return null;
  }

  function readFromTranscriptTimelineCache() {
    if (!state.video || !state.transcriptTimeline.length) {
      return null;
    }

    const currentTime = Number.isFinite(state.video.currentTime) ? state.video.currentTime : 0;
    const activeEntry = state.transcriptTimeline.find((entry) => currentTime >= entry.start && currentTime < entry.end);

    if (!activeEntry) {
      return null;
    }

    return {
      label: "Transcript cache",
      text: activeEntry.text
    };
  }

  function resolveSource() {
    const mode = state.settings.sourceMode;

    if (mode === "text_track") {
      return readFromTextTracks();
    }

    if (mode === "native_caption") {
      return readFromNativeCaptions();
    }

    if (mode === "transcript") {
      return readFromTranscriptPanel() || readFromTranscriptTimelineCache();
    }

    return readFromTextTracks() || readFromNativeCaptions() || readFromTranscriptPanel() || readFromTranscriptTimelineCache();
  }

  function setStatus(text, key = text) {
    const overlay = ensureOverlay();
    if (state.lastStatusKey === key) {
      return;
    }

    state.lastStatusKey = key;
    overlay.status.textContent = text;
  }

  function setBadge(text) {
    const overlay = ensureOverlay();
    overlay.badge.textContent = text;
    state.lastSourceLabel = text;
  }

  function setTranslation(text) {
    const overlay = ensureOverlay();
    overlay.translation.textContent = text;
  }

  async function translateSourceText(source) {
    const normalizedText = cleanTranscriptText(source?.text || "");
    if (!normalizedText) {
      return;
    }

    const localCacheKey = getLocalTranslationCacheKey(normalizedText);

    if (normalizedText === state.lastNormalizedSourceText) {
      setBadge(source.label);
      if (!state.overlay?.translation.textContent && state.localTranslationCache.has(localCacheKey)) {
        setTranslation(state.localTranslationCache.get(localCacheKey));
        setStatus(`Live translation active (${getTargetLanguageName()})`, "active");
      }
      return;
    }

    state.lastNormalizedSourceText = normalizedText;
    setBadge(source.label);

    if (state.localTranslationCache.has(localCacheKey)) {
      setTranslation(state.localTranslationCache.get(localCacheKey));
      setStatus(`Live translation active (${getTargetLanguageName()})`, "active");
      return;
    }

    const requestSerial = ++state.requestSerial;
    setStatus(`Translating to ${getTargetLanguageName()}...`, "translating");

    try {
      const response = await sendMessage({
        type: "translate",
        text: normalizedText,
        targetLanguage: getTargetLanguageCode(),
        provider: state.settings.translationProvider,
        libreTranslateEndpoint: state.settings.libreTranslateEndpoint
      });

      if (requestSerial !== state.requestSerial) {
        return;
      }

      if (!response?.ok || !response.translation) {
        throw new Error(response?.error || "Unknown translation error");
      }

      rememberLocalTranslation(localCacheKey, response.translation);
      setTranslation(response.translation);
      setStatus(`Live translation active (${getTargetLanguageName()})`, "active");
    } catch (error) {
      if (requestSerial !== state.requestSerial) {
        return;
      }

      setStatus("Translation service unavailable", "translate-error");
      setBadge("Error");
    }
  }

  async function tick() {
    updateOverlayPosition();
    ensureOverlay();

    if (!state.settings.enabled) {
      return;
    }

    if (!state.video) {
      setStatus("Waiting for the Udemy lecture player", "no-video");
      return;
    }

    const source = resolveSource();
    if (!source) {
      state.idleTicks += 1;
      if (state.idleTicks >= 4) {
        setStatus("Enable captions or open the transcript panel", "no-source");
        setBadge("No source");
      }
      return;
    }

    state.idleTicks = 0;
    await translateSourceText(source);
  }

  async function loadSettings() {
    const stored = await storageGet(DEFAULT_SETTINGS);
    state.settings = {
      ...DEFAULT_SETTINGS,
      ...stored,
      targetLanguage: normalizeLanguageCode(stored.targetLanguage || DEFAULT_SETTINGS.targetLanguage) || DEFAULT_SETTINGS.targetLanguage
    };
    applySettings();
  }

  function observeDom() {
    const observer = new MutationObserver((mutations) => {
      const overlayRoot = state.overlay?.root;
      const hasRelevantMutation = mutations.some((mutation) => {
        if (!overlayRoot) {
          return true;
        }

        return !overlayRoot.contains(mutation.target);
      });

      if (!hasRelevantMutation) {
        return;
      }

      scheduleOverlayPositionUpdate();
    });

    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  async function init() {
    ensureOverlay();
    await loadSettings();
    updateOverlayPosition();
    observeDom();

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== "sync") {
        return;
      }

      let changed = false;
      for (const [key, payload] of Object.entries(changes)) {
        if (!(key in state.settings)) {
          continue;
        }

        state.settings[key] = payload.newValue;
        changed = true;
      }

      if (changed) {
        state.settings.targetLanguage = getTargetLanguageCode();
        state.localTranslationCache.clear();
        state.lastNormalizedSourceText = "";
        state.requestSerial += 1;
        applySettings();
      }
    });

    window.addEventListener("resize", scheduleOverlayPositionUpdate, { passive: true });
    document.addEventListener("fullscreenchange", scheduleOverlayPositionUpdate, { passive: true });
    window.setInterval(scheduleOverlayPositionUpdate, 1000);
    window.setInterval(() => {
      tick().catch(() => {
        setStatus("Unexpected runtime error", "runtime-error");
      });
    }, state.settings.pollIntervalMs);

    tick().catch(() => {
      setStatus("Extension bootstrap failed", "boot-error");
    });
  }

  init().catch(() => {
    // Intentionally silent to avoid noisy errors on unsupported pages.
  });
})();
