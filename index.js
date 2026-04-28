import { documentHead } from './packages/core/src/index.js';
import { Header, Footer } from './packages/components/src/index.js';

console.log('Main portal loading...');

try {
  // Configure Page Head
  documentHead.setDefaultConfig({
    title: 'Green Valley Clinic | Premium Healthcare',
    description: 'Experience world-class healthcare with a personal touch at Green Valley Clinic.',
    author: 'Clickin',
    favicon: ''
  });

  documentHead.applyToDocument();
  console.log('Document head configured');

  const root = document.getElementById('root');
  if (!root) {
    throw new Error('Root element (#root) not found in DOM');
  }

  // 1. Mount Header
  const header = new Header({
    logo: 'Green Valley Clinic',
    navItems: [
      { label: 'Home', href: '#' },
      { label: 'Services', href: '#services' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' }
    ]
  });
  header.mount(root);
  console.log('Header mounted');

  // 2. Hero Section
  const hero = document.createElement('section');
  hero.style.padding = '120px 20px';
  hero.style.textAlign = 'center';
  hero.style.background = 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)';
  hero.style.color = 'white';
  hero.innerHTML = `
    <h1 style="font-size: 3.5rem; font-weight: 800; margin: 0 0 24px 0; letter-spacing: -0.025em;">
      Compassionate Care for a Healthier You
    </h1>
    <p style="font-size: 1.25rem; max-width: 600px; margin: 0 auto 48px; line-height: 1.6; opacity: 0.95;">
      Experience world-class healthcare with a personal touch. Our dedicated team is here to support your wellness journey.
    </p>
    <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
      <a href="./public/index.html" style="padding: 16px 32px; font-size: 1.125rem; font-weight: 600; background: white; color: #4f46e5; border: none; border-radius: 12px; cursor: pointer; text-decoration: none; transition: all 0.2s;">
        Patient Portal
      </a>
      <a href="./clinic/index.html" style="padding: 16px 32px; font-size: 1.125rem; font-weight: 600; background: rgba(255,255,255,0.2); color: white; border: 2px solid white; border-radius: 12px; cursor: pointer; text-decoration: none; transition: all 0.2s;">
        Staff Portal
      </a>
    </div>
  `;
  root.appendChild(hero);
  console.log('Hero section mounted');

  // 3. Features Section
  const features = document.createElement('section');
  features.style.padding = '80px 20px';
  features.style.background = '#f8f9ff';
  features.innerHTML = `
    <div style="max-width: 1200px; margin: 0 auto;">
      <h2 style="font-size: 2.25rem; font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 48px;">Why Choose Green Valley Clinic?</h2>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px;">
        <div style="padding: 32px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #4f46e5; margin: 0 0 16px 0;">Expert Team</h3>
          <p style="color: #64748b; line-height: 1.6; margin: 0;">Our experienced doctors and healthcare professionals provide personalized care.</p>
        </div>
        
        <div style="padding: 32px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #4f46e5; margin: 0 0 16px 0;">Modern Facilities</h3>
          <p style="color: #64748b; line-height: 1.6; margin: 0;">State-of-the-art equipment and comfortable facilities for your care.</p>
        </div>
        
        <div style="padding: 32px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #4f46e5; margin: 0 0 16px 0;">Patient-Centered</h3>
          <p style="color: #64748b; line-height: 1.6; margin: 0;">Your health and comfort are our top priorities in every interaction.</p>
        </div>
        
        <div style="padding: 32px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #4f46e5; margin: 0 0 16px 0;">Affordable Care</h3>
          <p style="color: #64748b; line-height: 1.6; margin: 0;">Transparent pricing and flexible payment options for everyone.</p>
        </div>
        
        <div style="padding: 32px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #4f46e5; margin: 0 0 16px 0;">Easy Booking</h3>
          <p style="color: #64748b; line-height: 1.6; margin: 0;">Schedule appointments online or call us anytime for immediate assistance.</p>
        </div>
        
        <div style="padding: 32px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #4f46e5; margin: 0 0 16px 0;">24/7 Emergency</h3>
          <p style="color: #64748b; line-height: 1.6; margin: 0;">Round-the-clock emergency services for urgent medical needs.</p>
        </div>
      </div>
    </div>
  `;
  root.appendChild(features);
  console.log('Features section mounted');

  // 4. Services Section
  const services = document.createElement('section');
  services.style.padding = '80px 20px';
  services.style.background = 'white';
  services.innerHTML = `
    <div style="max-width: 1200px; margin: 0 auto;">
      <h2 style="font-size: 2.25rem; font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 48px;">Our Services</h2>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
        <div style="padding: 24px; border: 2px solid #e2e8f0; border-radius: 8px; text-align: center;">
          <h4 style="font-size: 1.125rem; font-weight: 700; color: #1e293b; margin: 0 0 12px 0;">General Consultation</h4>
          <p style="color: #64748b; margin: 0;">Checkups and general medical advice</p>
        </div>
        
        <div style="padding: 24px; border: 2px solid #e2e8f0; border-radius: 8px; text-align: center;">
          <h4 style="font-size: 1.125rem; font-weight: 700; color: #1e293b; margin: 0 0 12px 0;">Dental Care</h4>
          <p style="color: #64748b; margin: 0;">Preventive and restorative dental services</p>
        </div>
        
        <div style="padding: 24px; border: 2px solid #e2e8f0; border-radius: 8px; text-align: center;">
          <h4 style="font-size: 1.125rem; font-weight: 700; color: #1e293b; margin: 0 0 12px 0;">Pediatrics</h4>
          <p style="color: #64748b; margin: 0;">Children's healthcare and vaccinations</p>
        </div>
        
        <div style="padding: 24px; border: 2px solid #e2e8f0; border-radius: 8px; text-align: center;">
          <h4 style="font-size: 1.125rem; font-weight: 700; color: #1e293b; margin: 0 0 12px 0;">Eye Care</h4>
          <p style="color: #64748b; margin: 0;">Vision exams and eye treatments</p>
        </div>
        
        <div style="padding: 24px; border: 2px solid #e2e8f0; border-radius: 8px; text-align: center;">
          <h4 style="font-size: 1.125rem; font-weight: 700; color: #1e293b; margin: 0 0 12px 0;">Laboratory Tests</h4>
          <p style="color: #64748b; margin: 0;">Blood work and diagnostic testing</p>
        </div>
        
        <div style="padding: 24px; border: 2px solid #e2e8f0; border-radius: 8px; text-align: center;">
          <h4 style="font-size: 1.125rem; font-weight: 700; color: #1e293b; margin: 0 0 12px 0;">Pharmacy</h4>
          <p style="color: #64748b; margin: 0;">Quality medications and health products</p>
        </div>
      </div>
    </div>
  `;
  root.appendChild(services);
  console.log('Services section mounted');

  // 5. CTA Section
  const cta = document.createElement('section');
  cta.style.padding = '80px 20px';
  cta.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  cta.style.color = 'white';
  cta.style.textAlign = 'center';
  cta.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto;">
      <h2 style="font-size: 2.25rem; font-weight: 700; margin: 0 0 24px 0;">Ready to Get Started?</h2>
      <p style="font-size: 1.125rem; line-height: 1.6; margin: 0 0 32px 0; opacity: 0.95;">Choose below to access the patient portal or staff management system.</p>
      <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <a href="./public/index.html" style="padding: 16px 32px; font-size: 1.125rem; font-weight: 600; background: white; color: #667eea; border: none; border-radius: 8px; cursor: pointer; text-decoration: none; transition: all 0.2s;">
          Access Patient Portal
        </a>
        <a href="./clinic/index.html" style="padding: 16px 32px; font-size: 1.125rem; font-weight: 600; background: rgba(255,255,255,0.2); color: white; border: 2px solid white; border-radius: 8px; cursor: pointer; text-decoration: none; transition: all 0.2s;">
          Staff Login
        </a>
      </div>
    </div>
  `;
  root.appendChild(cta);
  console.log('CTA section mounted');

  // 6. Mount Footer
  const footer = new Footer({
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact Us', href: '#' }
    ]
  });
  footer.mount(root);
  console.log('Footer mounted');

  console.log('Main portal successfully initialized!');

} catch (error) {
  console.error('Application error:', error);
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
