import { Component } from '../../packages/core/src/index.js';

/**
 * MyAppointments view for the mobile patient portal.
 * @module MyAppointments
 */
export class MyAppointments extends Component {
  render() {
    const appointments = [
      { id: 1, service: 'General consultation', date: '21 Jun 2026', time: '08:30 AM', status: 'Confirmed', statusType: 'mint' },
      { id: 2, service: 'Dental check-up', date: '15 May 2026', time: '02:00 PM', status: 'Completed', statusType: 'success' },
      { id: 3, service: 'Eye exam', date: '02 Apr 2026', time: '10:00 AM', status: 'Cancelled', statusType: 'danger' }
    ];

    return `
      <div class="mobile-view my-appointments-view">
        <header class="mobile-header">
           <h2 class="h2">My Appointments</h2>
           <p class="small">Your medical visit history</p>
        </header>

        <section class="appointments-list">
          ${appointments.map(app => `
            <div class="card appointment-item mt-16">
              <div class="appointment-header">
                <span class="label">${app.service}</span>
                <span class="chip status-${app.statusType}">${app.status}</span>
              </div>
              <div class="appointment-details mt-12">
                <div class="detail-row">
                  <span class="icon-calendar"></span>
                  <span class="small">${app.date}</span>
                </div>
                <div class="detail-row">
                  <span class="icon-clock"></span>
                  <span class="small">${app.time}</span>
                </div>
              </div>
              <div class="appointment-actions mt-16">
                <button class="btn-secondary-hifi">View details</button>
              </div>
            </div>
          `).join('')}
        </section>
      </div>
    `;
  }
}

export default MyAppointments;
