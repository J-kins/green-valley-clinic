import { Component } from '../../packages/core/src/index.js';
import StatCard from '../../packages/components/src/StatCard.js';

/**
 * Dashboard view for Green Valley Clinic.
 * Clean, focused design respecting medical staff workflow.
 * @module Dashboard
 */
export class Dashboard extends Component {
  render() {
    return `
      <div class="dashboard-view-container">
        <!-- Hero Banner: Shift Status -->
        <section class="dashboard-hero">
          <div class="hero-content">
            <h2 class="hero-title">Morning Shift</h2>
            <p class="hero-subtitle">Started at 08:00 • 8 appointments completed • 4 remaining</p>
          </div>
          <div class="hero-status">
            <div class="status-badge">72% Complete</div>
          </div>
        </section>

        <!-- Key Metrics Grid -->
        <section class="dashboard-metrics">
          <div id="stat-appointments" class="stat-item"></div>
          <div id="stat-checked-in" class="stat-item"></div>
          <div id="stat-pending" class="stat-item"></div>
          <div id="stat-alerts" class="stat-item"></div>
        </section>

        <!-- Main Content: 2-Column Layout -->
        <section class="dashboard-content">
          <!-- Left: Patient List -->
          <div class="dashboard-panel left-panel">
            <div class="panel-header">
              <h3 class="h3">Today's Patients</h3>
              <div class="panel-controls">
                <input type="search" placeholder="Search patient..." class="search-input" id="patient-search">
                <select class="filter-select" id="status-filter">
                  <option value="">All Status</option>
                  <option value="checked-in">Checked In</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div class="patients-list">
              <div class="patient-item">
                <div class="patient-info">
                  <div class="patient-name">Alice Nakato</div>
                  <p class="patient-details">08:30 • General • Dr. Kato</p>
                </div>
                <div class="patient-status">
                  <span class="status-badge status-mint">Checked In</span>
                </div>
              </div>

              <div class="patient-item">
                <div class="patient-info">
                  <div class="patient-name">Brian Okoro</div>
                  <p class="patient-details">09:00 • Dental • Dr. Mugisha</p>
                </div>
                <div class="patient-status">
                  <span class="status-badge status-peach">In Progress</span>
                </div>
              </div>

              <div class="patient-item">
                <div class="patient-info">
                  <div class="patient-name">Carol Tumusinde</div>
                  <p class="patient-details">10:00 • Pediatrics • Dr. Nalwoga</p>
                </div>
                <div class="patient-status">
                  <span class="status-badge status-butter">Pending</span>
                </div>
              </div>

              <div class="patient-item">
                <div class="patient-info">
                  <div class="patient-name">David Wasswa</div>
                  <p class="patient-details">10:30 • Lab Work • Dr. Kato</p>
                </div>
                <div class="patient-status">
                  <span class="status-badge status-lavender">Scheduled</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Quick Actions & Alerts -->
          <div class="dashboard-panel right-panel">
            <div class="quick-actions-card card grad-mint-light">
              <h4 class="label">Quick Actions</h4>
              <div class="action-buttons">
                <button class="action-btn">Check In Patient</button>
                <button class="action-btn">Register New Patient</button>
                <button class="action-btn">View Records</button>
                <button class="action-btn">Add Note</button>
              </div>
            </div>

            <div class="alerts-card card mt-16">
              <h4 class="label">Alerts & Notes</h4>
              <div class="alerts-list">
                <div class="alert-item alert-warning">
                  <span class="alert-icon">⚠️</span>
                  <div class="alert-content">
                    <p class="alert-title">Pending Confirmation</p>
                    <p class="alert-text">2 appointments need confirmation</p>
                  </div>
                </div>
                <div class="alert-item alert-info">
                  <span class="alert-icon">ℹ️</span>
                  <div class="alert-content">
                    <p class="alert-title">Dr. Kato Available</p>
                    <p class="alert-text">After 11:00 AM today</p>
                  </div>
                </div>
                <div class="alert-item alert-success">
                  <span class="alert-icon">✅</span>
                  <div class="alert-content">
                    <p class="alert-title">Lab Results Ready</p>
                    <p class="alert-text">For patient Brian Okoro</p>
                  </div>
                </div>
                </div>
                <div class="alert-item alert-info">
                  <span class="alert-icon">ℹ️</span>
                  <div class="alert-content">
                    <p class="alert-title">Dr. Kato Available</p>
                    <p class="alert-text">After 11:00 AM today</p>
                  </div>
                </div>
                <div class="alert-item alert-success">
                  <span class="alert-icon">✅</span>
                  <div class="alert-content">
                    <p class="alert-title">Lab Results Ready</p>
                    <p class="alert-text">For patient Brian Okoro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  onMount() {
    new StatCard({ value: '12', label: "Appointments", type: 'primary', icon: 'calendar' }).mount(this.element.querySelector('#stat-appointments'));
    new StatCard({ value: '8', label: "Checked In", type: 'peach', icon: 'user' }).mount(this.element.querySelector('#stat-checked-in'));
    new StatCard({ value: '3', label: "Pending", type: 'yellow', icon: 'clock' }).mount(this.element.querySelector('#stat-pending'));
    new StatCard({ value: '1', label: "Alerts", type: 'danger', icon: 'alert' }).mount(this.element.querySelector('#stat-alerts'));
  }
}

export default Dashboard;
