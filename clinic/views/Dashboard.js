import { Component } from '../../packages/core/src/index.js';
import StatCard from '../../packages/components/src/StatCard.js';
import { renderIcon } from '../../packages/components/src/index.js';

/**
 * Doctor Dashboard for Green Valley Clinic.
 * Main dashboard with patient list, search, modals, and responsive design.
 * @module Dashboard
 */
export class Dashboard extends Component {
  constructor() {
    super();
    this.searchResults = [];
    this.filteredPatients = [];
    this.currentFilter = 'all';
  }

  render() {
    const warningIcon = renderIcon('warning', { size: 20 });
    const infoIcon = renderIcon('info', { size: 20 });
    const checkIcon = renderIcon('check', { size: 20 });
    
    return `
      <div class="clinic-dashboard-container">
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
                  <span class="alert-icon">${warningIcon}</span>
                  <div class="alert-content">
                    <p class="alert-title">Pending Confirmation</p>
                    <p class="alert-text">2 appointments need confirmation</p>
                  </div>
                </div>
                <div class="alert-item alert-info">
                  <span class="alert-icon">${infoIcon}</span>
                  <div class="alert-content">
                    <p class="alert-title">Dr. Kato Available</p>
                    <p class="alert-text">After 11:00 AM today</p>
                  </div>
                </div>
                <div class="alert-item alert-success">
                  <span class="alert-icon">${checkIcon}</span>
                  <div class="alert-content">
                    <p class="alert-title">Lab Results Ready</p>
                    <p class="alert-text">For patient Brian Okoro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- MODALS & SEARCH RESULTS -->
        <!-- Patient Action Modal -->
        <div class="clinic-modal-overlay" id="patientActionModal" style="display: none;">
          <div class="clinic-modal-content">
            <div class="clinic-modal-header">
              <h2 id="patientActionTitle">Patient Actions</h2>
              <button class="modal-close" id="closePatientModal">${renderIcon('close', { size: 24 })}</button>
            </div>
            <div class="clinic-modal-body">
              <div class="form-group">
                <label class="label">Select Action</label>
                <select class="input-field" id="actionSelect">
                  <option value="">-- Select an action --</option>
                  <option value="check-in">Check In Patient</option>
                  <option value="view-records">View Medical Records</option>
                  <option value="add-notes">Add Clinical Notes</option>
                  <option value="prescribe">Prescribe Medication</option>
                  <option value="schedule">Schedule Follow-up</option>
                </select>
              </div>
              <div class="form-group">
                <label class="label">Notes</label>
                <textarea class="input-field textarea" placeholder="Add notes here..." id="actionNotes"></textarea>
              </div>
            </div>
            <div class="clinic-modal-footer">
              <button class="btn-secondary-hifi" id="cancelAction">Cancel</button>
              <button class="btn-primary-gradient" id="confirmAction">Confirm</button>
            </div>
          </div>
        </div>

        <!-- Search Results Panel -->
        <div class="clinic-search-results" id="searchResultsPanel" style="display: none;">
          <div class="search-results-header">
            <h3>Search Results</h3>
            <button class="close-search" id="closeSearchResults">${renderIcon('close', { size: 24 })}</button>
          </div>
          <div class="search-results-body" id="searchResultsBody">
            <!-- Results populated dynamically -->
          </div>
        </div>
      </div>
    `;
  }

  onMount() {
    // Initialize stat cards
    new StatCard({ value: '12', label: "Appointments", type: 'primary', icon: 'calendar' }).mount(this.element.querySelector('#stat-appointments'));
    new StatCard({ value: '8', label: "Checked In", type: 'peach', icon: 'user' }).mount(this.element.querySelector('#stat-checked-in'));
    new StatCard({ value: '3', label: "Pending", type: 'yellow', icon: 'clock' }).mount(this.element.querySelector('#stat-pending'));
    new StatCard({ value: '1', label: "Alerts", type: 'danger', icon: 'alert' }).mount(this.element.querySelector('#stat-alerts'));

    // Patient search
    const patientSearch = this.element.querySelector('#patient-search');
    if (patientSearch) {
      patientSearch.addEventListener('input', (e) => this.performSearch(e.target.value));
    }

    // Patient list items - click to open modal
    const patientItems = this.element.querySelectorAll('.patient-item');
    patientItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const patientName = item.querySelector('.patient-name').textContent;
        this.openPatientModal(patientName);
      });
    });

    // Status filter
    const statusFilter = this.element.querySelector('#status-filter');
    if (statusFilter) {
      statusFilter.addEventListener('change', (e) => {
        this.currentFilter = e.target.value;
        this.filterPatients(e.target.value);
      });
    }

    // Modal handlers
    const patientModal = this.element.querySelector('#patientActionModal');
    const closePatientBtn = this.element.querySelector('#closePatientModal');
    const cancelBtn = this.element.querySelector('#cancelAction');
    const confirmBtn = this.element.querySelector('#confirmAction');

    if (closePatientBtn) closePatientBtn.addEventListener('click', () => this.closeModal('patientActionModal'));
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeModal('patientActionModal'));
    if (confirmBtn) confirmBtn.addEventListener('click', () => this.handlePatientAction());

    if (patientModal) {
      patientModal.addEventListener('click', (e) => {
        if (e.target === patientModal) this.closeModal('patientActionModal');
      });
    }

    // Quick action buttons
    const actionButtons = this.element.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.textContent.toLowerCase();
        this.handleQuickAction(action);
      });
    });

    // Search results close
    const closeSearchBtn = this.element.querySelector('#closeSearchResults');
    if (closeSearchBtn) {
      closeSearchBtn.addEventListener('click', () => this.closeSearch());
    }
  }

  performSearch(query) {
    console.log('[v0] Dashboard search:', query);
    if (!query || query.length < 2) {
      this.closeSearch();
      return;
    }

    const patientNames = ['Alice Nakato', 'Brian Okoro', 'Carol Tumusinde', 'David Wasswa'];
    this.searchResults = patientNames.filter(name => 
      name.toLowerCase().includes(query.toLowerCase())
    );

    if (this.searchResults.length > 0) {
      this.displaySearchResults(this.searchResults, query);
    }
  }

  displaySearchResults(results, query) {
    const resultsPanel = this.element.querySelector('#searchResultsPanel');
    const resultsBody = this.element.querySelector('#searchResultsBody');

    if (resultsPanel && resultsBody) {
      resultsBody.innerHTML = results.map(result => `
        <div class="search-result-item">
          <div class="result-title">${result}</div>
          <div class="result-description">Appointment scheduled • Click to view details</div>
        </div>
      `).join('');

      resultsPanel.style.display = 'flex';

      // Add click handlers to results
      resultsPanel.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const name = item.querySelector('.result-title').textContent;
          this.openPatientModal(name);
          this.closeSearch();
        });
      });
    }
  }

  closeSearch() {
    const resultsPanel = this.element.querySelector('#searchResultsPanel');
    if (resultsPanel) resultsPanel.style.display = 'none';
  }

  filterPatients(filter) {
    console.log('[v0] Filtering patients:', filter);
    const patientItems = this.element.querySelectorAll('.patient-item');
    
    patientItems.forEach(item => {
      if (filter === '' || filter === 'all') {
        item.style.display = 'flex';
      } else {
        const badge = item.querySelector('.status-badge');
        const badgeClass = badge?.className || '';
        const matches = badgeClass.includes(filter.replace('-', '-'));
        item.style.display = matches ? 'flex' : 'none';
      }
    });
  }

  openPatientModal(patientName) {
    const modal = this.element.querySelector('#patientActionModal');
    const title = this.element.querySelector('#patientActionTitle');
    
    if (title) title.textContent = `Actions for ${patientName}`;
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  closeModal(modalId) {
    const modal = this.element.querySelector(`#${modalId}`);
    if (modal) modal.style.display = 'none';
  }

  handlePatientAction() {
    const actionSelect = this.element.querySelector('#actionSelect');
    const actionNotes = this.element.querySelector('#actionNotes');
    
    const action = actionSelect?.value;
    const notes = actionNotes?.value;

    console.log('[v0] Patient action:', { action, notes });
    
    if (action) {
      alert(`Action "${action}" recorded successfully`);
      this.closeModal('patientActionModal');
    }
  }

  handleQuickAction(action) {
    console.log('[v0] Quick action:', action);
    window.dispatchEvent(new CustomEvent('quick-action', { detail: { action } }));
  }
}

export default Dashboard;
