/**
 * Services View - Display all services with modal booking
 */

import { Component } from '../packages/core/src/index.js';
import { renderIcon } from '../packages/components/src/index.js';

export class Services extends Component {
  constructor(params = {}) {
    super();
    this.params = params;
    this.showModal = false;
    this.selectedService = null;
  }

  render() {
    return `
      <div class="services-view">
        <nav class="services-nav">
          <div class="nav-container">
            <h2 class="nav-logo">GVC</h2>
            <div class="nav-links">
              <a href="#home" class="nav-link">Home</a>
              <a href="#services" class="nav-link active">Services</a>
              <a href="#articles" class="nav-link">Articles</a>
            </div>
            <button class="btn-secondary-hifi btn-small" id="back-home">Back Home</button>
          </div>
        </nav>

        <section class="services-header">
          <h1>Our Medical Services</h1>
          <p>Comprehensive healthcare across multiple specialties</p>
        </section>

        <section class="services-container">
          <div class="services-list" id="services-list">
            <!-- Services will be loaded dynamically -->
          </div>
        </section>

        <!-- Booking Modal -->
        <div class="modal-overlay" id="bookingModal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h2 id="modalServiceTitle">Book Service</h2>
              <button class="modal-close" id="closeModal">${renderIcon('close', { size: 24 })}</button>
            </div>
            <div class="modal-body">
              <form id="booking-form">
                <div class="form-group">
                  <label>Department</label>
                  <input type="text" id="serviceName" class="input-field" readonly>
                </div>
                <div class="form-group">
                  <label>Select Doctor</label>
                  <select class="input-field" id="selectDoctor" required>
                    <option value="">Choose a doctor</option>
                    <option value="dr-kato">Dr. Kato</option>
                    <option value="dr-sarah">Dr. Sarah</option>
                    <option value="dr-ahmed">Dr. Ahmed</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Preferred Date</label>
                  <input type="date" class="input-field" id="prefDate" required>
                </div>
                <div class="form-group">
                  <label>Preferred Time</label>
                  <select class="input-field" id="prefTime" required>
                    <option value="">Select time</option>
                    <option value="08:00">08:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn-secondary-hifi" id="cancelBooking">Cancel</button>
              <button class="btn-primary-gradient" id="confirmBooking">Confirm Booking</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  onMount() {
    const backBtn = this.element.querySelector('#back-home');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'home' } }));
      });
    }

    // Load services
    this.loadServices();

    // Modal handlers
    const modal = this.element.querySelector('#bookingModal');
    const closeModalBtn = this.element.querySelector('#closeModal');
    const cancelBtn = this.element.querySelector('#cancelBooking');
    const confirmBtn = this.element.querySelector('#confirmBooking');

    if (closeModalBtn) closeModalBtn.addEventListener('click', () => this.closeModal());
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeModal());
    if (confirmBtn) confirmBtn.addEventListener('click', () => this.confirmBooking());

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal();
      });
    }
  }

  loadServices() {
    const servicesList = this.element.querySelector('#services-list');
    if (!servicesList) return;

    const services = [
      {
        id: 'general-medicine',
        name: 'General Medicine',
        description: 'Comprehensive primary care for all ages and health conditions',
        icon: 'stethoscope',
        price: 'UGX 50,000'
      },
      {
        id: 'cardiology',
        name: 'Cardiology',
        description: 'Expert heart and cardiovascular disease management',
        icon: 'heart',
        price: 'UGX 100,000'
      },
      {
        id: 'orthopedics',
        name: 'Orthopedics',
        description: 'Bone, joint, and muscle health specialists',
        icon: 'bone',
        price: 'UGX 75,000'
      },
      {
        id: 'dermatology',
        name: 'Dermatology',
        description: 'Skin health and cosmetic treatments',
        icon: 'skin',
        price: 'UGX 60,000'
      },
      {
        id: 'pediatrics',
        name: 'Pediatrics',
        description: 'Specialized healthcare for children',
        icon: 'child',
        price: 'UGX 40,000'
      },
      {
        id: 'dentistry',
        name: 'Dentistry',
        description: 'Preventive and restorative dental care',
        icon: 'tooth',
        price: 'UGX 55,000'
      }
    ];

    servicesList.innerHTML = services.map(service => `
      <div class="service-card" data-service-id="${service.id}">
        <div class="service-icon">${renderIcon('stethoscope', { size: 48 })}</div>
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <div class="service-footer">
          <span class="service-price">${service.price}</span>
          <button class="btn-primary-gradient btn-small book-btn" data-service="${service.id}" data-name="${service.name}">Book Now</button>
        </div>
      </div>
    `).join('');

    // Add click handlers to book buttons
    const bookBtns = this.element.querySelectorAll('.book-btn');
    bookBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const serviceName = btn.getAttribute('data-name');
        const serviceId = btn.getAttribute('data-service');
        this.openBookingModal(serviceName, serviceId);
      });
    });
  }

  openBookingModal(serviceName, serviceId) {
    this.selectedService = serviceId;
    const modal = this.element.querySelector('#bookingModal');
    const title = this.element.querySelector('#modalServiceTitle');
    const nameInput = this.element.querySelector('#serviceName');
    
    if (title) title.textContent = `Book ${serviceName}`;
    if (nameInput) nameInput.value = serviceName;
    if (modal) modal.style.display = 'flex';
  }

  closeModal() {
    const modal = this.element.querySelector('#bookingModal');
    if (modal) modal.style.display = 'none';
  }

  confirmBooking() {
    const form = this.element.querySelector('#booking-form');
    const doctor = this.element.querySelector('#selectDoctor').value;
    const date = this.element.querySelector('#prefDate').value;
    const time = this.element.querySelector('#prefTime').value;

    if (!doctor || !date || !time) {
      alert('Please fill in all fields');
      return;
    }

    console.log('[v0] Booking confirmed:', { 
      service: this.selectedService,
      doctor,
      date,
      time
    });

    alert(`Appointment booked successfully!\nDate: ${date}\nTime: ${time}`);
    this.closeModal();
  }
}

export default Services;
