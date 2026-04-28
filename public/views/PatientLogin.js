import { Component } from '../../packages/core/src/index.js';

/**
 * PatientLogin view for the public patient portal.
 * @module PatientLogin
 */
export class PatientLogin extends Component {
  render() {
    return `
      <div class="mobile-view patient-login-view">
        <header class="auth-header">
          <div class="auth-header-back">← Landing</div>
          <h2 class="h2">Patient Login</h2>
          <p class="small">Access your health records and appointments</p>
        </header>

        <section class="auth-form-container">
          <div class="card auth-card">
            <div class="field-group">
              <label class="label">Patient ID or Email</label>
              <input type="text" placeholder="GV-XXXXX or email@example.com" class="input-field">
            </div>

            <div class="field-group mt-16">
              <label class="label">Password</label>
              <input type="password" placeholder="Enter your password" class="input-field">
            </div>

            <button class="btn-primary-gradient btn-full mt-24">Login</button>

            <div class="auth-divider">
              <span class="divider-text">or</span>
            </div>

            <button class="btn-secondary-hifi btn-full">Login with Biometrics</button>

            <div class="auth-footer">
              <p class="tiny center mt-24">
                <a href="#" class="link">Forgot your password?</a>
              </p>
              <p class="tiny center mt-12">
                Don't have an account? <a href="#" class="link">Sign up here</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  onMount() {
    const backBtn = this.element.querySelector('.auth-header-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate-landing'));
      });
    }
  }
}

export default PatientLogin;
