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

const LANGUAGE_OPTIONS = [
  { value: "ar", label: "Arabic" },
  { value: "de", label: "German" },
  { value: "el", label: "Greek" },
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "hi", label: "Hindi" },
  { value: "id", label: "Indonesian" },
  { value: "it", label: "Italian" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "nl", label: "Dutch" },
  { value: "pl", label: "Polish" },
  { value: "pt", label: "Portuguese" },
  { value: "pt-BR", label: "Portuguese (Brazil)" },
  { value: "ro", label: "Romanian" },
  { value: "ru", label: "Russian" },
  { value: "sv", label: "Swedish" },
  { value: "th", label: "Thai" },
  { value: "tr", label: "Turkish" },
  { value: "uk", label: "Ukrainian" },
  { value: "vi", label: "Vietnamese" },
  { value: "zh-CN", label: "Chinese (Simplified)" },
  { value: "zh-TW", label: "Chinese (Traditional)" },
  { value: "custom", label: "Custom code" }
];

function storageGet(defaults) {
  return new Promise((resolve) => chrome.storage.sync.get(defaults, resolve));
}

function storageSet(values) {
  return new Promise((resolve) => chrome.storage.sync.set(values, resolve));
}

function byId(id) {
  return document.getElementById(id);
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

function renderTargetLanguageOptions() {
  const markup = LANGUAGE_OPTIONS
    .map((option) => `<option value="${option.value}">${option.label}</option>`)
    .join("");

  byId("targetLanguage").innerHTML = markup;
  byId("settingsTargetLanguage").innerHTML = markup;
}

function isPresetLanguage(code) {
  return LANGUAGE_OPTIONS.some((option) => option.value === code && option.value !== "custom");
}

function getLanguageLabel(code) {
  const normalized = normalizeLanguageCode(code);
  const option = LANGUAGE_OPTIONS.find((item) => item.value === normalized);
  if (option) {
    return option.label;
  }

  return normalized || "Unknown";
}

function setStatusText(id, text) {
  byId(id).textContent = text;
}

function getTargetLanguageFromInputs(prefix = "") {
  const selectId = prefix ? `${prefix}TargetLanguage` : "targetLanguage";
  const customId = prefix ? `${prefix}CustomTargetLanguage` : "customTargetLanguage";
  const selectedValue = byId(selectId).value;

  return selectedValue === "custom"
    ? normalizeLanguageCode(byId(customId).value) || DEFAULT_SETTINGS.targetLanguage
    : normalizeLanguageCode(selectedValue) || DEFAULT_SETTINGS.targetLanguage;
}

function toggleLibreEndpointVisibility() {
  const visible = byId("translationProvider").value === "libretranslate";
  byId("libreEndpointField").style.display = visible ? "flex" : "none";
}

function toggleCustomLanguageVisibility(prefix = "") {
  const selectId = prefix ? `${prefix}TargetLanguage` : "targetLanguage";
  const fieldId = prefix ? `${prefix}CustomLanguageField` : "customLanguageField";
  const visible = byId(selectId).value === "custom";
  byId(fieldId).style.display = visible ? "flex" : "none";
}

function showScreen(screen) {
  const onboarding = byId("onboardingScreen");
  const settings = byId("settingsScreen");

  onboarding.hidden = screen !== "onboarding";
  settings.hidden = screen !== "settings";
}

function updateLanguageSummary(languageCode) {
  byId("currentLanguageSummary").textContent = getLanguageLabel(languageCode);
}

async function loadSettings() {
  const settings = await storageGet(DEFAULT_SETTINGS);
  const targetLanguage = normalizeLanguageCode(settings.targetLanguage || DEFAULT_SETTINGS.targetLanguage) || DEFAULT_SETTINGS.targetLanguage;
  byId("targetLanguage").value = isPresetLanguage(targetLanguage) ? targetLanguage : "custom";
  byId("customTargetLanguage").value = isPresetLanguage(targetLanguage) ? "" : targetLanguage;
  byId("settingsTargetLanguage").value = isPresetLanguage(targetLanguage) ? targetLanguage : "custom";
  byId("settingsCustomTargetLanguage").value = isPresetLanguage(targetLanguage) ? "" : targetLanguage;
  byId("enabled").checked = Boolean(settings.enabled);
  byId("hideOriginalCaptions").checked = Boolean(settings.hideOriginalCaptions);
  byId("sourceMode").value = settings.sourceMode;
  byId("translationProvider").value = settings.translationProvider;
  byId("libreTranslateEndpoint").value = settings.libreTranslateEndpoint;
  updateLanguageSummary(targetLanguage);
  toggleCustomLanguageVisibility();
  toggleCustomLanguageVisibility("settings");
  toggleLibreEndpointVisibility();

  if (settings.hasCompletedOnboarding) {
    showScreen("settings");
  } else {
    showScreen("onboarding");
  }
}

async function persistSettings() {
  const targetLanguage = getTargetLanguageFromInputs("settings");
  const payload = {
    enabled: byId("enabled").checked,
    hasCompletedOnboarding: true,
    hideOriginalCaptions: byId("hideOriginalCaptions").checked,
    targetLanguage,
    sourceMode: byId("sourceMode").value,
    translationProvider: byId("translationProvider").value,
    libreTranslateEndpoint: byId("libreTranslateEndpoint").value.trim() || DEFAULT_SETTINGS.libreTranslateEndpoint
  };

  await storageSet(payload);
  updateLanguageSummary(targetLanguage);
  toggleCustomLanguageVisibility("settings");
  toggleLibreEndpointVisibility();
  setStatusText("settingsStatus", "Saved");
  window.setTimeout(() => setStatusText("settingsStatus", "Ready"), 900);
}

async function completeOnboarding() {
  const targetLanguage = getTargetLanguageFromInputs();
  const payload = {
    ...DEFAULT_SETTINGS,
    ...(await storageGet(DEFAULT_SETTINGS)),
    hasCompletedOnboarding: true,
    targetLanguage
  };

  await storageSet(payload);
  updateLanguageSummary(targetLanguage);
  setStatusText("saveStatus", "Saved");
  await loadSettings();
  setStatusText("settingsStatus", "Setup complete");
  window.setTimeout(() => setStatusText("settingsStatus", "Ready"), 1200);
}

async function resetOnboarding() {
  const current = await storageGet(DEFAULT_SETTINGS);
  await storageSet({
    ...current,
    hasCompletedOnboarding: false
  });
  setStatusText("settingsStatus", "Setup reopened");
  await loadSettings();
}

async function init() {
  renderTargetLanguageOptions();
  await loadSettings();

  byId("completeOnboardingButton").addEventListener("click", completeOnboarding);
  byId("rerunSetupButton").addEventListener("click", resetOnboarding);

  for (const id of [
    "enabled",
    "hideOriginalCaptions",
    "settingsCustomTargetLanguage",
    "sourceMode",
    "translationProvider",
    "libreTranslateEndpoint"
  ]) {
    byId(id).addEventListener("change", persistSettings);
  }

  byId("targetLanguage").addEventListener("change", () => toggleCustomLanguageVisibility());
  byId("customTargetLanguage").addEventListener("input", () => setStatusText("saveStatus", "Ready"));
  byId("settingsTargetLanguage").addEventListener("change", async () => {
    toggleCustomLanguageVisibility("settings");
    if (byId("settingsTargetLanguage").value !== "custom") {
      await persistSettings();
    }
  });
}

init().catch(() => {
  setStatusText("saveStatus", "Failed to load settings");
  setStatusText("settingsStatus", "Failed to load settings");
});
