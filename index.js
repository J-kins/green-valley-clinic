import { documentHead } from './packages/core/src/index.js';
import { Header, Footer } from './packages/components/src/index.js';

console.log('Main portal loading...');

try {
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

  const pageStyle = document.createElement('style');
  pageStyle.textContent = `
    :root {
      --gv-ink: #0f2340;
      --gv-clay: #4a3e38;
      --gv-taupe: #b79c90;
      --gv-sand: #f7efea;
      --gv-card: rgba(255, 255, 255, 0.72);
      --gv-border: rgba(15, 35, 64, 0.12);
    }

    .homepage-shell {
      max-width: 1200px;
      margin: 0 auto;
      padding: 28px 24px 0;
      box-sizing: border-box;
    }

    .homepage-hero,
    .homepage-section,
    .homepage-band {
      position: relative;
      overflow: hidden;
      border-radius: 34px;
      border: 1px solid var(--gv-border);
      box-shadow: 0 20px 50px rgba(15, 35, 64, 0.08);
    }

    .homepage-hero {
      background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.16), transparent 28%), linear-gradient(135deg, var(--gv-ink) 0%, var(--gv-clay) 60%, var(--gv-taupe) 100%);
      color: #fff;
      padding: 42px;
      margin-bottom: 24px;
    }

    .homepage-hero::after {
      content: '';
      position: absolute;
      width: 320px;
      height: 320px;
      right: -120px;
      top: -120px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      pointer-events: none;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
      gap: 28px;
      align-items: start;
      position: relative;
      z-index: 1;
    }

    .hero-eyebrow {
      margin: 0 0 14px;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font-size: 0.76rem;
      font-weight: 800;
      color: rgba(255, 255, 255, 0.74);
    }

    .hero-title {
      margin: 0;
      font-size: clamp(2.8rem, 5vw, 4.9rem);
      line-height: 0.95;
      letter-spacing: -0.05em;
      max-width: 10ch;
    }

    .hero-copy {
      margin: 18px 0 0;
      max-width: 62ch;
      font-size: 1.08rem;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.9);
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 28px;
    }

    .hero-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 48px;
      padding: 0 18px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 800;
      letter-spacing: 0.01em;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }

    .hero-link.primary {
      background: #fff;
      color: var(--gv-ink);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.14);
    }

    .hero-link.secondary {
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.16);
    }

    .hero-link:hover {
      transform: translateY(-1px);
    }

    .portal-grid {
      display: grid;
      gap: 16px;
    }

    .portal-card {
      padding: 22px;
      border-radius: 28px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(18px);
    }

    .portal-card h3 {
      margin: 0 0 8px;
      font-size: 1.2rem;
      color: #fff;
    }

    .portal-card p {
      margin: 0;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.84);
    }

    .portal-card-list {
      display: grid;
      gap: 10px;
      margin-top: 16px;
    }

    .portal-card-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .portal-card-badge {
      width: 38px;
      height: 38px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      background: rgba(255, 255, 255, 0.14);
      flex-shrink: 0;
    }

    .portal-card-item strong,
    .portal-card-item span {
      display: block;
    }

    .portal-card-item strong {
      color: #fff;
      font-size: 0.96rem;
      margin-bottom: 2px;
    }

    .portal-card-item span {
      color: rgba(255, 255, 255, 0.76);
      font-size: 0.84rem;
    }

    .hero-metrics {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-top: 24px;
    }

    .metric-chip {
      padding: 14px 16px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }

    .metric-chip strong {
      display: block;
      color: #fff;
      font-size: 1.2rem;
      margin-bottom: 4px;
    }

    .metric-chip span {
      display: block;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.84rem;
      line-height: 1.4;
    }

    .homepage-section {
      margin-top: 24px;
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      padding: 32px;
    }

    .section-head {
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 18px;
      margin-bottom: 20px;
    }

    .section-head h2 {
      margin: 0;
      font-size: clamp(1.6rem, 2vw, 2.2rem);
      color: var(--gv-ink);
      letter-spacing: -0.03em;
    }

    .section-head p {
      margin: 0;
      color: rgba(15, 35, 64, 0.72);
      max-width: 54ch;
      line-height: 1.6;
    }

    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 14px;
    }

    .feature-card {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(15, 35, 64, 0.1);
      border-radius: 24px;
      padding: 20px;
      box-shadow: 0 12px 28px rgba(15, 35, 64, 0.05);
    }

    .feature-top {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
    }

    .feature-icon {
      width: 42px;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, var(--gv-ink), var(--gv-clay));
      color: #fff;
      flex-shrink: 0;
    }

    .feature-card h3 {
      margin: 0;
      color: var(--gv-ink);
      font-size: 1.02rem;
    }

    .feature-card p {
      margin: 0;
      color: rgba(15, 35, 64, 0.76);
      line-height: 1.65;
    }

    .journey-list {
      display: grid;
      gap: 14px;
    }

    .journey-step {
      display: grid;
      grid-template-columns: 54px minmax(0, 1fr) auto;
      gap: 16px;
      align-items: center;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(15, 35, 64, 0.1);
      border-radius: 24px;
      padding: 18px 20px;
    }

    .journey-index {
      width: 54px;
      height: 54px;
      border-radius: 18px;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, var(--gv-ink), var(--gv-clay));
      color: #fff;
      font-size: 1.1rem;
      font-weight: 800;
    }

    .journey-step h3 {
      margin: 0 0 6px;
      color: var(--gv-ink);
    }

    .journey-step p {
      margin: 0;
      color: rgba(15, 35, 64, 0.72);
      line-height: 1.55;
    }

    .journey-cta {
      color: var(--gv-ink);
      font-weight: 800;
      text-decoration: none;
      white-space: nowrap;
    }

    .band {
      margin-top: 24px;
      background: linear-gradient(135deg, var(--gv-ink), var(--gv-clay));
      color: #fff;
      padding: 28px 32px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 18px;
      align-items: center;
    }

    .band h2 {
      margin: 0 0 10px;
      font-size: 2rem;
      letter-spacing: -0.03em;
    }

    .band p {
      margin: 0;
      color: rgba(255, 255, 255, 0.86);
      max-width: 58ch;
      line-height: 1.65;
    }

    .band .hero-actions {
      margin-top: 0;
      justify-content: flex-end;
    }

    .homepage-footer-space {
      height: 24px;
    }

    @media (max-width: 960px) {
      .hero-grid,
      .grid-4,
      .journey-step,
      .band {
        grid-template-columns: 1fr;
      }

      .section-head {
        align-items: start;
        flex-direction: column;
      }

      .band .hero-actions {
        justify-content: flex-start;
      }

      .hero-metrics {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 640px) {
      .homepage-shell {
        padding: 16px 16px 0;
      }

      .homepage-hero,
      .homepage-section,
      .homepage-band {
        border-radius: 28px;
      }

      .homepage-hero,
      .homepage-section,
      .band {
        padding: 24px 18px;
      }

      .hero-title {
        max-width: none;
      }

      .hero-metrics {
        grid-template-columns: 1fr;
      }
    }
  `;
  root.appendChild(pageStyle);

  const header = new Header({
    logo: 'Green Valley Clinic',
    navItems: [
      { label: 'Overview', href: '#top' },
      { label: 'Services', href: '#services' },
      { label: 'Patient Journey', href: '#patient-journey' },
      { label: 'Staff Flow', href: '#staff-journey' },
      { label: 'Contact', href: '#contact' }
    ],
    actions: [
      { label: 'Patient Portal', href: './public/index.html', variant: 'secondary' },
      { label: 'Staff Portal', href: './clinic/index.html', variant: 'primary' }
    ]
  });
  header.mount(root);
  console.log('Header mounted');

  const hero = document.createElement('section');
  hero.id = 'top';
  hero.className = 'homepage-shell';
  hero.innerHTML = `
    <section class="homepage-hero">
      <div class="hero-grid">
        <div>
          <p class="hero-eyebrow">Green Valley Clinic</p>
          <h1 class="hero-title">Care that keeps the next decision obvious.</h1>
          <p class="hero-copy">A single place for patients, clinicians, and operations teams to book faster, track progress, and keep every handoff readable.</p>

          <div class="hero-actions">
            <a class="hero-link primary" href="./public/index.html">Open Patient Portal</a>
            <a class="hero-link secondary" href="./clinic/index.html">Open Staff Portal</a>
          </div>

          <div class="hero-metrics">
            <div class="metric-chip"><strong>24/7</strong><span>Access to care actions and follow-ups</span></div>
            <div class="metric-chip"><strong>1 hub</strong><span>Appointments, notes, meds, and records</span></div>
            <div class="metric-chip"><strong>5 min</strong><span>Fast booking and check-in flow</span></div>
            <div class="metric-chip"><strong>2 views</strong><span>Mobile dock for patients, sidebar for staff</span></div>
          </div>
        </div>

        <div class="portal-grid">
          <article class="portal-card">
            <h3>Patient Portal</h3>
            <p>Designed for quick action. Patients can move from login to booking, medications, and records without hunting through pages.</p>
            <div class="portal-card-list">
              <div class="portal-card-item">
                <div class="portal-card-badge">1</div>
                <div><strong>Book</strong><span>Choose a slot and confirm in seconds.</span></div>
              </div>
              <div class="portal-card-item">
                <div class="portal-card-badge">2</div>
                <div><strong>Review</strong><span>See results, notes, and prescriptions together.</span></div>
              </div>
              <div class="portal-card-item">
                <div class="portal-card-badge">3</div>
                <div><strong>Follow up</strong><span>Reach the team when something changes.</span></div>
              </div>
            </div>
          </article>

          <article class="portal-card">
            <h3>Staff Portal</h3>
            <p>Built for fast scanning. The clinic shell keeps clinical tasks, finance, procurement, and admin in a clear left-rail workflow.</p>
            <div class="portal-card-list">
              <div class="portal-card-item">
                <div class="portal-card-badge">A</div>
                <div><strong>Dashboard</strong><span>Shift context, alerts, and patient flow at a glance.</span></div>
              </div>
              <div class="portal-card-item">
                <div class="portal-card-badge">B</div>
                <div><strong>Operations</strong><span>Inventory, finance, procurement, and staff tools stay grouped.</span></div>
              </div>
              <div class="portal-card-item">
                <div class="portal-card-badge">C</div>
                <div><strong>Clinical work</strong><span>Notes, imaging, and patient detail views stay one click away.</span></div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `;
  root.appendChild(hero);
  console.log('Hero section mounted');

  const services = document.createElement('section');
  services.id = 'services';
  services.className = 'homepage-shell homepage-section';
  services.innerHTML = `
    <div class="section-head">
      <div>
        <h2>Services patients actually need to find quickly</h2>
        <p>Not every visitor is looking for the same thing, so the homepage groups the most common paths first and keeps the rest nearby.</p>
      </div>
    </div>

    <div class="grid-4">
      <article class="feature-card">
        <div class="feature-top">
          <div class="feature-icon">1</div>
          <h3>General care</h3>
        </div>
        <p>Routine consultation, chronic follow-up, and first-contact triage without a crowded menu.</p>
      </article>
      <article class="feature-card">
        <div class="feature-top">
          <div class="feature-icon">2</div>
          <h3>Diagnostics</h3>
        </div>
        <p>Lab, imaging, and result review are grouped so patients can understand what happened next.</p>
      </article>
      <article class="feature-card">
        <div class="feature-top">
          <div class="feature-icon">3</div>
          <h3>Pharmacy</h3>
        </div>
        <p>Medication pickup, refills, and therapy reminders are visible in the same journey.</p>
      </article>
      <article class="feature-card">
        <div class="feature-top">
          <div class="feature-icon">4</div>
          <h3>Support</h3>
        </div>
        <p>Front desk, help desk, and urgent contact paths stay easy to spot for every audience.</p>
      </article>
    </div>
  `;
  root.appendChild(services);
  console.log('Services section mounted');

  const patientJourney = document.createElement('section');
  patientJourney.id = 'patient-journey';
  patientJourney.className = 'homepage-shell homepage-section';
  patientJourney.innerHTML = `
    <div class="section-head">
      <div>
        <h2>Patient journey</h2>
        <p>The patient side should feel guided, not buried. The flow starts with login and then moves directly to the next useful action.</p>
      </div>
    </div>

    <div class="journey-list">
      <article class="journey-step">
        <div class="journey-index">1</div>
        <div>
          <h3>Enter once</h3>
          <p>Login or sign up is the obvious first step, then the dock carries patients to their next task.</p>
        </div>
        <a class="journey-cta" href="./public/index.html">Open</a>
      </article>
      <article class="journey-step">
        <div class="journey-index">2</div>
        <div>
          <h3>Act on what matters</h3>
          <p>Appointments, medications, and recent results are surfaced together so nothing feels scattered.</p>
        </div>
        <a class="journey-cta" href="./public/index.html">Review</a>
      </article>
      <article class="journey-step">
        <div class="journey-index">3</div>
        <div>
          <h3>Stay connected</h3>
          <p>Questions and follow-ups have a clear place to go instead of getting lost in the portal.</p>
        </div>
        <a class="journey-cta" href="./public/index.html">Continue</a>
      </article>
    </div>
  `;
  root.appendChild(patientJourney);
  console.log('Patient journey section mounted');

  const staffJourney = document.createElement('section');
  staffJourney.id = 'staff-journey';
  staffJourney.className = 'homepage-shell homepage-section';
  staffJourney.innerHTML = `
    <div class="section-head">
      <div>
        <h2>Staff flow</h2>
        <p>The clinic workspace is organized around the way teams actually work: one side rail for navigation and one top bar for context.</p>
      </div>
    </div>

    <div class="grid-4">
      <article class="feature-card">
        <div class="feature-top">
          <div class="feature-icon">S</div>
          <h3>Clinical speed</h3>
        </div>
        <p>Dashboard, patient details, notes, imaging, and lab work stay close together for quick handoffs.</p>
      </article>
      <article class="feature-card">
        <div class="feature-top">
          <div class="feature-icon">O</div>
          <h3>Operations</h3>
        </div>
        <p>Finance, procurement, inventory, and staff management are grouped so admin work stays discoverable.</p>
      </article>
      <article class="feature-card">
        <div class="feature-top">
          <div class="feature-icon">H</div>
          <h3>Help desk</h3>
        </div>
        <p>Support and issue tracking remain visible without making the dashboard feel crowded.</p>
      </article>
      <article class="feature-card">
        <div class="feature-top">
          <div class="feature-icon">R</div>
          <h3>Readable screens</h3>
        </div>
        <p>Contrast, spacing, and button states are tuned for the darker palette so the interface stays clear.</p>
      </article>
    </div>
  `;
  root.appendChild(staffJourney);
  console.log('Staff journey section mounted');

  const contact = document.createElement('section');
  contact.id = 'contact';
  contact.className = 'homepage-shell homepage-band';
  contact.innerHTML = `
    <div class="band">
      <div>
        <h2>Ready to enter the right portal?</h2>
        <p>Patients can go straight to the mobile portal, and staff can jump into the clinic workspace. The layout now gives each audience the shortest path to what they need.</p>
      </div>
      <div class="hero-actions">
        <a class="hero-link primary" href="./public/index.html">Patient Portal</a>
        <a class="hero-link secondary" href="./clinic/index.html">Staff Portal</a>
      </div>
    </div>
  `;
  root.appendChild(contact);
  console.log('CTA section mounted');

  const footer = new Footer({
    links: [
      { label: 'Patient Portal', href: './public/index.html' },
      { label: 'Staff Portal', href: './clinic/index.html' },
      { label: 'Services', href: '#services' },
      { label: 'Contact', href: '#contact' }
    ]
  });
  footer.mount(root);
  console.log('Footer mounted');

  const footerGap = document.createElement('div');
  footerGap.className = 'homepage-footer-space';
  root.appendChild(footerGap);

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
