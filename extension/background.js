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

const translationCache = new Map();

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

function storageGet(defaults) {
  return new Promise((resolve) => chrome.storage.sync.get(defaults, resolve));
}

function storageSet(values) {
  return new Promise((resolve) => chrome.storage.sync.set(values, resolve));
}

function normalizeCacheKey({ provider, targetLanguage, text, endpoint }) {
  return [provider, targetLanguage, endpoint || "", text].join("::");
}

function rememberCache(key, value) {
  translationCache.set(key, value);
  if (translationCache.size <= 500) {
    return;
  }

  const oldestKey = translationCache.keys().next().value;
  translationCache.delete(oldestKey);
}

async function loadSettings() {
  const stored = await storageGet(DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS, ...stored };
}

async function translateWithGoogleGtx(text, targetLanguage, sourceLanguage = "auto") {
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", sourceLanguage || "auto");
  url.searchParams.set("tl", targetLanguage || "tr");
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);

  const response = await fetch(url.toString(), {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error(`Google GTX request failed: ${response.status}`);
  }

  const payload = await response.json();
  const translated = Array.isArray(payload?.[0])
    ? payload[0]
        .map((chunk) => (Array.isArray(chunk) ? chunk[0] : ""))
        .join("")
        .trim()
    : "";

  if (!translated) {
    throw new Error("Google GTX returned an empty translation");
  }

  return translated;
}

async function translateWithLibreTranslate(text, targetLanguage, endpoint, sourceLanguage = "auto") {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      q: text,
      source: sourceLanguage || "auto",
      target: targetLanguage || "tr",
      format: "text"
    })
  });

  if (!response.ok) {
    throw new Error(`LibreTranslate request failed: ${response.status}`);
  }

  const payload = await response.json();
  const translated = typeof payload?.translatedText === "string" ? payload.translatedText.trim() : "";

  if (!translated) {
    throw new Error("LibreTranslate returned an empty translation");
  }

  return translated;
}

async function translateText(request) {
  const settings = await loadSettings();
  const provider = request.provider || settings.translationProvider;
  const targetLanguage =
    normalizeLanguageCode(request.targetLanguage || settings.targetLanguage) || DEFAULT_SETTINGS.targetLanguage;
  const endpoint = request.libreTranslateEndpoint || settings.libreTranslateEndpoint;
  const text = typeof request.text === "string" ? request.text.trim() : "";

  if (!text) {
    throw new Error("No text received for translation");
  }

  const cacheKey = normalizeCacheKey({
    provider,
    targetLanguage,
    endpoint,
    text
  });

  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  let translated;
  if (provider === "libretranslate") {
    translated = await translateWithLibreTranslate(text, targetLanguage, endpoint, request.sourceLanguage);
  } else {
    translated = await translateWithGoogleGtx(text, targetLanguage, request.sourceLanguage);
  }

  rememberCache(cacheKey, translated);
  return translated;
}

chrome.runtime.onInstalled.addListener(async () => {
  const current = await storageGet(DEFAULT_SETTINGS);
  await storageSet({ ...DEFAULT_SETTINGS, ...current });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "translate") {
    translateText(message)
      .then((translation) => {
        sendResponse({
          ok: true,
          translation
        });
      })
      .catch((error) => {
        sendResponse({
          ok: false,
          error: error instanceof Error ? error.message : String(error)
        });
      });

    return true;
  }

  if (message?.type === "getSettings") {
    loadSettings()
      .then((settings) => sendResponse({ ok: true, settings }))
      .catch((error) => {
        sendResponse({
          ok: false,
          error: error instanceof Error ? error.message : String(error)
        });
      });

    return true;
  }

  return false;
});
