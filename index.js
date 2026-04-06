import { documentHead } from './packages/core/src/index.js';
import { Header, Accordion, Footer, Modal } from './packages/components/src/index.js';

console.log('🚀 Application starting...');

try {
  // 1. Configure Page Head
  documentHead.setDefaultConfig({
    title: 'Green Valley Clinic | Premium Healthcare',
    description: 'Experience world-class healthcare with a personal touch at Green Valley Clinic.',
    author: 'Clickin',
    favicon: ''
  });

  documentHead.applyToDocument();
  console.log('✓ Document head configured');

  const root = document.getElementById('root');
  if (!root) {
    throw new Error('Root element (#root) not found in DOM');
  }
  console.log('✓ Root element found');

  // 2. Initialize and Mount Header
  const header = new Header({
    logo: 'Green Valley',
    navItems: [
      { label: 'Home', href: '#' },
      { label: 'About', href: '#' },
      { label: 'Services', href: '#' },
      { label: 'Contact', href: '#' }
    ]
  });
  header.mount(root);
  console.log('✓ Header mounted');

  // 3. Hero Section
  const hero = document.createElement('section');
  hero.style.padding = '120px 20px';
  hero.style.textAlign = 'center';
  hero.style.background = 'white';
  hero.innerHTML = `
    <h2 style="font-size: 3.5rem; font-weight: 800; color: #1e293b; margin-bottom: 24px; letter-spacing: -0.025em; margin: 0 0 24px 0;">
      Compassionate Care for a <span style="color: #4f46e5;">Healthier You</span>
    </h2>
    <p style="font-size: 1.25rem; color: #64748b; max-width: 600px; margin: 0 auto 48px; line-height: 1.6;">
      Experience world-class healthcare with a personal touch. Our dedicated team is here to support your wellness journey every step of the way.
    </p>
    <button id="cta-btn" style="padding: 16px 32px; font-size: 1.125rem; font-weight: 600; background: #4f46e5; color: white; border: none; border-radius: 12px; cursor: pointer; transition: all 0.2s; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);">
      Book Appointment
    </button>
  `;
  root.appendChild(hero);
  console.log('✓ Hero section mounted');

  // 4. FAQ Section with Accordion
  const faqSection = document.createElement('section');
  faqSection.style.padding = '80px 20px';
  const faqTitle = document.createElement('h2');
  faqTitle.style.textAlign = 'center';
  faqTitle.style.fontSize = '2.25rem';
  faqTitle.style.fontWeight = '700';
  faqTitle.style.color = '#1e293b';
  faqTitle.style.marginBottom = '48px';
  faqTitle.textContent = 'Common Questions';
  faqSection.appendChild(faqTitle);
  root.appendChild(faqSection);

  const faq = new Accordion({
    items: [
      { 
        title: 'What are your operating hours?', 
        content: 'We are open Monday to Friday, 8:00 AM to 8:00 PM, and Saturday 9:00 AM to 2:00 PM. We are closed on Sundays and major public holidays.' 
      },
      { 
        title: 'Do you accept international insurance?', 
        content: 'Yes, we partner with most international insurance providers. Please contact our front desk for a full list of supported networks.' 
      },
      { 
        title: 'How can I access my medical records?', 
        content: 'You can securely access all your medical records, test results, and prescriptions through our patient portal or by visiting us in person.' 
      }
    ]
  });
  faq.mount(faqSection);
  console.log('✓ Accordion mounted');

  // 5. Initialize Modal (Hidden by default)
  const appointmentModal = new Modal({
    title: 'Make an Appointment',
    content: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <p style="color: #64748b; font-size: 0.9375rem;">Please fill out the form below and our team will get back to you within 24 hours.</p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <label style="font-size: 0.875rem; font-weight: 500; color: #334155;">Full Name</label>
          <input type="text" placeholder="John Doe" style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; outline: none;">
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <label style="font-size: 0.875rem; font-weight: 500; color: #334155;">Preferred Date</label>
          <input type="date" style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; outline: none;">
        </div>
        <button style="padding: 14px; background: #4f46e5; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 10px;">Confirm Request</button>
      </div>
    `
  });
  appointmentModal.mount(root);
  console.log('✓ Modal mounted');

  // Bind CTA button to open modal
  const ctaBtn = document.getElementById('cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => appointmentModal.show());
    console.log('✓ CTA button listener attached');
  }

  // 6. Initialize and Mount Footer
  const footer = new Footer({
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact Us', href: '#' }
    ]
  });
  footer.mount(root);
  console.log('✓ Footer mounted');

  console.log('✅ Application successfully initialized!');

} catch (error) {
  console.error('❌ Application error:', error);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 40px; font-family: system-ui; color: #d32f2f;">
        <h2>Application Error</h2>
        <p>${error.message}</p>
        <details style="margin-top: 20px; padding: 10px; background: #ffebee; border-radius: 4px;">
          <summary>Error Details</summary>
          <pre style="overflow: auto; white-space: pre-wrap;">${error.stack}</pre>
        </details>
      </div>
    `;
  }
}
