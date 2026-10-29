/**
 * Global App & Route Guard logic
 */

const App = {
  init() {
    this.initTheme();
    this.bindGlobalEvents();
    this.checkAuthGuard();
    this.renderUserSessionUI();
  },

  // Apply saved theme
  initTheme() {
    const prefs = StorageService.getPreferences();
    document.documentElement.setAttribute('data-theme', prefs.theme || 'light');
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.innerHTML = prefs.theme === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
    }
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    StorageService.savePreferences({ theme: next });
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.innerHTML = next === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
    }
    this.toast(`Switched to ${next} theme`, 'info');
  },

  // Route guarding for demo
  checkAuthGuard() {
    const isAuth = StorageService.isAuthenticated();
    const path = window.location.pathname;

    const publicPaths = ['/', '/login/', '/register/'];
    const isPublic = publicPaths.includes(path);

    if (!isAuth && !isPublic) {
      // Authenticated page accessed without session
      window.location.href = '/login/?redirect=' + encodeURIComponent(path);
    } else if (isAuth && (path === '/login/' || path === '/register/')) {
      // Already logged in visitor
      window.location.href = '/dashboard/';
    }
  },

  renderUserSessionUI() {
    const session = StorageService.getSession();
    if (!session) return;

    const nameEls = document.querySelectorAll('.user-session-name');
    nameEls.forEach(el => el.textContent = session.name);

    const emailEls = document.querySelectorAll('.user-session-email');
    emailEls.forEach(el => el.textContent = session.email);

    const roleEls = document.querySelectorAll('.user-session-role');
    roleEls.forEach(el => el.textContent = session.role || 'Content Strategist');
  },

  logout() {
    StorageService.clearSession();
    window.location.href = '/login/';
  },

  // Toast notification system
  toast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'bi-info-circle';
    if (type === 'success') icon = 'bi-check-circle-fill';
    if (type === 'danger') icon = 'bi-exclamation-triangle-fill';
    if (type === 'warning') icon = 'bi-exclamation-circle-fill';

    toast.innerHTML = `
      <i class="bi ${icon}"></i>
      <span style="flex-grow: 1;">${message}</span>
      <button style="background:none;border:none;color:inherit;cursor:pointer;" onclick="this.parentElement.remove()">
        <i class="bi bi-x"></i>
      </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 4000);
  },

  // Confirmation dialog helper
  confirm(title, message, onConfirm) {
    let modal = document.getElementById('globalConfirmModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'globalConfirmModal';
      modal.className = 'modal-backdrop';
      modal.innerHTML = `
        <div class="modal-card">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmModalTitle">Confirm Action</h5>
            <button type="button" class="btn-icon" onclick="App.closeConfirm()"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="modal-body" id="confirmModalBody">Are you sure?</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="App.closeConfirm()">Cancel</button>
            <button type="button" class="btn btn-danger" id="confirmModalOkBtn">Confirm</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    document.getElementById('confirmModalTitle').textContent = title;
    document.getElementById('confirmModalBody').textContent = message;
    
    const okBtn = document.getElementById('confirmModalOkBtn');
    okBtn.onclick = () => {
      App.closeConfirm();
      if (typeof onConfirm === 'function') onConfirm();
    };

    modal.classList.add('show');
  },

  closeConfirm() {
    const modal = document.getElementById('globalConfirmModal');
    if (modal) modal.classList.remove('show');
  },

  bindGlobalEvents() {
    // Mobile sidebar toggle
    const toggleBtn = document.getElementById('mobileSidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }

    // Close sidebar on click outside on mobile
    document.addEventListener('click', (e) => {
      if (sidebar && sidebar.classList.contains('mobile-open')) {
        if (!sidebar.contains(e.target) && (!toggleBtn || !toggleBtn.contains(e.target))) {
          sidebar.classList.remove('mobile-open');
        }
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

