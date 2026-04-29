/**
 * StaffLogin View - Staff authentication with role selection
 * Handles login for doctors, admins, front desk, and other staff
 */

import { Component } from '../../packages/core/src/index.js';
import { sessionManager } from '../../gvc-backend/services/SessionManager.js';

export class StaffLogin extends Component {
  constructor(params = {}) {
    super();
    this.params = params;
    this.loginError = '';
  }

  render() {
    return `
      <div class="staff-login-view">
        <div class="login-container">
          <div class="login-card">
            <div class="login-header">
              <h1>Staff Portal</h1>
              <p>GVC Staff Management System</p>
            </div>

            <form id="staff-login-form" class="login-form">
              <div class="form-group">
                <label for="staff-id">Staff ID or Email</label>
                <input 
                  type="text" 
                  id="staff-id" 
                  name="staff-id" 
                  class="input-field" 
                  placeholder="GVC-STAFF-001 or email@gvc.clinic"
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

              <div class="form-group">
                <label for="role">Your Role</label>
                <select id="role" class="input-field" required>
                  <option value="">Select your role...</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Administrator</option>
                  <option value="front-desk">Front Desk</option>
                  <option value="staff">General Staff</option>
                </select>
              </div>

              ${this.loginError ? `<div class="error-message">${this.loginError}</div>` : ''}

              <button type="submit" class="btn-primary-gradient" id="staff-login-btn">
                Sign In
              </button>
            </form>

            <div class="login-footer">
              <p><a href="#forgot-password" class="forgot-link">Forgot password?</a></p>
              <p><a href="/index.html#home" class="back-link">← Back to Home</a></p>
            </div>
          </div>

          <div class="login-info">
            <h3>Staff Access Only</h3>
            <p>This portal is restricted to authorized Green Valley Clinic staff only.</p>
            <ul>
              <li>Manage patient records</li>
              <li>View appointments and schedules</li>
              <li>Access clinical notes</li>
              <li>Administration tools</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  onMount() {
    const form = this.element.querySelector('#staff-login-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleLogin(e));
    }
  }

  handleLogin(e) {
    e.preventDefault();

    const staffId = this.element.querySelector('#staff-id')?.value || '';
    const password = this.element.querySelector('#password')?.value || '';
    const role = this.element.querySelector('#role')?.value || '';

    if (!staffId || !password || !role) {
      this.loginError = 'Please fill in all fields';
      this.update();
      return;
    }

    console.log('[v0] Staff login attempt:', { staffId, role });

    // Mock staff authentication
    const mockStaff = [
      { id: 's1', staffId: 'GVC-DOC-001', name: 'Dr. Kato', email: 'kato@gvc.clinic', password: 'password123', role: 'doctor' },
      { id: 's2', staffId: 'GVC-ADMIN-001', name: 'Admin User', email: 'admin@gvc.clinic', password: 'password456', role: 'admin' },
      { id: 's3', staffId: 'GVC-DESK-001', name: 'Front Desk', email: 'desk@gvc.clinic', password: 'password789', role: 'front-desk' },
      { id: 's4', staffId: 'GVC-DOC-002', name: 'Dr. Sarah', email: 'sarah@gvc.clinic', password: 'password123', role: 'doctor' }
    ];

    const staff = mockStaff.find(s => 
      (s.staffId === staffId || s.email === staffId) && 
      s.password === password && 
      s.role === role
    );

    if (staff) {
      console.log('[v0] Staff login successful:', staff.name, 'Role:', staff.role);
      sessionManager.createStaffSession(staff);
      this.navigateToDashboard(staff.role);
    } else {
      this.loginError = 'Invalid credentials or role mismatch';
      this.update();
    }
  }

  navigateToDashboard(role) {
    const routeMap = {
      'doctor': 'doctor-dashboard',
      'admin': 'admin-dashboard',
      'front-desk': 'frontdesk-dashboard',
      'staff': 'staff-dashboard'
    };

    const route = routeMap[role] || 'staff-dashboard';
    window.dispatchEvent(new CustomEvent('navigate', { detail: { route } }));
  }
}

export default StaffLogin;
