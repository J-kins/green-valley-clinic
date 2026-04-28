import { Component } from '../../packages/core/src/index.js';

/**
 * PatientSignup view for the public patient portal.
 * @module PatientSignup
 */
export class PatientSignup extends Component {
  render() {
    return `
      <div class="mobile-view patient-signup-view">
        <header class="auth-header">
          <div class="auth-header-back">← Landing</div>
          <h2 class="h2">Create Account</h2>
          <p class="small">Join Green Valley Clinic</p>
        </header>

        <section class="auth-form-container">
          <div class="card auth-card">
            <div class="field-group">
              <label class="label">Full Name</label>
              <input type="text" placeholder="John Doe" class="input-field">
            </div>

            <div class="field-group mt-16">
              <label class="label">Email Address</label>
              <input type="email" placeholder="john@example.com" class="input-field">
            </div>

            <div class="field-group mt-16">
              <label class="label">Phone Number</label>
              <input type="tel" placeholder="+256 7XX XXX XXX" class="input-field">
            </div>

            <div class="field-group mt-16">
              <label class="label">Date of Birth</label>
              <input type="date" class="input-field">
            </div>

            <div class="field-group mt-16">
              <label class="label">Password</label>
              <input type="password" placeholder="Create a strong password" class="input-field">
            </div>

            <div class="field-group mt-16">
              <label class="label">Confirm Password</label>
              <input type="password" placeholder="Confirm password" class="input-field">
            </div>

            <div class="checkbox-group mt-16">
              <input type="checkbox" id="terms-checkbox" class="checkbox-input">
              <label for="terms-checkbox" class="small">I agree to the Terms of Service and Privacy Policy</label>
            </div>

            <button class="btn-primary-gradient btn-full mt-24">Create Account</button>

            <div class="auth-footer">
              <p class="tiny center mt-24">
                Already have an account? <a href="#" class="link">Login here</a>
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

export default PatientSignup;
