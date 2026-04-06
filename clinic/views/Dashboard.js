import { Component } from '../../packages/core/src/index.js';
import StatCard from '../../packages/components/src/StatCard.js';

/**
 * Dashboard view for Green Valley Clinic.
 * @module Dashboard
 */
export class Dashboard extends Component {
  render() {
    return `
      <div class="dashboard-view-container">
        <header class="view-header">
          <h2 class="title">Dashboard</h2>
          <p class="small">Daily clinic overview and quick actions</p>
        </header>

        <section class="stats-grid">
          <div id="stat-appointments" class="stat-item"></div>
          <div id="stat-patients" class="stat-item"></div>
          <div id="stat-doctors" class="stat-item"></div>
          <div id="stat-pending" class="stat-item"></div>
        </section>

        <section class="dashboard-main-grid">
          <div class="main-content-panel">
            <div class="card appointments-card">
              <h3 class="h3">Today's appointments</h3>
              <div class="dashboard-table-wrapper">
                <div class="dashboard-table-row header">
                  <span class="label">Time</span>
                  <span class="label">Patient</span>
                  <span class="label">Doctor</span>
                  <span class="label">Department</span>
                  <span class="label">Status</span>
                </div>
                <div class="dashboard-table-row">
                  <span class="small">08:30</span>
                  <span class="small">Alice N.</span>
                  <span class="small">Dr. Kato</span>
                  <span class="small">General</span>
                  <span class="chip status-success">Confirmed</span>
                </div>
                <div class="dashboard-table-row">
                  <span class="small">09:00</span>
                  <span class="small">Brian O.</span>
                  <span class="small">Dr. Mugisha</span>
                  <span class="small">Dental</span>
                  <span class="chip status-mint">Checked in</span>
                </div>
                <div class="dashboard-table-row">
                  <span class="small">10:00</span>
                  <span class="small">Carol T.</span>
                  <span class="small">Dr. Nalwoga</span>
                  <span class="small">Pediatrics</span>
                  <span class="chip status-warning">Pending</span>
                </div>
              </div>
            </div>
          </div>
          
          <aside class="sidebar-content-panel">
             <div class="card quick-actions-card grad-peach">
                <span class="label">Quick actions</span>
                <ul class="quick-links">
                  <li>Book new appointment</li>
                  <li>Register a patient</li>
                  <li>Search patient records</li>
                  <li>Generate management report</li>
                </ul>
             </div>
             <div class="card notes-card grad-lavender">
                <span class="label">Notes</span>
                <ul class="notes-list">
                  <li>Morning clinic is 76% booked.</li>
                  <li>One doctor becomes free after 11:00.</li>
                  <li>Two appointments need confirmation.</li>
                </ul>
             </div>
          </aside>
        </section>
      </div>
    `;
  }

  onMount() {
    new StatCard({ value: '27', label: "Today's appointments", type: 'primary', icon: 'calendar' }).mount(this.element.querySelector('#stat-appointments'));
    new StatCard({ value: '182', label: "Registered patients", type: 'peach', icon: 'user' }).mount(this.element.querySelector('#stat-patients'));
    new StatCard({ value: '8', label: "Doctors on duty", type: 'lavender', icon: 'doctors' }).mount(this.element.querySelector('#stat-doctors'));
    new StatCard({ value: '11', label: "Pending check-ins", type: 'yellow', icon: 'check' }).mount(this.element.querySelector('#stat-pending'));
  }
}

export default Dashboard;
