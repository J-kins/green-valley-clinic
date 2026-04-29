import { Component } from '../../packages/core/src/index.js';
import { renderIcon } from '../../packages/components/src/index.js';

/**
 * Landing view for the public patient portal.
 * Directs patients to login or signup pages.
 * @module Landing
 */
export class Landing extends Component {
  render() {
    const clipboardIcon = renderIcon('clipboard', { size: 40 });
    const chartIcon = renderIcon('chart', { size: 40 });
    const pillIcon = renderIcon('pill', { size: 40 });
    
    return `
      <div class="mobile-view landing-view">
        <header class="landing-hero">
          <div class="landing-hero-content">
            <div class="hero-logo-large">GV</div>
            <h1 class="title">Green Valley Clinic</h1>
            <p class="body">Your health is our priority. Access your medical records, book appointments, and manage your prescriptions anytime.</p>
          </div>
        </header>

        <section class="landing-features">
          <div class="feature-item">
            <div class="feature-icon">${clipboardIcon}</div>
            <h3 class="h3">Easy Booking</h3>
            <p class="small">Schedule appointments in seconds</p>
          </div>

          <div class="feature-item">
            <div class="feature-icon">${chartIcon}</div>
            <h3 class="h3">Health Records</h3>
            <p class="small">View all your medical history safely</p>
          </div>

          <div class="feature-item">
            <div class="feature-icon">${pillIcon}</div>
            <h3 class="h3">Prescriptions</h3>
            <p class="small">Manage and refill medications easily</p>
          </div>
        </section>

        <section class="landing-cta-section">
          <button id="btn-patient-login" class="btn-primary-gradient btn-large">
            Patient Login
          </button>
          <button id="btn-patient-signup" class="btn-secondary-hifi btn-large mt-12">
            New Patient? Sign Up
          </button>
          <p class="tiny center mt-16">For staff login, visit the staff portal</p>
        </section>
      </div>
    `;
  }

  onMount() {
    // Handle patient login button
    const loginBtn = this.element.querySelector('#btn-patient-login');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'patient-login' } }));
      });
    }

    // Handle patient signup button
    const signupBtn = this.element.querySelector('#btn-patient-signup');
    if (signupBtn) {
      signupBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'patient-signup' } }));
      });
    }
  }
}

export default Landing;
