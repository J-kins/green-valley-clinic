import { Component } from '../../packages/core/src/index.js';

/**
 * ContactUs view for the public patient portal.
 * @module ContactUs
 */
export class ContactUs extends Component {
  render() {
    return `
      <div class="mobile-view contact-us-view">
        <header class="mobile-header">
          <h2 class="h2">Contact Us</h2>
          <p class="small">Get in touch with our team</p>
        </header>

        <section class="contact-content mt-24">
          <div class="card contact-card">
            <h3 class="h3">Main Office</h3>
            <div class="contact-item mt-16">
              <span class="label">Address</span>
              <p class="body mt-4">123 Health Street, Green Valley, Region 12345</p>
            </div>
            <div class="contact-item mt-16">
              <span class="label">Phone</span>
              <p class="body mt-4">+256 701 234 567</p>
            </div>
            <div class="contact-item mt-16">
              <span class="label">Email</span>
              <p class="body mt-4">info@greenvalley.clinic</p>
            </div>
            <div class="contact-item mt-16">
              <span class="label">Hours</span>
              <p class="body mt-4">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p class="body mt-4">Saturday: 9:00 AM - 2:00 PM</p>
              <p class="body mt-4">Sunday: Closed</p>
            </div>
          </div>

          <div class="card mt-16 contact-card">
            <h3 class="h3">Send us a Message</h3>
            <form id="contact-form" class="mt-16">
              <div class="field">
                <label class="label">Full Name</label>
                <input type="text" placeholder="Your name" class="input-field" required>
              </div>
              <div class="field mt-16">
                <label class="label">Email</label>
                <input type="email" placeholder="your@email.com" class="input-field" required>
              </div>
              <div class="field mt-16">
                <label class="label">Subject</label>
                <input type="text" placeholder="Message subject" class="input-field" required>
              </div>
              <div class="field mt-16">
                <label class="label">Message</label>
                <textarea placeholder="Your message..." class="input-field" rows="4" required></textarea>
              </div>
              <button type="submit" class="btn-primary-gradient mt-24" style="width: 100%;">Send Message</button>
            </form>
          </div>

          <div class="card mt-16 grad-peach">
            <h3 class="h3">Emergency Services</h3>
            <p class="body mt-12">
              For medical emergencies, call <span class="bold">+256 701 999 999</span> or visit the emergency room directly.
            </p>
            <button class="btn-secondary-hifi mt-16" style="width: 100%;">Call Emergency</button>
          </div>
        </section>
      </div>
    `;
  }

  onMount() {
    const form = this.element.querySelector('#contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your message has been sent. We will contact you soon.');
        form.reset();
      });
    }
  }
}

export default ContactUs;
