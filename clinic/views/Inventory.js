import { Component } from '../../packages/core/src/index.js';
import { renderIcon } from '../../packages/components/src/index.js';

/**
 * Inventory management view for finance/admin teams.
 * Track medical supplies and equipment stock levels.
 * @module Inventory
 */
export class Inventory extends Component {
  render() {
    return `
      <div class="inventory-container">
        <header class="view-header">
          <h2 class="title">Inventory Management</h2>
          <button class="btn-primary-gradient" id="add-item-btn">+ Add Item</button>
        </header>

        <!-- Controls -->
        <section class="inventory-controls">
          <div class="card control-card">
            <input type="search" placeholder="Search items..." class="search-input" id="item-search">
            <select class="filter-select" id="category-filter">
              <option value="">All Categories</option>
              <option value="medications">Medications</option>
              <option value="supplies">Supplies</option>
              <option value="equipment">Equipment</option>
              <option value="consumables">Consumables</option>
            </select>
            <select class="filter-select" id="status-filter">
              <option value="">All Status</option>
              <option value="low">Low Stock</option>
              <option value="normal">Normal</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </section>

        <!-- Inventory Table -->
        <section class="inventory-table-section">
          <div class="card table-card">
            <table class="inventory-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Min Level</th>
                  <th>Status</th>
                  <th>Unit Cost</th>
                  <th>Total Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Paracetamol 500mg</td>
                  <td><span class="badge">Medications</span></td>
                  <td>150 bottles</td>
                  <td>100</td>
                  <td><span class="status-badge status-mint">Normal</span></td>
                  <td>2,500</td>
                  <td>375,000</td>
                  <td><button class="btn-sm">Edit</button></td>
                </tr>
                <tr>
                  <td>Sterile Gloves (Box)</td>
                  <td><span class="badge">Supplies</span></td>
                  <td>45 boxes</td>
                  <td>80</td>
                  <td><span class="status-badge status-butter">Low Stock</span></td>
                  <td>8,500</td>
                  <td>382,500</td>
                  <td><button class="btn-sm">Edit</button></td>
                </tr>
                <tr>
                  <td>IV Cannula 18G</td>
                  <td><span class="badge">Consumables</span></td>
                  <td>8 packs</td>
                  <td>25</td>
                  <td><span class="status-badge status-danger">Critical</span></td>
                  <td>12,000</td>
                  <td>96,000</td>
                  <td><button class="btn-sm">Edit</button></td>
                </tr>
                <tr>
                  <td>ECG Machine</td>
                  <td><span class="badge">Equipment</span></td>
                  <td>2 units</td>
                  <td>1</td>
                  <td><span class="status-badge status-mint">Normal</span></td>
                  <td>850,000</td>
                  <td>1,700,000</td>
                  <td><button class="btn-sm">Edit</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Add/Edit Modal -->
        <div id="add-item-modal" class="modal hidden">
          <div class="modal-overlay" id="modal-close"></div>
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Add Inventory Item</h3>
              <button class="btn-icon-close" id="close-modal">${renderIcon('close', { size: 20 })}</button>
            </div>
            <div class="modal-body">
              <div class="field-group">
                <label class="label">Item Name</label>
                <input type="text" placeholder="e.g., Paracetamol 500mg" class="input-field">
              </div>
              <div class="field-group mt-16">
                <label class="label">Category</label>
                <select class="input-field">
                  <option>Medications</option>
                  <option>Supplies</option>
                  <option>Equipment</option>
                  <option>Consumables</option>
                </select>
              </div>
              <div class="field-group mt-16">
                <label class="label">Current Stock</label>
                <input type="number" placeholder="0" class="input-field">
              </div>
              <div class="field-group mt-16">
                <label class="label">Minimum Level</label>
                <input type="number" placeholder="0" class="input-field">
              </div>
              <div class="field-group mt-16">
                <label class="label">Unit Cost</label>
                <input type="number" placeholder="0" class="input-field">
              </div>
              <div class="modal-actions">
                <button class="btn-secondary-hifi">Cancel</button>
                <button class="btn-primary-gradient">Add Item</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  onMount() {
    const addBtn = this.element.querySelector('#add-item-btn');
    const modal = this.element.querySelector('#add-item-modal');
    const closeBtn = this.element.querySelector('#close-modal');
    const overlay = this.element.querySelector('#modal-close');

    if (addBtn && modal) {
      addBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }
    if (overlay && modal) {
      overlay.addEventListener('click', () => modal.classList.add('hidden'));
    }
  }
}

export default Inventory;
