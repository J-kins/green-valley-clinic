import { Component } from '../../core/src/index.js';

/**
 * AuthLayout for Login and Password Reset views.
 * @module AuthLayout
 */
export class AuthLayout extends Component {
  render() {
    return `
      <div class="auth-shell">
        <div class="auth-sidebar grad-primary">
          <div class="floating-circle circle-white"></div>
          <div class="floating-circle circle-lav"></div>
          
          <div class="auth-sidebar-content">
             <h1 class="title">Green Valley Clinic</h1>
             <p class="body dim">Staff access for appointments, records and reports</p>
          </div>
        </div>
        <main id="auth-view-mount" class="auth-main-content">
          <!-- Auth components will be mounted here -->
        </main>
      </div>
    `;
  }
}

export default AuthLayout;
