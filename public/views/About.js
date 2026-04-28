import { Component } from '../../packages/core/src/index.js';

/**
 * About view for the public patient portal.
 * @module About
 */
export class About extends Component {
  render() {
    return `
      <div class="mobile-view about-view">
        <header class="mobile-header">
          <h2 class="h2">About Green Valley Clinic</h2>
          <p class="small">Our mission and values</p>
        </header>

        <section class="about-content mt-24">
          <div class="card">
            <h3 class="h3">Our Mission</h3>
            <p class="body mt-12">
              To provide compassionate, high-quality healthcare services that prioritize patient wellness and community health. We believe in accessible, affordable care for everyone.
            </p>
          </div>

          <div class="card mt-16">
            <h3 class="h3">Why Choose Us?</h3>
            <ul class="mt-12">
              <li class="body mt-8">Experienced medical professionals</li>
              <li class="body mt-8">Modern facilities and equipment</li>
              <li class="body mt-8">Patient-centered care approach</li>
              <li class="body mt-8">Affordable treatment plans</li>
              <li class="body mt-8">24/7 emergency services</li>
            </ul>
          </div>

          <div class="card mt-16">
            <h3 class="h3">Our Team</h3>
            <p class="body mt-12">
              Our dedicated team of doctors, nurses, and healthcare professionals are committed to providing the best care. With over 50 years of combined experience, we're here to help you.
            </p>
          </div>

          <div class="card mt-16 grad-mint">
            <h3 class="h3">Certifications</h3>
            <ul class="mt-12">
              <li class="body mt-8">• ISO 9001:2015 Certified</li>
              <li class="body mt-8">• Joint Commission International Accredited</li>
              <li class="body mt-8">• Ministry of Health Registered</li>
            </ul>
          </div>
        </section>
      </div>
    `;
  }
}

export default About;
