import { Component } from '../../packages/core/src/index.js';
import { renderIcon } from '../../packages/components/src/index.js';

/**
 * Staff signup and onboarding for clinic staff.
 * Handles registration for doctors, admin, staff, and front desk roles.
 * @module StaffSignup
 */
export class StaffSignup extends Component {
  constructor() {
    super();
    this.currentStep = 1;
    this.formData = {};
  }

  render() {
    return `
      <div class="clinic-auth-container">
        <div class="auth-card card">
          <div class="signup-progress">
            <div class="progress-step ${this.currentStep >= 1 ? 'active' : ''}">
              <span>1</span>
              <p>Personal Info</p>
            </div>
            <div class="progress-line"></div>
            <div class="progress-step ${this.currentStep >= 2 ? 'active' : ''}">
              <span>2</span>
              <p>Professional</p>
            </div>
            <div class="progress-line"></div>
            <div class="progress-step ${this.currentStep >= 3 ? 'active' : ''}">
              <span>3</span>
              <p>Confirm</p>
            </div>
          </div>

          <form id="signup-form">
            ${this.renderStep()}
          </form>

          <div class="signup-footer">
            <button type="button" id="backBtn" class="btn-secondary-hifi" ${this.currentStep === 1 ? 'style="display: none;"' : ''}>Back</button>
            <button type="button" id="nextBtn" class="btn-primary-gradient">${this.currentStep === 3 ? 'Complete Registration' : 'Next'}</button>
            <button type="button" id="cancelSignup" class="btn-link">Cancel</button>
          </div>
        </div>
      </div>
    `;
  }

  renderStep() {
    if (this.currentStep === 1) {
      return `
        <div class="form-step">
          <h2>Personal Information</h2>
          <div class="form-group">
            <label class="label">First Name</label>
            <input type="text" id="firstName" class="input-field" placeholder="First name" required>
          </div>
          <div class="form-group">
            <label class="label">Last Name</label>
            <input type="text" id="lastName" class="input-field" placeholder="Last name" required>
          </div>
          <div class="form-group">
            <label class="label">Email Address</label>
            <input type="email" id="email" class="input-field" placeholder="your@email.com" required>
          </div>
          <div class="form-group">
            <label class="label">Phone Number</label>
            <input type="tel" id="phone" class="input-field" placeholder="+256 123 456 789" required>
          </div>
        </div>
      `;
    } else if (this.currentStep === 2) {
      return `
        <div class="form-step">
          <h2>Professional Information</h2>
          <div class="form-group">
            <label class="label">Employee ID</label>
            <input type="text" id="employeeId" class="input-field" placeholder="EMP-XXXX-XXXX" required>
          </div>
          <div class="form-group">
            <label class="label">Position/Role</label>
            <select id="role" class="input-field" required>
              <option value="">-- Select your role --</option>
              <option value="admin">Administrator</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse/Staff</option>
              <option value="front-desk">Front Desk</option>
            </select>
          </div>
          <div class="form-group">
            <label class="label">Department</label>
            <select id="department" class="input-field" required>
              <option value="">-- Select department --</option>
              <option value="general">General Medicine</option>
              <option value="cardiology">Cardiology</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="orthopedics">Orthopedics</option>
            </select>
          </div>
          <div class="form-group">
            <label class="label">License/Certification Number</label>
            <input type="text" id="license" class="input-field" placeholder="License number" required>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="form-step">
          <h2>Create Account Credentials</h2>
          <div class="form-group">
            <label class="label">Username</label>
            <input type="text" id="username" class="input-field" placeholder="Choose a username" required>
          </div>
          <div class="form-group">
            <label class="label">Password</label>
            <input type="password" id="password" class="input-field" placeholder="Minimum 8 characters" required>
          </div>
          <div class="form-group">
            <label class="label">Confirm Password</label>
            <input type="password" id="confirmPassword" class="input-field" placeholder="Confirm password" required>
          </div>
          <div class="form-group checkbox">
            <input type="checkbox" id="agreeTerms" class="checkbox-input" required>
            <label for="agreeTerms" class="checkbox-label">I agree to the terms and privacy policy</label>
          </div>
        </div>
      `;
    }
  }

  onMount() {
    const nextBtn = this.element.querySelector('#nextBtn');
    const backBtn = this.element.querySelector('#backBtn');
    const cancelBtn = this.element.querySelector('#cancelSignup');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.handleNext());
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => this.handleBack());
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate-staff-login'));
      });
    }
  }

  handleNext() {
    if (this.validateStep()) {
      this.saveStepData();
      
      if (this.currentStep === 3) {
        this.completeSignup();
      } else {
        this.currentStep++;
        this.refresh();
      }
    }
  }

  handleBack() {
    this.currentStep--;
    this.refresh();
  }

  validateStep() {
    if (this.currentStep === 1) {
      const firstName = this.element.querySelector('#firstName')?.value.trim();
      const lastName = this.element.querySelector('#lastName')?.value.trim();
      const email = this.element.querySelector('#email')?.value.trim();
      const phone = this.element.querySelector('#phone')?.value.trim();

      if (!firstName || !lastName || !email || !phone) {
        alert('Please fill in all personal information fields');
        return false;
      }
      return true;
    } else if (this.currentStep === 2) {
      const employeeId = this.element.querySelector('#employeeId')?.value.trim();
      const role = this.element.querySelector('#role')?.value;
      const department = this.element.querySelector('#department')?.value;
      const license = this.element.querySelector('#license')?.value.trim();

      if (!employeeId || !role || !department || !license) {
        alert('Please fill in all professional information fields');
        return false;
      }
      return true;
    } else if (this.currentStep === 3) {
      const username = this.element.querySelector('#username')?.value.trim();
      const password = this.element.querySelector('#password')?.value;
      const confirmPassword = this.element.querySelector('#confirmPassword')?.value;
      const agreeTerms = this.element.querySelector('#agreeTerms')?.checked;

      if (!username || !password || !confirmPassword) {
        alert('Please fill in all credential fields');
        return false;
      }

      if (password.length < 8) {
        alert('Password must be at least 8 characters');
        return false;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
      }

      if (!agreeTerms) {
        alert('You must agree to the terms and privacy policy');
        return false;
      }

      return true;
    }
    return false;
  }

  saveStepData() {
    if (this.currentStep === 1) {
      this.formData.firstName = this.element.querySelector('#firstName')?.value;
      this.formData.lastName = this.element.querySelector('#lastName')?.value;
      this.formData.email = this.element.querySelector('#email')?.value;
      this.formData.phone = this.element.querySelector('#phone')?.value;
    } else if (this.currentStep === 2) {
      this.formData.employeeId = this.element.querySelector('#employeeId')?.value;
      this.formData.role = this.element.querySelector('#role')?.value;
      this.formData.department = this.element.querySelector('#department')?.value;
      this.formData.license = this.element.querySelector('#license')?.value;
    } else if (this.currentStep === 3) {
      this.formData.username = this.element.querySelector('#username')?.value;
      this.formData.password = this.element.querySelector('#password')?.value;
    }
  }

  completeSignup() {
    console.log('[v0] Staff signup complete:', this.formData);
    alert('Staff account created successfully! Please login with your credentials.');
    window.dispatchEvent(new CustomEvent('staff-signup-success', { detail: this.formData }));
    window.dispatchEvent(new CustomEvent('navigate-staff-login'));
  }

  refresh() {
    this.element.innerHTML = this.render();
    this.onMount();
  }
}

export default StaffSignup;
