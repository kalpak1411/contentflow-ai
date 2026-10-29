/**
 * Auth JavaScript logic
 * Handles demo credentials validation, 1-click demo entry,
 * session creation, and simulation notice alerts.
 */

const DEMO_EMAIL = "demo@contentflow.ai";
const DEMO_PASSWORD = "Demo@123";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const tryDemoBtn = document.getElementById("tryDemoBtn");
  const registerForm = document.getElementById("registerForm");
  const authErrorAlert = document.getElementById("authErrorAlert");

  // Check URL params for quick actions
  const params = new URLSearchParams(window.location.search);
  if (params.get("action") === "demo" && tryDemoBtn) {
    handleDemoLogin();
    return;
  }

  // Login submission
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("emailInput").value.trim();
      const password = document.getElementById("passwordInput").value;

      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        handleSuccessfulLogin({
          email: DEMO_EMAIL,
          name: "Demo Growth Lead"
        });
      } else {
        showError("Invalid demo credentials. Please use the credentials provided or click 'Try Demo Account'.");
      }
    });
  }

  // 1-Click Try Demo Account
  if (tryDemoBtn) {
    tryDemoBtn.addEventListener("click", () => {
      handleDemoLogin();
    });
  }

  // Registration simulation
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("regNameInput").value.trim();
      const email = document.getElementById("regEmailInput").value.trim();

      if (!name || !email) {
        showError("Please fill out all registration fields.");
        return;
      }

      // Simulated local account creation
      handleSuccessfulLogin({
        email: email,
        name: name
      });
    });
  }

  function handleDemoLogin() {
    handleSuccessfulLogin({
      email: DEMO_EMAIL,
      name: "Alex Vance (Demo User)"
    });
  }

  function handleSuccessfulLogin(user) {
    StorageService.setSession(user);
    const redirectUrl = params.get("redirect") || "/dashboard/";
    window.location.href = redirectUrl;
  }

  function showError(msg) {
    if (authErrorAlert) {
      authErrorAlert.textContent = msg;
      authErrorAlert.style.display = "block";
    } else {
      App.toast(msg, "danger");
    }
  }
});

