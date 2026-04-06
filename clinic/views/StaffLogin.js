import { Component } from '../../packages/core/src/index.js';

/**
 * StaffLogin view for the clinic staff portal.
 * @module StaffLogin
 */
export class StaffLogin extends Component {
  render() {
    return `
      <div class="auth-card card">
        <h2 class="h2">Staff Login</h2>
        <span class="small dim">Use your work account to continue</span>
        
        <form id="login-form">
          <div class="field">
            <label class="label">Username or employee ID</label>
            <input type="text" placeholder="Enter username" class="input-field" required>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <input type="password" placeholder="Enter password" class="input-field" required>
          </div>

          <button type="submit" class="btn-primary-gradient mt-16">Sign in</button>
          
          <div class="auth-actions">
            <button type="button" id="btn-reset" class="btn-secondary-hifi">Reset</button>
            <button type="button" id="btn-help" class="btn-secondary-hifi grad-peach">Help desk</button>
          </div>
        </form>

        <div class="security-info mt-32">
          <span class="label">Secure access</span>
          <p class="tiny dim">Use your assigned login only. Access is tracked by role and department for audit purposes.</p>
        </div>
      </div>
    `;
  }

  onMount() {
    const form = this.element.querySelector('#login-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Mock success
        window.dispatchEvent(new CustomEvent('login-success'));
      });
    }

    const resetBtn = this.element.querySelector('#btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate-reset'));
      });
    }
  }
}

export default StaffLogin;
