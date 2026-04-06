import { Component } from '../../packages/core/src/index.js';

/**
 * HelpDesk view for the clinic staff portal.
 * @module HelpDesk
 */
export class HelpDesk extends Component {
  render() {
    const tickets = [
      { id: 'TK-001', subject: 'Login issues on mobile app', category: 'Technical', priority: 'High', status: 'Open', date: '2026-04-06' },
      { id: 'TK-002', subject: 'Patient record not syncing', category: 'Data', priority: 'Medium', status: 'In Progress', date: '2026-04-05' },
      { id: 'TK-003', subject: 'Password reset not working', category: 'Technical', priority: 'High', status: 'Open', date: '2026-04-04' },
      { id: 'TK-004', subject: 'Printer connection issue', category: 'Hardware', priority: 'Low', status: 'Resolved', date: '2026-04-02' }
    ];

    return `
      <div class="helpdesk-view dashboard-view-container">
        <header class="view-header">
          <h2 class="title">Help Desk</h2>
          <p class="small">Submit and track technical support tickets</p>
        </header>

        <section class="helpdesk-actions mt-24">
          <button class="btn-primary-gradient" style="width: 100%; padding: 16px;">Create New Ticket</button>
        </section>

        <section class="helpdesk-tickets mt-24">
          <div class="card mt-16">
            <h3 class="h3">Active Tickets</h3>
            <div class="dashboard-table-wrapper mt-16">
              <div class="dashboard-table-row header">
                <span class="label">ID</span>
                <span class="label">Subject</span>
                <span class="label">Priority</span>
                <span class="label">Status</span>
              </div>
              ${tickets.map(ticket => `
                <div class="dashboard-table-row" style="cursor: pointer;">
                  <span class="small bold">${ticket.id}</span>
                  <span class="small">${ticket.subject}</span>
                  <span class="chip status-${ticket.priority === 'High' ? 'danger' : ticket.priority === 'Medium' ? 'warning' : 'success'}">${ticket.priority}</span>
                  <span class="chip status-${ticket.status === 'Resolved' ? 'success' : ticket.status === 'In Progress' ? 'mint' : 'warning'}">${ticket.status}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <section class="helpdesk-faq mt-24">
          <div class="card">
            <h3 class="h3">Frequently Asked Questions</h3>
            <div class="faq-item mt-16">
              <h4 class="h4">How do I reset my password?</h4>
              <p class="body mt-8">Go to the login page and click "Forgot Password". Instructions will be sent to your work email.</p>
            </div>
            <div class="faq-item mt-16">
              <h4 class="h4">How long do tickets take to resolve?</h4>
              <p class="body mt-8">High priority issues: 24 hours. Medium: 48 hours. Low: 1 week.</p>
            </div>
            <div class="faq-item mt-16">
              <h4 class="h4">How do I contact IT support?</h4>
              <p class="body mt-8">Call ext. 5000 or email it-support@greenvalley.clinic</p>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  onMount() {
    const createBtn = this.element.querySelector('button');
    if (createBtn) {
      createBtn.addEventListener('click', () => {
        alert('New ticket creation form would open here.');
      });
    }

    const rows = this.element.querySelectorAll('.dashboard-table-row');
    rows.forEach((row, idx) => {
      if (idx > 0) {
        row.addEventListener('click', () => {
          alert('Viewing ticket details...');
        });
      }
    });
  }
}

export default HelpDesk;
