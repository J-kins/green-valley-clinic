import { renderIcon } from '../../packages/components/src/index.js';
import { Component } from '../../packages/core/src/index.js';


/**
 * PatientDashboard view for the public patient portal.
 * Main dashboard showing appointments, health metrics, and quick actions.
 * @module PatientDashboard
 */
export class PatientDashboard extends Component {
  render() {
    const clockIcon = renderIcon('clock', { size: 16 });
    return `
      <div class="mobile-view patient-dashboard-view">
        <!-- Hero Banner: Next Appointment -->
        <section class="dashboard-hero-banner">
          <div class="hero-card grad-mint-light">
            <h3 class="hero-title">Next Appointment</h3>
            <p class="hero-subtitle">General Consultation with Dr. Kato</p>
            <div class="hero-details">
              <span class="hero-detail">${renderIcon('calendar', { size: 28 })} 21 June 2026</span>
              <span class="hero-detail">${clockIcon} 08:30 AM</span>
            </div>
            <button class="btn-secondary-hifi btn-small mt-12">View & Reschedule</button>
          </div>
        </section>

        <!-- Quick Stats -->
        <section class="patient-stats">
          <div class="stat-mini">
            <p class="stat-value">3</p>
            <p class="stat-label">Appointments</p>
          </div>
          <div class="stat-mini">
            <p class="stat-value">12</p>
            <p class="stat-label">Test Results</p>
          </div>
          <div class="stat-mini">
            <p class="stat-value">5</p>
            <p class="stat-label">Prescriptions</p>
          </div>
          <div class="stat-mini">
            <p class="stat-value">3</p>
            <p class="stat-label">Messages</p>
          </div>
        </section>

        <!-- Health Metrics -->
        <section class="health-section">
          <div class="section-header">
            <h4 class="section-title">Your Health</h4>
            <button class="btn-link">View All</button>
          </div>
          <div class="metrics-grid">
            <div class="metric-card card">
              <p class="metric-label">Blood Pressure</p>
              <p class="metric-value">120/80</p>
              <p class="metric-status">Normal</p>
            </div>
            <div class="metric-card card">
              <p class="metric-label">Heart Rate</p>
              <p class="metric-value">72 bpm</p>
              <p class="metric-status">Normal</p>
            </div>
            <div class="metric-card card">
              <p class="metric-label">Weight</p>
              <p class="metric-value">65 kg</p>
              <p class="metric-status">Stable</p>
            </div>
            <div class="metric-card card">
              <p class="metric-label">BMI</p>
              <p class="metric-value">23.9</p>
              <p class="metric-status">Healthy</p>
            </div>
          </div>
        </section>

        <!-- Recent Activities -->
        <section class="activities-section">
          <div class="section-header">
            <h4 class="section-title">Recent Activity</h4>
          </div>
          <div class="activity-list">
            <div class="activity-item card">
              <div class="activity-badge">${renderIcon('clipboard', { size: 28 })}</div>
              <div class="activity-content">
                <p class="activity-title">Lab Results Available</p>
                <p class="activity-time">3 days ago</p>
              </div>
            </div>
            <div class="activity-item card">
              <div class="activity-badge">${renderIcon('message', { size: 28 })}</div>
              <div class="activity-content">
                <p class="activity-title">Message from Dr. Kato</p>
                <p class="activity-time">5 days ago</p>
              </div>
            </div>
            <div class="activity-item card">
              <div class="activity-badge">${renderIcon('check', { size: 28 })}</div>
              <div class="activity-content">
                <p class="activity-title">Appointment Completed</p>
                <p class="activity-time">1 week ago</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Quick Actions -->
        <section class="quick-actions-section">
          <div class="actions-grid">
            <button class="action-card card" id="book-appointment">
              <span class="action-icon">${renderIcon('calendar', { size: 28 })}</span>
              <p class="action-label">Book Appointment</p>
            </button>
            <button class="action-card card" id="view-records">
              <span class="action-icon">${renderIcon('document', { size: 28 })}</span>
              <p class="action-label">Medical Records</p>
            </button>
            <button class="action-card card" id="view-prescriptions">
              <span class="action-icon">${renderIcon('pill', { size: 28 })}</span>
              <p class="action-label">Prescriptions</p>
            </button>
            <button class="action-card card" id="messages">
              <span class="action-icon">${renderIcon('message', { size: 28 })}</span>
              <p class="action-label">Messages</p>
            </button>
          </div>
        </section>
      </div>
    `;
  }

  onMount() {
    // Quick action buttons
    const bookBtn = this.element.querySelector('#book-appointment');
    const recordsBtn = this.element.querySelector('#view-records');
    const prescriptionsBtn = this.element.querySelector('#view-prescriptions');
    const messagesBtn = this.element.querySelector('#messages');

    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate-booking'));
      });
    }

    if (recordsBtn) {
      recordsBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate-records'));
      });
    }

    if (prescriptionsBtn) {
      prescriptionsBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate-pharmacy'));
      });
    }

    if (messagesBtn) {
      messagesBtn.addEventListener('click', () => {
        alert('Messages feature coming soon');
      });
    }
  }
}

export default PatientDashboard;
