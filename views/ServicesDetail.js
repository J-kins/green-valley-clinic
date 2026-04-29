/**
 * ServicesDetail View - Dynamic service details page
 * Loads service information from gvc-backend
 */

import { Component } from '../packages/core/src/index.js';
import { renderIcon } from '../packages/components/src/index.js';

export class ServicesDetail extends Component {
  constructor(params = {}) {
    super();
    this.params = params;
    this.serviceId = params?.serviceId || null;
  }

  render() {
    return `
      <div class="service-detail-view">
        <nav class="detail-nav">
          <div class="nav-container">
            <h2 class="nav-logo">GVC</h2>
            <button class="btn-secondary-hifi btn-small" id="back-services">← Back to Services</button>
          </div>
        </nav>

        <section class="detail-header" id="detail-header">
          <!-- Content loaded dynamically -->
        </section>

        <section class="detail-content">
          <div class="detail-main" id="detail-main">
            <!-- Service details loaded dynamically -->
          </div>
          
          <div class="detail-sidebar" id="detail-sidebar">
            <!-- Booking widget loaded dynamically -->
          </div>
        </section>
      </div>
    `;
  }

  onMount() {
    const backBtn = this.element.querySelector('#back-services');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'services' } }));
      });
    }

    this.loadServiceDetail();
  }

  loadServiceDetail() {
    // Mock service data - in real app comes from gvc-backend
    const servicesData = {
      'general-medicine': {
        name: 'General Medicine',
        icon: 'stethoscope',
        price: 'UGX 50,000',
        description: 'Comprehensive primary care for all ages and health conditions',
        details: `
          <h2>General Medicine Overview</h2>
          <p>Our General Medicine department provides comprehensive primary healthcare services for patients of all ages. We focus on prevention, diagnosis, and management of acute and chronic diseases.</p>
          
          <h3>Services Included</h3>
          <ul>
            <li>Physical examinations and health checkups</li>
            <li>Chronic disease management (diabetes, hypertension, etc.)</li>
            <li>Preventive health screenings</li>
            <li>Medication management and counseling</li>
            <li>Health education and lifestyle advice</li>
          </ul>
          
          <h3>Our Doctors</h3>
          <p>All our general medicine doctors are highly trained and board-certified with extensive experience in patient care.</p>
        `
      },
      'cardiology': {
        name: 'Cardiology',
        icon: 'heart',
        price: 'UGX 100,000',
        description: 'Expert heart and cardiovascular disease management',
        details: `
          <h2>Cardiology Department</h2>
          <p>Specialized care for heart and blood vessel diseases with state-of-the-art diagnostic and treatment capabilities.</p>
          
          <h3>Services Offered</h3>
          <ul>
            <li>Cardiac assessments and risk evaluation</li>
            <li>Echocardiography and stress testing</li>
            <li>Arrhythmia management</li>
            <li>Hypertension control</li>
            <li>Preventive cardiology programs</li>
          </ul>
          
          <h3>Advanced Equipment</h3>
          <p>We have modern cardiology equipment including ECG, echocardiography machines, and cardiac monitoring systems.</p>
        `
      }
    };

    const serviceId = this.serviceId || 'general-medicine';
    const service = servicesData[serviceId] || servicesData['general-medicine'];

    // Load header
    const headerEl = this.element.querySelector('#detail-header');
    if (headerEl) {
      headerEl.innerHTML = `
        <div class="detail-header-content">
          <div class="detail-header-icon">${renderIcon('stethoscope', { size: 80 })}</div>
          <h1>${service.name}</h1>
          <p>${service.description}</p>
          <span class="detail-price">${service.price}</span>
        </div>
      `;
    }

    // Load main content
    const mainEl = this.element.querySelector('#detail-main');
    if (mainEl) {
      mainEl.innerHTML = service.details;
    }

    // Load sidebar
    const sidebarEl = this.element.querySelector('#detail-sidebar');
    if (sidebarEl) {
      sidebarEl.innerHTML = `
        <div class="booking-widget">
          <h3>Book an Appointment</h3>
          <form id="quick-booking">
            <div class="form-group">
              <label>Select Doctor</label>
              <select class="input-field">
                <option>Dr. Kato</option>
                <option>Dr. Sarah</option>
                <option>Dr. Ahmed</option>
              </select>
            </div>
            <div class="form-group">
              <label>Preferred Date</label>
              <input type="date" class="input-field">
            </div>
            <div class="form-group">
              <label>Preferred Time</label>
              <select class="input-field">
                <option>08:00 AM</option>
                <option>10:00 AM</option>
                <option>02:00 PM</option>
                <option>04:00 PM</option>
              </select>
            </div>
            <button type="submit" class="btn-primary-gradient btn-block">Book Now</button>
          </form>
        </div>
      `;

      const bookingForm = this.element.querySelector('#quick-booking');
      if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
          e.preventDefault();
          alert('Appointment booked successfully!');
        });
      }
    }
  }
}

export default ServicesDetail;
