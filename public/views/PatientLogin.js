/**
 * PatientLogin View - Patient authentication
 * Handles patient login with email/password
 */

import { Component } from '../../packages/core/src/index.js';
import { sessionManager } from '../../gvc-backend/services/SessionManager.js';

export class PatientLogin extends Component {
  constructor(params = {}) {
    super();
    this.params = params;
    this.loginError = '';
  }

  render() {
    return `
      <div class="patient-login-view">
        <div class="login-container">
          <div class="login-card">
            <div class="login-header">
              <h1>Patient Portal</h1>
              <p>Access your medical records and appointments</p>
            </div>

            <form id="login-form" class="login-form">
              <div class="form-group">
                <label for="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  class="input-field" 
                  placeholder="your@email.com"
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
                  placeholder="••••••••"
                  required
                >
              </div>

              <div class="form-options">
                <label class="remember-me">
                  <input type="checkbox" id="remember">
                  Remember me
                </label>
                <a href="#forgot-password" class="forgot-link">Forgot password?</a>
              </div>

              ${this.loginError ? `<div class="error-message">${this.loginError}</div>` : ''}

              <button type="submit" class="btn-primary-gradient" id="login-btn">
                Sign In
              </button>
            </form>

            <div class="login-footer">
              <p>Don&apos;t have an account? <a href="#patient-signup" class="signup-link">Sign up here</a></p>
              <p><a href="#home" class="back-link">← Back to Home</a></p>
            </div>
          </div>

          <div class="login-info">
            <h3>Secure Access</h3>
            <p>Your medical information is protected with industry-standard encryption and security measures.</p>
            <ul>
              <li>View your medical history</li>
              <li>Book appointments</li>
              <li>Access prescriptions</li>
              <li>Communicate with doctors</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  onMount() {
    const form = this.element.querySelector('#login-form');
    const signupLink = this.element.querySelector('.signup-link');
    const backLink = this.element.querySelector('.back-link');

    if (form) {
      form.addEventListener('submit', (e) => this.handleLogin(e));
    }

    if (signupLink) {
      signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'patient-signup' } }));
      });
    }

    if (backLink) {
      backLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'home' } }));
      });
    }
  }

  handleLogin(e) {
    e.preventDefault();
    
    const emailInput = this.element.querySelector('#email');
    const passwordInput = this.element.querySelector('#password');
    const email = emailInput?.value || '';
    const password = passwordInput?.value || '';

    if (!email || !password) {
      this.loginError = 'Please fill in all fields';
      this.update();
      return;
    }

    console.log('[v0] Patient login attempt:', email);

    // Mock authentication - in real app, call backend API
    const mockPatients = [
      { id: 'p1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
      { id: 'p2', name: 'Jane Smith', email: 'jane@example.com', password: 'password456' }
    ];

    const patient = mockPatients.find(p => p.email === email && p.password === password);

    if (patient) {
      console.log('[v0] Login successful for:', email);
      sessionManager.createPatientSession(patient);
      window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'patient-dashboard' } }));
    } else {
      this.loginError = 'Invalid email or password';
      this.update();
    }
  }
}

export default PatientLogin;
