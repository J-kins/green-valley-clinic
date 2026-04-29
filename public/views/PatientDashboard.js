import { renderIcon } from '../../packages/components/src/index.js';
import { Component } from '../../packages/core/src/index.js';

/**
 * PatientDashboard view following the exact 3-column SVG layout.
 * Includes modals for actions, search results, and full responsiveness.
 * @module PatientDashboard
 */
export class PatientDashboard extends Component {
  constructor() {
    super();
    this.showBookModal = false;
    this.showVitalModal = false;
    this.currentModal = null;
  }

  render() {
    return `
      <div class="patient-dashboard-view desktop-layout">
        <!-- Navigation Bar -->
        <nav class="dashboard-nav">
          <div class="nav-container">
            <div class="nav-logo">
              <h2 style="color: #2D6D67; margin: 0;">GVC</h2>
            </div>
            <div class="nav-menu">
              <a href="#" class="nav-link active">Home</a>
              <a href="#" class="nav-link">Appointments</a>
              <a href="#" class="nav-link">Records</a>
              <a href="#" class="nav-link">Messages</a>
            </div>
            <div class="nav-right">
              <div class="notification-bell">${renderIcon('bell', { size: 20 })}</div>
              <div class="profile-pill">
                <span>JP</span>
              </div>
            </div>
          </div>
        </nav>

        <!-- Hero Section -->
        <section class="dashboard-hero">
          <div class="hero-content">
            <h1>Welcome back, John Doe</h1>
            <p>Here's your health summary at a glance</p>
            <div class="health-score">
              <div class="score-ring">
                <svg width="80" height="80" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#E0E0E0" stroke-width="8"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#82D1C6" stroke-width="8" stroke-dasharray="251.2" stroke-dashoffset="62.8" transform="rotate(-90 50 50)"/>
                </svg>
                <div class="score-text">85%</div>
              </div>
              <div class="score-label">Health Score</div>
            </div>
          </div>
          <div class="hero-banner grad-mint-light">
            <div class="banner-content">
              <h3>Next Appointment</h3>
              <p>General Consultation with Dr. Kato</p>
              <div class="banner-details">
                <span>${renderIcon('calendar', { size: 16 })} 21 June 2026</span>
                <span>${renderIcon('clock', { size: 16 })} 08:30 AM</span>
              </div>
              <button class="btn-secondary-hifi btn-small" id="view-appointment">Reschedule</button>
            </div>
          </div>
        </section>

        <!-- Main Content: 3-Column Layout -->
        <section class="dashboard-content">
          <div class="content-container">
            <!-- LEFT COLUMN: Vitals & Medications -->
            <div class="dashboard-column left-column">
              <!-- My Vitals -->
              <div class="dashboard-card">
                <h3 class="card-title">My Vitals</h3>
                <div class="vitals-grid">
                  <div class="vital-item" id="vital-bp">
                    <p class="vital-label">Blood Pressure</p>
                    <p class="vital-value">120/80</p>
                    <p class="vital-status" style="color: #2D6D67;">Normal</p>
                  </div>
                  <div class="vital-item" id="vital-hr">
                    <p class="vital-label">Heart Rate</p>
                    <p class="vital-value">72 bpm</p>
                    <p class="vital-status" style="color: #2D6D67;">Normal</p>
                  </div>
                  <div class="vital-item" id="vital-weight">
                    <p class="vital-label">Weight</p>
                    <p class="vital-value">65 kg</p>
                    <p class="vital-status" style="color: #2D6D67;">Stable</p>
                  </div>
                  <div class="vital-item" id="vital-bmi">
                    <p class="vital-label">BMI</p>
                    <p class="vital-value">23.9</p>
                    <p class="vital-status" style="color: #2D6D67;">Healthy</p>
                  </div>
                  <div class="vital-item" id="vital-temp">
                    <p class="vital-label">Temperature</p>
                    <p class="vital-value">37°C</p>
                    <p class="vital-status" style="color: #2D6D67;">Normal</p>
                  </div>
                  <div class="vital-item" id="vital-oxygen">
                    <p class="vital-label">Oxygen</p>
                    <p class="vital-value">98%</p>
                    <p class="vital-status" style="color: #2D6D67;">Normal</p>
                  </div>
                </div>
              </div>

              <!-- My Medications -->
              <div class="dashboard-card">
                <div class="card-header">
                  <h3 class="card-title">My Medications</h3>
                  <a href="#" class="btn-link">View All</a>
                </div>
                <div class="medications-list">
                  <div class="medication-item">
                    <div class="med-icon">${renderIcon('pill', { size: 28 })}</div>
                    <div class="med-content">
                      <p class="med-name">Aspirin</p>
                      <p class="med-dose">100mg • Once daily</p>
                    </div>
                  </div>
                  <div class="medication-item">
                    <div class="med-icon">${renderIcon('pill', { size: 28 })}</div>
                    <div class="med-content">
                      <p class="med-name">Metformin</p>
                      <p class="med-dose">500mg • Twice daily</p>
                    </div>
                  </div>
                  <div class="medication-item">
                    <div class="med-icon">${renderIcon('pill', { size: 28 })}</div>
                    <div class="med-content">
                      <p class="med-name">Lisinopril</p>
                      <p class="med-dose">10mg • Once daily</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- CENTER COLUMN: Lab Results & Appointments -->
            <div class="dashboard-column center-column">
              <!-- Recent Lab Results -->
              <div class="dashboard-card">
                <div class="card-header">
                  <h3 class="card-title">Recent Lab Results</h3>
                  <a href="#" class="btn-link">View All</a>
                </div>
                <table class="results-table">
                  <thead>
                    <tr>
                      <th>Test Name</th>
                      <th>Result</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Blood Glucose</td>
                      <td>95 mg/dL</td>
                      <td><span class="badge-normal">Normal</span></td>
                    </tr>
                    <tr>
                      <td>Cholesterol</td>
                      <td>180 mg/dL</td>
                      <td><span class="badge-normal">Normal</span></td>
                    </tr>
                    <tr>
                      <td>Hemoglobin</td>
                      <td>13.5 g/dL</td>
                      <td><span class="badge-normal">Normal</span></td>
                    </tr>
                    <tr>
                      <td>Creatinine</td>
                      <td>0.9 mg/dL</td>
                      <td><span class="badge-normal">Normal</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- My Appointments -->
              <div class="dashboard-card">
                <div class="card-header">
                  <h3 class="card-title">My Appointments</h3>
                  <button class="btn-secondary-hifi btn-small" id="book-new-appointment">+ Book</button>
                </div>
                <div class="appointments-list">
                  <div class="appointment-item" id="appt-1">
                    <div class="appt-date">
                      <p class="appt-day">21</p>
                      <p class="appt-month">Jun</p>
                    </div>
                    <div class="appt-details">
                      <p class="appt-title">General Consultation</p>
                      <p class="appt-doctor">Dr. Kato • 08:30 AM</p>
                    </div>
                    <div class="appt-actions">
                      <button class="btn-icon" title="Reschedule">${renderIcon('edit', { size: 18 })}</button>
                    </div>
                  </div>
                  <div class="appointment-item" id="appt-2">
                    <div class="appt-date">
                      <p class="appt-day">28</p>
                      <p class="appt-month">Jun</p>
                    </div>
                    <div class="appt-details">
                      <p class="appt-title">Follow-up Visit</p>
                      <p class="appt-doctor">Dr. Sarah • 02:00 PM</p>
                    </div>
                    <div class="appt-actions">
                      <button class="btn-icon" title="Reschedule">${renderIcon('edit', { size: 18 })}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN: Additional Info -->
            <div class="dashboard-column right-column">
              <!-- Quick Actions -->
              <div class="dashboard-card">
                <h3 class="card-title">Quick Actions</h3>
                <div class="quick-actions">
                  <button class="action-btn" id="download-records">
                    <span>${renderIcon('download', { size: 24 })}</span>
                    <span>Download Records</span>
                  </button>
                  <button class="action-btn" id="message-doctor">
                    <span>${renderIcon('message', { size: 24 })}</span>
                    <span>Message Doctor</span>
                  </button>
                  <button class="action-btn" id="request-refill">
                    <span>${renderIcon('refresh', { size: 24 })}</span>
                    <span>Request Refill</span>
                  </button>
                </div>
              </div>

              <!-- Recent Activity -->
              <div class="dashboard-card">
                <h3 class="card-title">Recent Activity</h3>
                <div class="activity-list">
                  <div class="activity-item">
                    <p class="activity-title">Lab Results Available</p>
                    <p class="activity-time">3 days ago</p>
                  </div>
                  <div class="activity-item">
                    <p class="activity-title">Appointment Completed</p>
                    <p class="activity-time">1 week ago</p>
                  </div>
                  <div class="activity-item">
                    <p class="activity-title">Prescription Refilled</p>
                    <p class="activity-time">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- MODALS & OFF-CANVAS -->
        <!-- Book Appointment Modal -->
        <div class="modal-overlay" id="bookModal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h2>Book an Appointment</h2>
              <button class="modal-close" id="closeBookModal">${renderIcon('close', { size: 24 })}</button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Select Department</label>
                <select class="input-field">
                  <option>General Medicine</option>
                  <option>Cardiology</option>
                  <option>Orthopedics</option>
                  <option>Dermatology</option>
                </select>
              </div>
              <div class="form-group">
                <label>Select Doctor</label>
                <select class="input-field">
                  <option>Dr. Kato</option>
                  <option>Dr. Sarah</option>
                  <option>Dr. Ahmed</option>
                </select>
              </div>
              <div class="form-group">
                <label>Preferred Date</label>
                <input type="date" class="input-field">
              </div>
              <div class="form-group">
                <label>Preferred Time</label>
                <select class="input-field">
                  <option>08:00 AM</option>
                  <option>10:00 AM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                </select>
              </div>
              <div class="form-group">
                <label>Reason for Visit</label>
                <textarea class="input-field textarea" placeholder="Describe your symptoms..."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-secondary-hifi" id="cancelBooking">Cancel</button>
              <button class="btn-primary-gradient">Confirm Booking</button>
            </div>
          </div>
        </div>

        <!-- Vital Details Modal -->
        <div class="modal-overlay" id="vitalModal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h2 id="vitalTitle">Vital Details</h2>
              <button class="modal-close" id="closeVitalModal">${renderIcon('close', { size: 24 })}</button>
            </div>
            <div class="modal-body">
              <div class="vital-detail-chart">
                <p>Historical data chart placeholder</p>
                <p id="vitalHistory">Trend: Stable</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Results Container (Off-Canvas) -->
        <div class="search-results-container" id="searchResults" style="display: none;">
          <div class="search-results-header">
            <h3>Search Results</h3>
            <button class="close-search" id="closeSearch">${renderIcon('close', { size: 24 })}</button>
          </div>
          <div class="search-results-body" id="searchResultsBody">
            <!-- Results will be populated here -->
          </div>
        </div>
      </div>
    `;
  }

  onMount() {
    // Book appointment modal
    const bookBtn = this.element.querySelector('#book-new-appointment');
    const bookModal = this.element.querySelector('#bookModal');
    const closeBookBtn = this.element.querySelector('#closeBookModal');
    const cancelBtn = this.element.querySelector('#cancelBooking');

    if (bookBtn) bookBtn.addEventListener('click', () => this.openModal('bookModal'));
    if (closeBookBtn) closeBookBtn.addEventListener('click', () => this.closeModal('bookModal'));
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeModal('bookModal'));

    // Vital items click to open modal
    const vitalItems = this.element.querySelectorAll('[id^="vital-"]');
    vitalItems.forEach(item => {
      item.addEventListener('click', () => {
        const vitalType = item.id.replace('vital-', '');
        this.openVitalModal(vitalType);
      });
    });

    // Modal close buttons
    const closeVitalBtn = this.element.querySelector('#closeVitalModal');
    if (closeVitalBtn) closeVitalBtn.addEventListener('click', () => this.closeModal('vitalModal'));

    // Appointment items click
    const apptItems = this.element.querySelectorAll('[id^="appt-"]');
    apptItems.forEach(item => {
      item.addEventListener('click', () => this.openModal('bookModal'));
    });

    // Search close
    const closeSearchBtn = this.element.querySelector('#closeSearch');
    if (closeSearchBtn) closeSearchBtn.addEventListener('click', () => this.closeSearch());
  }

  openModal(modalId) {
    const modal = this.element.querySelector(`#${modalId}`);
    if (modal) {
      modal.style.display = 'flex';
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal(modalId);
      });
    }
  }

  closeModal(modalId) {
    const modal = this.element.querySelector(`#${modalId}`);
    if (modal) modal.style.display = 'none';
  }

  openVitalModal(vitalType) {
    const modal = this.element.querySelector('#vitalModal');
    const title = this.element.querySelector('#vitalTitle');
    const history = this.element.querySelector('#vitalHistory');

    const vitalLabels = {
      'bp': 'Blood Pressure',
      'hr': 'Heart Rate',
      'weight': 'Weight',
      'bmi': 'BMI',
      'temp': 'Temperature',
      'oxygen': 'Oxygen Level'
    };

    if (title) title.textContent = vitalLabels[vitalType] || 'Vital Details';
    if (history) history.textContent = `Trend: ${Math.random() > 0.5 ? 'Improving' : 'Stable'}`;
    this.openModal('vitalModal');
  }

  closeSearch() {
    const searchContainer = this.element.querySelector('#searchResults');
    if (searchContainer) searchContainer.style.display = 'none';
  }
}

export default PatientDashboard;
