import { Component } from '../../packages/core/src/index.js';

/**
 * Administration dashboard for clinic administrators.
 * Manage staff, settings, reports, and system access.
 * @module Administration
 */
export class Administration extends Component {
  render() {
    return `
      <div class="admin-container">
        <header class="view-header">
          <h2 class="title">Administration</h2>
        </header>

        <!-- Admin Tabs -->
        <nav class="view-tabs">
          <button class="tab-btn active" data-tab="staff">Staff Directory</button>
          <button class="tab-btn" data-tab="settings">System Settings</button>
          <button class="tab-btn" data-tab="reports">Reports</button>
          <button class="tab-btn" data-tab="audit">Audit Log</button>
        </nav>

        <!-- Staff Directory -->
        <section id="staff" class="tab-content active">
          <div class="admin-section">
            <div class="section-header">
              <h4 class="section-title">Staff Directory</h4>
              <button class="btn-primary-gradient btn-sm" id="add-staff-btn">+ Add Staff</button>
            </div>
            <div class="card">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dr. James Kato</td>
                    <td>General Physician</td>
                    <td>Clinical</td>
                    <td><span class="status-badge status-mint">Active</span></td>
                    <td>Today, 09:30</td>
                    <td><button class="btn-sm">Edit</button></td>
                  </tr>
                  <tr>
                    <td>Dr. Sarah Mugisha</td>
                    <td>Dentist</td>
                    <td>Dental</td>
                    <td><span class="status-badge status-mint">Active</span></td>
                    <td>Today, 08:15</td>
                    <td><button class="btn-sm">Edit</button></td>
                  </tr>
                  <tr>
                    <td>Nurse Mary Nalwoga</td>
                    <td>Pediatric Nurse</td>
                    <td>Pediatrics</td>
                    <td><span class="status-badge status-mint">Active</span></td>
                    <td>Today, 10:00</td>
                    <td><button class="btn-sm">Edit</button></td>
                  </tr>
                  <tr>
                    <td>Reception - John</td>
                    <td>Front Desk Officer</td>
                    <td>Administration</td>
                    <td><span class="status-badge status-butter">On Leave</span></td>
                    <td>Yesterday, 17:45</td>
                    <td><button class="btn-sm">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- System Settings -->
        <section id="settings" class="tab-content">
          <div class="admin-section">
            <h4 class="section-title">System Configuration</h4>
            <div class="settings-grid">
              <div class="card setting-card">
                <h5 class="setting-title">Clinic Hours</h5>
                <p class="setting-desc">Configure opening and closing times</p>
                <button class="btn-secondary-hifi btn-sm">Configure</button>
              </div>
              <div class="card setting-card">
                <h5 class="setting-title">Appointment Settings</h5>
                <p class="setting-desc">Manage appointment slots and duration</p>
                <button class="btn-secondary-hifi btn-sm">Configure</button>
              </div>
              <div class="card setting-card">
                <h5 class="setting-title">User Permissions</h5>
                <p class="setting-desc">Define role-based access control</p>
                <button class="btn-secondary-hifi btn-sm">Configure</button>
              </div>
              <div class="card setting-card">
                <h5 class="setting-title">Email Templates</h5>
                <p class="setting-desc">Customize automated email messages</p>
                <button class="btn-secondary-hifi btn-sm">Configure</button>
              </div>
              <div class="card setting-card">
                <h5 class="setting-title">Database Backup</h5>
                <p class="setting-desc">Schedule and manage backups</p>
                <button class="btn-secondary-hifi btn-sm">Configure</button>
              </div>
              <div class="card setting-card">
                <h5 class="setting-title">Integration Settings</h5>
                <p class="setting-desc">Connect external services</p>
                <button class="btn-secondary-hifi btn-sm">Configure</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Reports -->
        <section id="reports" class="tab-content">
          <div class="admin-section">
            <div class="section-header">
              <h4 class="section-title">Reports & Analytics</h4>
              <button class="btn-primary-gradient btn-sm">Generate Report</button>
            </div>
            <div class="card">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Report Name</th>
                    <th>Type</th>
                    <th>Generated</th>
                    <th>Period</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monthly Patient Summary</td>
                    <td><span class="badge">Clinical</span></td>
                    <td>20 June 2026</td>
                    <td>June 2026</td>
                    <td><button class="btn-sm">Download</button></td>
                  </tr>
                  <tr>
                    <td>Staff Attendance Report</td>
                    <td><span class="badge">HR</span></td>
                    <td>19 June 2026</td>
                    <td>June 2026</td>
                    <td><button class="btn-sm">Download</button></td>
                  </tr>
                  <tr>
                    <td>Financial Summary</td>
                    <td><span class="badge">Finance</span></td>
                    <td>18 June 2026</td>
                    <td>June 2026</td>
                    <td><button class="btn-sm">Download</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- Audit Log -->
        <section id="audit" class="tab-content">
          <div class="admin-section">
            <h4 class="section-title">System Audit Log</h4>
            <div class="card">
              <div class="audit-list">
                <div class="audit-item">
                  <p class="audit-time">Today, 10:35 AM</p>
                  <p class="audit-action">Dr. Kato viewed patient record: Alice Nakato (GV-2847)</p>
                  <p class="audit-user">User: Dr. James Kato</p>
                </div>
                <div class="audit-item">
                  <p class="audit-time">Today, 09:50 AM</p>
                  <p class="audit-action">New appointment created for Brian Okoro</p>
                  <p class="audit-user">User: Reception - John</p>
                </div>
                <div class="audit-item">
                  <p class="audit-time">Today, 08:30 AM</p>
                  <p class="audit-action">System login by administrator</p>
                  <p class="audit-user">User: Admin Account</p>
                </div>
                <div class="audit-item">
                  <p class="audit-time">Yesterday, 17:45 PM</p>
                  <p class="audit-action">Inventory item updated: Paracetamol stock</p>
                  <p class="audit-user">User: Finance - Sarah</p>
                </div>
              </div>
            </div>
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
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        this.element.querySelector(`#${btn.dataset.tab}`).classList.add('active');
      });
    });
  }
}

export default Administration;
