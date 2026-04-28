import { renderIcon } from '../../packages/components/src/index.js';
import { Component } from '../../packages/core/src/index.js';


/**
 * LabAndImaging view for clinic staff.
 * Manage lab tests, imaging orders, and results.
 * @module LabAndImaging
 */
export class LabAndImaging extends Component {
  render() {
    const closeIcon = renderIcon('close', { size: 20 });
    return `
      <div class="lab-imaging-container">
        <header class="view-header">
          <h2 class="title">Lab & Imaging</h2>
          <button class="btn-primary-gradient" id="new-order-btn">+ New Order</button>
        </header>

        <!-- Tabs -->
        <nav class="view-tabs">
          <button class="tab-btn active" data-tab="orders">Orders</button>
          <button class="tab-btn" data-tab="results">Results</button>
        </nav>

        <!-- Tab: Orders -->
        <section id="orders" class="tab-content active">
          <div class="card filter-card">
            <input type="search" placeholder="Search patient or order..." class="search-input">
            <select class="filter-select">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div class="orders-list">
            <div class="order-card card">
              <div class="order-header">
                <div class="order-info">
                  <h4 class="order-patient">Alice Nakato (GV-2847)</h4>
                  <p class="order-details">Blood Test • Ordered: Today at 08:30</p>
                </div>
                <span class="status-badge status-mint">In Progress</span>
              </div>
              <div class="order-content">
                <div class="order-item">
                  <p class="label">Tests Required</p>
                  <p class="value">Complete Blood Count (CBC), Lipid Panel</p>
                </div>
                <div class="order-item">
                  <p class="label">Ordered By</p>
                  <p class="value">Dr. Kato</p>
                </div>
              </div>
            </div>

            <div class="order-card card">
              <div class="order-header">
                <div class="order-info">
                  <h4 class="order-patient">Brian Okoro (GV-2831)</h4>
                  <p class="order-details">X-Ray Chest • Ordered: Yesterday</p>
                </div>
                <span class="status-badge status-butter">Pending</span>
              </div>
              <div class="order-content">
                <div class="order-item">
                  <p class="label">Type</p>
                  <p class="value">Chest X-Ray (PA View)</p>
                </div>
                <div class="order-item">
                  <p class="label">Ordered By</p>
                  <p class="value">Dr. Mugisha</p>
                </div>
              </div>
            </div>

            <div class="order-card card">
              <div class="order-header">
                <div class="order-info">
                  <h4 class="order-patient">David Wasswa (GV-2905)</h4>
                  <p class="order-details">Ultrasound • Ordered: 2 days ago</p>
                </div>
                <span class="status-badge status-mint">Completed</span>
              </div>
              <div class="order-content">
                <div class="order-item">
                  <p class="label">Type</p>
                  <p class="value">Abdominal Ultrasound</p>
                </div>
                <div class="order-item">
                  <p class="label">Ordered By</p>
                  <p class="value">Dr. Nalwoga</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Tab: Results -->
        <section id="results" class="tab-content">
          <div class="card filter-card">
            <input type="search" placeholder="Search patient..." class="search-input">
          </div>

          <div class="results-list">
            <div class="result-card card">
              <div class="result-header">
                <div class="result-info">
                  <h4 class="result-patient">Carol Tumusinde (GV-2789)</h4>
                  <p class="result-date">Lab Results • 20 June 2026</p>
                </div>
                <span class="result-status normal">Normal</span>
              </div>
              <div class="result-content">
                <div class="test-item">
                  <p class="test-name">Complete Blood Count</p>
                  <p class="test-value">WBC: 7.5 K/µL (Normal: 4.5-11.0)</p>
                  <p class="test-value">RBC: 4.8 M/µL (Normal: 4.0-5.5)</p>
                </div>
              </div>
              <button class="btn-secondary-hifi mt-12">View Full Results</button>
            </div>

            <div class="result-card card">
              <div class="result-header">
                <div class="result-info">
                  <h4 class="result-patient">Alice Nakato (GV-2847)</h4>
                  <p class="result-date">Lab Results • 18 June 2026</p>
                </div>
                <span class="result-status attention">Attention Required</span>
              </div>
              <div class="result-content">
                <div class="test-item">
                  <p class="test-name">Lipid Panel</p>
                  <p class="test-value">Total Cholesterol: 210 mg/dL (High)</p>
                </div>
              </div>
              <button class="btn-secondary-hifi mt-12">View Full Results</button>
            </div>
          </div>
        </section>

        <!-- New Order Modal -->
        <div id="new-order-modal" class="modal hidden">
          <div class="modal-overlay" id="modal-close"></div>
          <div class="modal-content modal-large">
            <div class="modal-header">
              <h3 class="modal-title">Create Lab/Imaging Order</h3>
              <button class="btn-icon-close" id="close-modal">${closeIcon}</button>
            </div>
            <div class="modal-body">
              <div class="field-group">
                <label class="label">Patient</label>
                <input type="text" placeholder="Search patient..." class="input-field">
              </div>

              <div class="field-group mt-16">
                <label class="label">Order Type</label>
                <select class="input-field">
                  <optgroup label="Laboratory">
                    <option>Complete Blood Count</option>
                    <option>Lipid Panel</option>
                    <option>Glucose Test</option>
                    <option>Thyroid Function</option>
                  </optgroup>
                  <optgroup label="Imaging">
                    <option>X-Ray</option>
                    <option>Ultrasound</option>
                    <option>CT Scan</option>
                    <option>MRI</option>
                  </optgroup>
                </select>
              </div>

              <div class="field-group mt-16">
                <label class="label">Clinical Indication</label>
                <textarea placeholder="Enter reason for test..." class="input-field textarea"></textarea>
              </div>

              <div class="field-group mt-16">
                <label class="label">Priority</label>
                <div class="radio-group">
                  <input type="radio" id="priority-normal" name="priority" checked>
                  <label for="priority-normal">Normal</label>
                  <input type="radio" id="priority-urgent" name="priority">
                  <label for="priority-urgent">Urgent</label>
                </div>
              </div>

              <div class="modal-actions">
                <button class="btn-secondary-hifi">Cancel</button>
                <button class="btn-primary-gradient">Create Order</button>
              </div>
            </div>
          </div>
        </div>
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
        const tabId = btn.dataset.tab;
        this.element.querySelector(`#${tabId}`).classList.add('active');
      });
    });

    // Modal
    const newOrderBtn = this.element.querySelector('#new-order-btn');
    const modal = this.element.querySelector('#new-order-modal');
    const closeModal = this.element.querySelector('#close-modal');
    const modalOverlay = this.element.querySelector('#modal-close');

    if (newOrderBtn && modal) {
      newOrderBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
      });
    }

    if (closeModal && modal) {
      closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }

    if (modalOverlay && modal) {
      modalOverlay.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }
  }
}

export default LabAndImaging;
