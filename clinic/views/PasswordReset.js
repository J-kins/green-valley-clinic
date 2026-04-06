import { Component } from '../../packages/core/src/index.js';

/**
 * PasswordReset view for the clinic staff portal.
 * @module PasswordReset
 */
export class PasswordReset extends Component {
  render() {
    return `
      <div class="auth-card card">
        <h2 class="h2">Reset Password</h2>
        <span class="small dim">A reset link will be sent to your work email</span>
        
        <form id="reset-form">
          <div class="field">
            <label class="label">Work email address</label>
            <input type="email" placeholder="name@greenvalley.clinic" class="input-field" required>
          </div>

          <button type="submit" class="btn-primary-gradient mt-16">Send reset link</button>
          
          <div class="auth-actions">
            <button type="button" id="btn-back" class="btn-secondary-hifi">Back to login</button>
          </div>
        </form>

        <div class="security-info mt-32 grad-peach">
          <span class="label">Before you send</span>
          <p class="tiny dim">• Check that the email is typed correctly.</p>
          <p class="tiny dim">• Staff and IT can help if you no longer use that email.</p>
        </div>
      </div>
    `;
  }

  onMount() {
    const backBtn = this.element.querySelector('#btn-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate-login'));
      });
    }

    const form = this.element.querySelector('#reset-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Reset link sent! Check your email.');
        window.dispatchEvent(new CustomEvent('navigate-login'));
      });
    }
  }
}

export default PasswordReset;
