import { Component } from '../../packages/core/src/index.js';
import { renderIcon } from '../../packages/components/src/index.js';

/**
 * Procurement orders view for procurement teams.
 * Manage purchase orders and supplier relationships.
 * @module ProcurementOrders
 */
export class ProcurementOrders extends Component {
  render() {
    return `
      <div class="procurement-container">
        <header class="view-header">
          <h2 class="title">Procurement Orders</h2>
          <button class="btn-primary-gradient" id="new-order-btn">+ New Order</button>
        </header>

        <!-- Controls -->
        <section class="procurement-controls">
          <div class="card control-card">
            <input type="search" placeholder="Search orders..." class="search-input">
            <select class="filter-select" id="status-filter">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="ordered">Ordered</option>
              <option value="received">Received</option>
            </select>
          </div>
        </section>

        <!-- Orders List -->
        <section class="orders-section">
          <div class="order-card card">
            <div class="order-header">
              <div class="order-info">
                <h4 class="order-number">Order #PO-2026-001</h4>
                <p class="order-date">Created: 20 June 2026</p>
              </div>
              <span class="status-badge status-mint">Ordered</span>
            </div>
            <div class="order-details">
              <div class="detail-row">
                <span class="label">Supplier</span>
                <span class="value">MediCare Supplies Ltd</span>
              </div>
              <div class="detail-row">
                <span class="label">Items</span>
                <span class="value">Sterile Gloves, IV Cannulas, Syringes</span>
              </div>
              <div class="detail-row">
                <span class="label">Total Amount</span>
                <span class="value">485,000</span>
              </div>
              <div class="detail-row">
                <span class="label">Expected Delivery</span>
                <span class="value">28 June 2026</span>
              </div>
            </div>
            <div class="order-actions">
              <button class="btn-sm">View Details</button>
              <button class="btn-sm">Update Status</button>
            </div>
          </div>

          <div class="order-card card">
            <div class="order-header">
              <div class="order-info">
                <h4 class="order-number">Order #PO-2026-002</h4>
                <p class="order-date">Created: 19 June 2026</p>
              </div>
              <span class="status-badge status-butter">Pending Approval</span>
            </div>
            <div class="order-details">
              <div class="detail-row">
                <span class="label">Supplier</span>
                <span class="value">PharmaCo International</span>
              </div>
              <div class="detail-row">
                <span class="label">Items</span>
                <span class="value">Antibiotics, Pain Relief Medications</span>
              </div>
              <div class="detail-row">
                <span class="label">Total Amount</span>
                <span class="value">720,000</span>
              </div>
              <div class="detail-row">
                <span class="label">Expected Delivery</span>
                <span class="value">July 5, 2026</span>
              </div>
            </div>
            <div class="order-actions">
              <button class="btn-sm">Approve</button>
              <button class="btn-sm">Reject</button>
            </div>
          </div>

          <div class="order-card card">
            <div class="order-header">
              <div class="order-info">
                <h4 class="order-number">Order #PO-2026-003</h4>
                <p class="order-date">Created: 18 June 2026</p>
              </div>
              <span class="status-badge status-mint">Received</span>
            </div>
            <div class="order-details">
              <div class="detail-row">
                <span class="label">Supplier</span>
                <span class="value">LabEquip Solutions</span>
              </div>
              <div class="detail-row">
                <span class="label">Items</span>
                <span class="value">Diagnostic Equipment</span>
              </div>
              <div class="detail-row">
                <span class="label">Total Amount</span>
                <span class="value">1,850,000</span>
              </div>
              <div class="detail-row">
                <span class="label">Received Date</span>
                <span class="value">22 June 2026</span>
              </div>
            </div>
            <div class="order-actions">
              <button class="btn-sm">Close Order</button>
            </div>
          </div>
        </section>

        <!-- New Order Modal -->
        <div id="new-order-modal" class="modal hidden">
          <div class="modal-overlay" id="modal-close"></div>
          <div class="modal-content modal-large">
            <div class="modal-header">
              <h3 class="modal-title">Create Purchase Order</h3>
              <button class="btn-icon-close" id="close-modal">${renderIcon('close', { size: 20 })}</button>
            </div>
            <div class="modal-body">
              <div class="field-group">
                <label class="label">Supplier</label>
                <select class="input-field">
                  <option>Select Supplier...</option>
                  <option>MediCare Supplies Ltd</option>
                  <option>PharmaCo International</option>
                  <option>LabEquip Solutions</option>
                </select>
              </div>
              <div class="field-group mt-16">
                <label class="label">Items to Order</label>
                <textarea placeholder="List items..." class="input-field textarea"></textarea>
              </div>
              <div class="field-group mt-16">
                <label class="label">Estimated Cost</label>
                <input type="number" placeholder="0" class="input-field">
              </div>
              <div class="field-group mt-16">
                <label class="label">Expected Delivery Date</label>
                <input type="date" class="input-field">
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
    const newOrderBtn = this.element.querySelector('#new-order-btn');
    const modal = this.element.querySelector('#new-order-modal');
    const closeBtn = this.element.querySelector('#close-modal');
    const overlay = this.element.querySelector('#modal-close');

    if (newOrderBtn && modal) {
      newOrderBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }
    if (overlay && modal) {
      overlay.addEventListener('click', () => modal.classList.add('hidden'));
    }
  }
}

export default ProcurementOrders;
