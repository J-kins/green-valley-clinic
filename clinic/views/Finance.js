import { renderIcon } from '../../packages/components/src/index.js';
import { Component } from '../../packages/core/src/index.js';
import StatCard from '../../packages/components/src/StatCard.js';

/**
 * Finance dashboard for accounting/finance teams.
 * Track revenue, expenses, and billing.
 * @module Finance
 */
export class Finance extends Component {
  render() {
    return `
      <div class="finance-container">
        <header class="view-header">
          <h2 class="title">Financial Dashboard</h2>
          <span class="period-selector">June 2026</span>
        </header>

        <!-- Summary Stats -->
        <section class="finance-stats">
          <div id="stat-revenue" class="stat-item"></div>
          <div id="stat-expenses" class="stat-item"></div>
          <div id="stat-outstanding" class="stat-item"></div>
          <div id="stat-balance" class="stat-item"></div>
        </section>

        <!-- Tabs -->
        <nav class="view-tabs">
          <button class="tab-btn active" data-tab="revenue">Revenue</button>
          <button class="tab-btn" data-tab="expenses">Expenses</button>
          <button class="tab-btn" data-tab="billing">Billing</button>
        </nav>

        <!-- Revenue Tab -->
        <section id="revenue" class="tab-content active">
          <div class="card">
            <h4 class="section-title">Patient Consultations & Services</h4>
            <table class="finance-table">
              <tr>
                <td>General Consultations (125 @ 45,000)</td>
                <td class="amount">5,625,000</td>
              </tr>
              <tr>
                <td>Dental Services (45 @ 75,000)</td>
                <td class="amount">3,375,000</td>
              </tr>
              <tr>
                <td>Lab Work (230 @ 15,000)</td>
                <td class="amount">3,450,000</td>
              </tr>
              <tr>
                <td>Imaging Services (28 @ 85,000)</td>
                <td class="amount">2,380,000</td>
              </tr>
              <tr class="total-row">
                <td>Total Revenue</td>
                <td class="amount">14,830,000</td>
              </tr>
            </table>
          </div>
        </section>

        <!-- Expenses Tab -->
        <section id="expenses" class="tab-content">
          <div class="card">
            <h4 class="section-title">Operational Expenses</h4>
            <table class="finance-table">
              <tr>
                <td>Staff Salaries</td>
                <td class="amount">8,500,000</td>
              </tr>
              <tr>
                <td>Medical Supplies & Equipment</td>
                <td class="amount">2,250,000</td>
              </tr>
              <tr>
                <td>Facility Maintenance</td>
                <td class="amount">750,000</td>
              </tr>
              <tr>
                <td>Utilities (Water, Electricity)</td>
                <td class="amount">450,000</td>
              </tr>
              <tr>
                <td>Insurance & Licensing</td>
                <td class="amount">600,000</td>
              </tr>
              <tr class="total-row">
                <td>Total Expenses</td>
                <td class="amount">12,550,000</td>
              </tr>
            </table>
          </div>
        </section>

        <!-- Billing Tab -->
        <section id="billing" class="tab-content">
          <div class="card">
            <div class="billing-header">
              <h4 class="section-title">Outstanding Bills & Collections</h4>
              <button class="btn-primary-gradient btn-sm">+ Add Bill</button>
            </div>
            <table class="finance-table">
              <tr class="header">
                <td>Patient / Description</td>
                <td>Amount</td>
                <td>Status</td>
                <td>Due Date</td>
              </tr>
              <tr>
                <td>John Smith - Lab Work</td>
                <td class="amount">45,000</td>
                <td><span class="status-badge status-mint">Paid</span></td>
                <td>20 June</td>
              </tr>
              <tr>
                <td>Jane Doe - Consultation</td>
                <td class="amount">85,000</td>
                <td><span class="status-badge status-butter">Pending</span></td>
                <td>25 June</td>
              </tr>
              <tr>
                <td>ABC Corporation - Bulk Billing</td>
                <td class="amount">450,000</td>
                <td><span class="status-badge status-danger">Overdue</span></td>
                <td>15 June</td>
              </tr>
            </table>
          </div>
        </section>
      </div>
    `;
  }

  onMount() {
    // Mount stat cards
    new StatCard({ value: '14.8M', label: "Monthly Revenue", type: 'primary', icon: 'money' }).mount(this.element.querySelector('#stat-revenue'));
    new StatCard({ value: '12.6M', label: "Total Expenses", type: 'peach', icon: 'expenses' }).mount(this.element.querySelector('#stat-expenses'));
    new StatCard({ value: '535K', label: "Outstanding Receivables", type: 'yellow', icon: 'clock' }).mount(this.element.querySelector('#stat-outstanding'));
    new StatCard({ value: '2.2M', label: "Net Balance", type: 'lavender', icon: 'chart' }).mount(this.element.querySelector('#stat-balance'));

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

export default Finance;
