import { Component } from '../../packages/core/src/index.js';
import { renderIcon } from '../../packages/components/src/index.js';

/**
 * Landing view for the public patient portal.
 * Gives patients a clearer, feature-rich entry point before login.
 * @module Landing
 */
export class Landing extends Component {
  render() {
    return `
      <div class="mobile-view landing-view landing-premium">
        <header class="landing-hero">
          <div class="landing-hero-content">
            <div class="hero-logo-large">GV</div>
            <p class="eyebrow">Green Valley Clinic</p>
            <h1 class="title">A simpler way to move through care.</h1>
            <p class="body">Book appointments, review results, manage prescriptions, and stay connected to your care team from one calm, readable place.</p>

            <div class="landing-hero-actions">
              <button id="btn-patient-login" class="btn-primary-gradient btn-large">
                Patient Login
              </button>
              <button id="btn-patient-signup" class="btn-secondary-hifi btn-large">
                Create Account
              </button>
              <a href="#service-highlights" class="btn-secondary-hifi btn-large">
                Explore Services
              </a>
            </div>

            <div class="hero-trust-row">
              <div class="trust-chip">
                <strong>24/7</strong>
                <span>care access</span>
              </div>
              <div class="trust-chip">
                <strong>3 min</strong>
                <span>fast booking</span>
              </div>
              <div class="trust-chip">
                <strong>1 place</strong>
                <span>for records</span>
              </div>
            </div>
          </div>
        </header>

        <section id="service-highlights" class="landing-highlights">
          <div class="feature-tile">
            <div class="feature-icon">${renderIcon('calendar', { size: 20 })}</div>
            <h3 class="h3">Book in minutes</h3>
            <p class="small">See available slots, request follow-ups, and avoid the back-and-forth.</p>
          </div>

          <div class="feature-tile">
            <div class="feature-icon">${renderIcon('chart', { size: 20 })}</div>
            <h3 class="h3">Know what changed</h3>
            <p class="small">Test results, trend summaries, and visit history stay visible together.</p>
          </div>

          <div class="feature-tile">
            <div class="feature-icon">${renderIcon('pill', { size: 20 })}</div>
            <h3 class="h3">Refill without guessing</h3>
            <p class="small">Medication requests and refill status are easy to track from the same space.</p>
          </div>

          <div class="feature-tile">
            <div class="feature-icon">${renderIcon('message', { size: 20 })}</div>
            <h3 class="h3">Message the team</h3>
            <p class="small">Ask a question, share an update, or follow up without losing context.</p>
          </div>
        </section>

        <section class="landing-pathways">
          <article class="pathway-card">
            <div class="pathway-icon">${renderIcon('clipboard', { size: 20 })}</div>
            <div class="pathway-copy">
              <h3 class="h3">Start with your next step</h3>
              <p class="small">Login takes you straight to appointments, records, and what needs attention now.</p>
            </div>
          </article>

          <article class="pathway-card">
            <div class="pathway-icon">${renderIcon('user', { size: 20 })}</div>
            <div class="pathway-copy">
              <h3 class="h3">Keep family access simple</h3>
              <p class="small">Use one account to manage the details that matter to the whole household.</p>
            </div>
          </article>
        </section>

        <section class="landing-cta-section">
          <p class="tiny center">For staff login, use the clinic portal. For patients, login or create an account to continue.</p>
        </section>
      </div>
    `;
  }

  onMount() {
    const loginBtn = this.element.querySelector('#btn-patient-login');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate-patient-login'));
      });
    }

    const signupBtn = this.element.querySelector('#btn-patient-signup');
    if (signupBtn) {
      signupBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate-patient-signup'));
      });
    }
  }
}

export default Landing;
