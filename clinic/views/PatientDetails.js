import { Component } from '../../packages/core/src/index.js';

/**
 * PatientDetails view for clinic staff.
 * Displays comprehensive patient information and medical history.
 * @module PatientDetails
 */
export class PatientDetails extends Component {
  render() {
    return `
      <div class="patient-details-container">
        <header class="view-header">
          <h2 class="title">Patient Details</h2>
          <button class="btn-icon-back" id="back-btn">← Back</button>
        </header>

        <!-- Patient Card -->
        <section class="patient-card-section">
          <div class="card patient-card">
            <div class="patient-header">
              <div class="patient-avatar">AN</div>
              <div class="patient-info">
                <h3 class="patient-name">Alice Nakato</h3>
                <p class="patient-id">Patient ID: GV-2847</p>
                <p class="patient-meta">Age 34 • Female • UG</p>
              </div>
              <div class="patient-status">
                <span class="status-badge status-mint">Active</span>
              </div>
            </div>

            <div class="patient-grid">
              <div class="info-item">
                <span class="label">Phone</span>
                <p class="value">+256 700 123456</p>
              </div>
              <div class="info-item">
                <span class="label">Email</span>
                <p class="value">alice.nakato@email.com</p>
              </div>
              <div class="info-item">
                <span class="label">Blood Type</span>
                <p class="value">O+</p>
              </div>
              <div class="info-item">
                <span class="label">Last Visit</span>
                <p class="value">21 June 2026</p>
              </div>
            </div>

            <div class="patient-actions">
              <button class="btn-secondary-hifi">Edit Details</button>
              <button class="btn-secondary-hifi">Add Note</button>
              <button class="btn-secondary-hifi">Schedule Follow-up</button>
            </div>
          </div>
        </section>

        <!-- Tabs Navigation -->
        <nav class="view-tabs">
          <button class="tab-btn active" data-tab="vitals">Vital Signs</button>
          <button class="tab-btn" data-tab="medical-history">Medical History</button>
          <button class="tab-btn" data-tab="medications">Medications</button>
          <button class="tab-btn" data-tab="notes">Clinical Notes</button>
        </nav>

        <!-- Tab Content: Vital Signs -->
        <section id="vitals" class="tab-content active">
          <div class="card">
            <h4 class="section-title">Latest Vital Signs (Today 09:30)</h4>
            <div class="vitals-grid">
              <div class="vital-item">
                <p class="vital-label">Blood Pressure</p>
                <p class="vital-value">120/80 mmHg</p>
                <p class="vital-status">Normal</p>
              </div>
              <div class="vital-item">
                <p class="vital-label">Heart Rate</p>
                <p class="vital-value">72 bpm</p>
                <p class="vital-status">Normal</p>
              </div>
              <div class="vital-item">
                <p class="vital-label">Temperature</p>
                <p class="vital-value">37.0°C</p>
                <p class="vital-status">Normal</p>
              </div>
              <div class="vital-item">
                <p class="vital-label">O₂ Saturation</p>
                <p class="vital-value">98%</p>
                <p class="vital-status">Normal</p>
              </div>
              <div class="vital-item">
                <p class="vital-label">Weight</p>
                <p class="vital-value">65 kg</p>
                <p class="vital-status">Stable</p>
              </div>
              <div class="vital-item">
                <p class="vital-label">Height</p>
                <p class="vital-value">165 cm</p>
                <p class="vital-status">BMI 23.9</p>
              </div>
            </div>
            <button class="btn-secondary-hifi mt-16">Update Vital Signs</button>
          </div>
        </section>

        <!-- Tab Content: Medical History -->
        <section id="medical-history" class="tab-content">
          <div class="card">
            <h4 class="section-title">Medical History</h4>
            <div class="history-list">
              <div class="history-item">
                <div class="history-date">15 June 2026</div>
                <div class="history-content">
                  <p class="history-title">General Consultation</p>
                  <p class="history-note">Routine check-up. All normal. Follow-up in 3 months.</p>
                </div>
              </div>
              <div class="history-item">
                <div class="history-date">20 May 2026</div>
                <div class="history-content">
                  <p class="history-title">Lab Work</p>
                  <p class="history-note">Blood tests completed. Results within normal range.</p>
                </div>
              </div>
              <div class="history-item">
                <div class="history-date">10 April 2026</div>
                <div class="history-content">
                  <p class="history-title">Dental Checkup</p>
                  <p class="history-note">Cleaning completed. No cavities found.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Tab Content: Medications -->
        <section id="medications" class="tab-content">
          <div class="card">
            <h4 class="section-title">Current Medications</h4>
            <div class="medications-list">
              <div class="medication-item">
                <div class="medication-info">
                  <p class="medication-name">Paracetamol</p>
                  <p class="medication-dose">500mg • Twice daily</p>
                </div>
                <p class="medication-status">Active</p>
              </div>
              <div class="medication-item">
                <div class="medication-info">
                  <p class="medication-name">Vitamin C</p>
                  <p class="medication-dose">500mg • Once daily</p>
                </div>
                <p class="medication-status">Active</p>
              </div>
            </div>
            <button class="btn-secondary-hifi mt-16">Prescribe Medication</button>
          </div>
        </section>

        <!-- Tab Content: Clinical Notes -->
        <section id="notes" class="tab-content">
          <div class="card">
            <h4 class="section-title">Clinical Notes</h4>
            <div class="notes-list">
              <div class="note-item">
                <p class="note-date">Today • 09:45 AM • Dr. Kato</p>
                <p class="note-text">Patient reports feeling well. No new complaints. Continue current treatment plan.</p>
              </div>
            </div>
            <button class="btn-secondary-hifi mt-16">Add Note</button>
          </div>
        </section>
      </div>
    `;
  }

  onMount() {
    // Tab switching
    const tabBtns = this.element.querySelectorAll('.tab-btn');
    const tabContents = this.element.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active to clicked
        btn.classList.add('active');
        const tabId = btn.dataset.tab;
        this.element.querySelector(`#${tabId}`).classList.add('active');
      });
    });

    // Back button
    const backBtn = this.element.querySelector('#back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate-view', { detail: { viewId: 'dashboard' } }));
      });
    }
  }
}

export default PatientDetails;
