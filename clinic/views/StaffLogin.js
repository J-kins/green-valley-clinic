import { Component } from '../../packages/core/src/index.js';
import { renderIcon } from '../../packages/components/src/index.js';

/**
 * StaffLogin view for clinic staff portal.
 * Handles authentication for doctors, admin, staff, and front desk roles.
 * @module StaffLogin
 */
export class StaffLogin extends Component {
  constructor() {
    super();
    this.loginError = null;
  }

  render() {
    return `
      <div class="clinic-auth-container">
        <div class="auth-card card">
          <div class="auth-header">
            <h1 class="h1">Green Valley Clinic</h1>
            <p class="subtitle">Staff Portal</p>
          </div>

          <form id="login-form">
            <div class="form-group">
              <label class="label">Employee ID or Username</label>
              <input type="text" id="username" placeholder="Enter your ID or username" class="input-field" required>
            </div>

            <div class="form-group">
              <label class="label">Password</label>
              <input type="password" id="password" placeholder="Enter your password" class="input-field" required>
            </div>

            <div class="form-group checkbox">
              <input type="checkbox" id="remember-me" class="checkbox-input">
              <label for="remember-me" class="checkbox-label">Remember me</label>
            </div>

            ${this.loginError ? `<div class="error-message">${this.loginError}</div>` : ''}

            <button type="submit" class="btn-primary-gradient btn-block mt-16">Sign In</button>

            <div class="auth-divider">or</div>

            <button type="button" id="btn-signup" class="btn-secondary-hifi btn-block">Create Staff Account</button>

            <div class="auth-actions mt-16">
              <button type="button" id="btn-reset" class="btn-link">Forgot password?</button>
              <button type="button" id="btn-help" class="btn-link">Need help?</button>
            </div>
          </form>

          <div class="security-badge">
            <span>${renderIcon('lock', { size: 16 })}</span>
            <p>Secure login with encryption. Your credentials are protected.</p>
          </div>
        </div>

        <!-- Help Modal -->
        <div class="clinic-modal-overlay" id="helpModal" style="display: none;">
          <div class="clinic-modal-content">
            <div class="clinic-modal-header">
              <h2>Help & Support</h2>
              <button class="modal-close" id="closeHelpModal">${renderIcon('close', { size: 24 })}</button>
            </div>
            <div class="clinic-modal-body">
              <p>For account access issues, contact your administrator or use the password reset option.</p>
              <p><strong>Support Email:</strong> support@gvc.clinic</p>
              <p><strong>Support Phone:</strong> +256 123 456 789</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  onMount() {
    const form = this.element.querySelector('#login-form');
    const usernameInput = this.element.querySelector('#username');
    const passwordInput = this.element.querySelector('#password');
    const signupBtn = this.element.querySelector('#btn-signup');
    const resetBtn = this.element.querySelector('#btn-reset');
    const helpBtn = this.element.querySelector('#btn-help');
    const helpModal = this.element.querySelector('#helpModal');
    const closeHelpBtn = this.element.querySelector('#closeHelpModal');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
          this.loginError = 'Please fill in all fields';
          this.onMount();
          return;
        }

        console.log('[v0] Staff login attempt:', { username });
        window.dispatchEvent(new CustomEvent('staff-login-success', { 
          detail: { username, role: 'doctor' } 
        }));
      });
    }

    if (signupBtn) {
      signupBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate-staff-signup'));
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('navigate-password-reset'));
      });
    }

    if (helpBtn) {
      helpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (helpModal) helpModal.style.display = 'flex';
      });
    }

    if (closeHelpBtn) {
      closeHelpBtn.addEventListener('click', () => {
        if (helpModal) helpModal.style.display = 'none';
      });
    }

    if (helpModal) {
      helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) helpModal.style.display = 'none';
      });
    }
  }
}

export default StaffLogin;
