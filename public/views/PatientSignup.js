/**
 * PatientSignup View - Patient registration
 * Handles patient account creation
 */

import { Component } from '../../packages/core/src/index.js';
import { sessionManager } from '../../gvc-backend/services/SessionManager.js';

export class PatientSignup extends Component {
  constructor(params = {}) {
    super();
    this.params = params;
    this.signupError = '';
  }

  render() {
    return `
      <div class="patient-signup-view">
        <div class="signup-container">
          <div class="signup-card">
            <div class="signup-header">
              <h1>Create Patient Account</h1>
              <p>Join Green Valley Clinic</p>
            </div>

            <form id="signup-form" class="signup-form">
              <div class="form-group">
                <label for="fullname">Full Name</label>
                <input 
                  type="text" 
                  id="fullname" 
                  name="fullname" 
                  class="input-field" 
                  placeholder="John Doe"
                  required
                >
              </div>

              <div class="form-group">
                <label for="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  class="input-field" 
                  placeholder="john@example.com"
                  required
                >
              </div>

              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  class="input-field" 
                  placeholder="+256 7XX XXX XXX"
                  required
                >
              </div>

              <div class="form-group">
                <label for="dob">Date of Birth</label>
                <input 
                  type="date" 
                  id="dob" 
                  name="dob" 
                  class="input-field"
                  required
                >
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  class="input-field" 
                  placeholder="Create a strong password"
                  required
                >
              </div>

              <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirm-password" 
                  name="confirm-password" 
                  class="input-field" 
                  placeholder="Confirm password"
                  required
                >
              </div>

              <div class="form-group checkbox">
                <label>
                  <input type="checkbox" id="terms-checkbox" required>
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>

              ${this.signupError ? `<div class="error-message">${this.signupError}</div>` : ''}

              <button type="submit" class="btn-primary-gradient" id="signup-btn">
                Create Account
              </button>
            </form>

            <div class="signup-footer">
              <p>Already have an account? <a href="#patient-login" class="login-link">Sign in here</a></p>
              <p><a href="#home" class="back-link">← Back to Home</a></p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  onMount() {
    const form = this.element.querySelector('#signup-form');
    const loginLink = this.element.querySelector('.login-link');
    const backLink = this.element.querySelector('.back-link');

    if (form) {
      form.addEventListener('submit', (e) => this.handleSignup(e));
    }

    if (loginLink) {
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'patient-login' } }));
      });
    }

    if (backLink) {
      backLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'home' } }));
      });
    }
  }

  handleSignup(e) {
    e.preventDefault();

    const fullname = this.element.querySelector('#fullname')?.value || '';
    const email = this.element.querySelector('#email')?.value || '';
    const phone = this.element.querySelector('#phone')?.value || '';
    const dob = this.element.querySelector('#dob')?.value || '';
    const password = this.element.querySelector('#password')?.value || '';
    const confirmPassword = this.element.querySelector('#confirm-password')?.value || '';
    const termsChecked = this.element.querySelector('#terms-checkbox')?.checked || false;

    if (!fullname || !email || !phone || !dob || !password || !confirmPassword) {
      this.signupError = 'Please fill in all fields';
      this.update();
      return;
    }

    if (password !== confirmPassword) {
      this.signupError = 'Passwords do not match';
      this.update();
      return;
    }

    if (!termsChecked) {
      this.signupError = 'Please accept the terms and conditions';
      this.update();
      return;
    }

    console.log('[v0] Patient signup:', { fullname, email, phone, dob });

    // Create patient object
    const newPatient = {
      id: 'p' + Math.random().toString(36).substr(2, 9),
      name: fullname,
      email: email,
      phone: phone,
      dateOfBirth: dob,
      password: password,
      createdAt: new Date()
    };

    // In real app, save to backend
    console.log('[v0] New patient registered:', newPatient);

    // Auto-login after signup
    sessionManager.createPatientSession(newPatient);
    window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'patient-dashboard' } }));
  }
}

export default PatientSignup;
