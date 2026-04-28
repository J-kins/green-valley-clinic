import { renderIcon } from '../../packages/components/src/index.js';
import { Component } from '../../packages/core/src/index.js';


/**
 * BookAppointment view for the mobile patient portal.
 * @module BookAppointment
 */
export class BookAppointment extends Component {
  render() {
    return `
      <div class="mobile-view book-appointment-view">
        <header class="mobile-header">
           <h2 class="h2">Book Appointment</h2>
           <p class="small">Select service, date and time</p>
        </header>

        <section class="booking-form">
          <!-- Appointment Details Card -->
          <div class="card booking-card">
            <span class="label">Appointment details</span>
            
            <div class="field-group">
              <label class="label">Service</label>
              <div class="select-field">
                <span class="small">General consultation</span>
              </div>
            </div>

            <div class="field-row">
              <div class="field-group">
                <label class="label">Schedule</label>
                <div class="select-field date-field">
                   <span class="icon-calendar">${renderIcon('calendar', { size: 18 })}</span>
                   <span class="small">21 Jun 2026</span>
                </div>
              </div>
            </div>

            <div class="field-group">
              <label class="label">Preferred time</label>
              <div class="time-chips">
                <span class="chip status-mint active">Morning</span>
                <span class="chip status-peach">Afternoon</span>
                <span class="chip status-lavender">Evening</span>
              </div>
            </div>
          </div>

          <!-- Patient Details Card -->
          <div class="card booking-card mt-24">
            <span class="label">Patient details</span>
            
            <div class="field-group">
              <label class="label">Full name</label>
              <input type="text" placeholder="Enter full name" class="input-field">
            </div>

            <div class="field-group">
              <label class="label">Phone number</label>
              <input type="tel" placeholder="+256 7XX XXX XXX" class="input-field">
            </div>

            <div class="field-group">
              <label class="label">Email address</label>
              <input type="email" placeholder="name@example.com" class="input-field">
            </div>

            <div class="field-group">
              <label class="label">Notes</label>
              <textarea placeholder="Add short note or symptoms" class="input-field textarea"></textarea>
            </div>
          </div>

          <div class="booking-actions">
            <button class="btn-primary-gradient">Book appointment</button>
            <p class="tiny center mt-16">You can edit this later from My Appointments.</p>
          </div>
        </section>
      </div>
    `;
  }
}

export default BookAppointment;
