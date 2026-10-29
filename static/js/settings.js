/**
 * Settings JavaScript logic
 * Theme toggle, default tone selection, preferred platforms,
 * reset all demo data confirmation, and simulated logout.
 */

document.addEventListener("DOMContentLoaded", () => {
  loadUserSettings();
  bindSettingsEvents();
});

function loadUserSettings() {
  const session = StorageService.getSession() || {};
  const prefs = StorageService.getPreferences();

  // Profile fields
  document.getElementById("profileName").value = session.name || "Demo User";
  document.getElementById("profileEmail").value = session.email || "demo@contentflow.ai";
  document.getElementById("profileRole").value = session.role || "Growth Strategist";

  // Preferences
  document.getElementById("themeSelect").value = prefs.theme || "light";
  document.getElementById("defaultToneSelect").value = prefs.defaultTone || "authoritative";

  // Checkboxes
  const preferredPlatforms = prefs.preferredPlatforms || ["LinkedIn", "Instagram", "Instagram Reels", "YouTube Shorts", "Facebook"];
  document.querySelectorAll("input[name='prefPlatform']").forEach(cb => {
    cb.checked = preferredPlatforms.includes(cb.value);
  });
}

function bindSettingsEvents() {
  const form = document.getElementById("preferencesForm");
  const resetBtn = document.getElementById("resetAllDemoDataBtn");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      saveUserSettings();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      App.confirm(
        "Reset All Demo Data?",
        "This will restore all original 8 sources, 15 posts, the default brand guidelines, and clear any custom edits or audit logs in your browser localStorage. Are you sure?",
        () => {
          StorageService.resetAllDemoData();
          App.toast("All demo data reset to default showcase state.", "info");
          setTimeout(() => window.location.href = "/dashboard/", 1000);
        }
      );
    });
  }
}

function saveUserSettings() {
  const theme = document.getElementById("themeSelect").value;
  const defaultTone = document.getElementById("defaultToneSelect").value;

  const platforms = Array.from(document.querySelectorAll("input[name='prefPlatform']:checked")).map(cb => cb.value);

  // Apply theme immediately
  document.documentElement.setAttribute("data-theme", theme);

  StorageService.savePreferences({
    theme,
    defaultTone,
    preferredPlatforms: platforms
  });

  // Update session profile name
  const session = StorageService.getSession() || {};
  session.name = document.getElementById("profileName").value.trim() || session.name;
  StorageService.setSession(session);
  App.renderUserSessionUI();

  App.toast("Settings saved successfully.", "success");
}

