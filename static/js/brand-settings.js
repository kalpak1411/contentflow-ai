/**
 * Brand Settings JavaScript logic
 * Form binding, validation, save to localStorage, and reset to demo brand.
 */

document.addEventListener("DOMContentLoaded", () => {
  loadBrandForm();
  bindBrandEvents();
});

function loadBrandForm() {
  const brand = StorageService.getBrandSettings();

  document.getElementById("brandName").value = brand.brandName || "";
  document.getElementById("industry").value = brand.industry || "";
  document.getElementById("website").value = brand.website || "";
  document.getElementById("description").value = brand.description || "";
  document.getElementById("targetAudience").value = brand.targetAudience || "";
  document.getElementById("preferredTone").value = brand.preferredTone || "";
  document.getElementById("writingGuidelines").value = brand.writingGuidelines || "";
  document.getElementById("preferredVocabulary").value = brand.preferredVocabulary || "";
  document.getElementById("prohibitedTerms").value = brand.prohibitedTerms || "";
  document.getElementById("emojiPreferences").value = brand.emojiPreferences || "";
  document.getElementById("hashtagPreferences").value = brand.hashtagPreferences || "";
  document.getElementById("defaultCta").value = brand.defaultCta || "";
}

function bindBrandEvents() {
  const form = document.getElementById("brandSettingsForm");
  const resetBtn = document.getElementById("resetBrandBtn");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      saveBrandData();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      App.confirm(
        "Reset Brand Guidelines?",
        "Restore the default Acme Cloud Labs brand profile? Any custom changes will be overwritten.",
        () => {
          StorageService.resetBrandSettings();
          loadBrandForm();
          App.toast("Brand guidelines restored to initial default.", "info");
        }
      );
    });
  }
}

function saveBrandData() {
  const brandName = document.getElementById("brandName").value.trim();
  if (!brandName) {
    App.toast("Brand name is required.", "danger");
    return;
  }

  const payload = {
    brandName,
    industry: document.getElementById("industry").value.trim(),
    website: document.getElementById("website").value.trim(),
    description: document.getElementById("description").value.trim(),
    targetAudience: document.getElementById("targetAudience").value.trim(),
    preferredTone: document.getElementById("preferredTone").value.trim(),
    writingGuidelines: document.getElementById("writingGuidelines").value.trim(),
    preferredVocabulary: document.getElementById("preferredVocabulary").value.trim(),
    prohibitedTerms: document.getElementById("prohibitedTerms").value.trim(),
    emojiPreferences: document.getElementById("emojiPreferences").value.trim(),
    hashtagPreferences: document.getElementById("hashtagPreferences").value.trim(),
    defaultCta: document.getElementById("defaultCta").value.trim()
  };

  StorageService.saveBrandSettings(payload);
  App.toast("Brand guidelines updated and persisted.", "success");
}

