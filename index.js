import { documentHead } from './packages/core/src/index.js';
import { Header, Accordion, Footer, Modal } from './packages/components/src/index.js';

// 1. Configure Page Head
documentHead.setDefaultConfig({
  title: 'Green Valley Clinic | Premium Healthcare',
  description: 'Experience world-class healthcare with a personal touch at Green Valley Clinic.',
  author: 'Clickin',
  favicon: ''
});

documentHead.applyToDocument();

const root = document.getElementById('root');

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

// 3. Hero Section (In-line styles for demonstration)
const hero = document.createElement('section');
hero.innerHTML = `
  <div style="padding: 120px 20px; text-align: center; background: white; animation: fadeIn 0.8s ease-out;">
    <h2 style="font-size: 3.5rem; font-weight: 800; color: #1e293b; margin-bottom: 24px; letter-spacing: -0.025em;">
      Compassionate Care for a <span style="color: #4f46e5;">Healthier You</span>
    </h2>
    <p style="font-size: 1.25rem; color: #64748b; max-width: 600px; margin: 0 auto 48px; line-height: 1.6;">
      Experience world-class healthcare with a personal touch. Our dedicated team is here to support your wellness journey every step of the way.
    </p>
    <button id="cta-btn" style="padding: 16px 32px; font-size: 1.125rem; font-weight: 600; background: #4f46e5; color: white; border: none; border-radius: 12px; cursor: pointer; transition: all 0.2s; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);">
      Book Appointment
    </button>
  </div>
`;
root.appendChild(hero);

// 4. FAQ Section with Accordion
const faqSection = document.createElement('section');
faqSection.style.padding = '80px 20px';
faqSection.innerHTML = '<h2 style="text-align: center; font-size: 2.25rem; font-weight: 700; color: #1e293b; margin-bottom: 48px;">Common Questions</h2>';
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

// Bind CTA button to open modal
document.getElementById('cta-btn').addEventListener('click', () => appointmentModal.show());

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
