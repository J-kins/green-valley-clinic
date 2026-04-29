/**
 * Home View - Public landing page
 * Shows clinic overview with Login and Signup buttons (no Staff button)
 */

import { Component } from '../packages/core/src/index.js';
import { renderIcon } from '../packages/components/src/index.js';

export class Home extends Component {
  render() {
    return `
      <div class="home-view">
        <!-- Navigation -->
        <nav class="home-nav">
          <div class="nav-container">
            <div class="nav-logo">
              <h2>GVC</h2>
              <span>Green Valley Clinic</span>
            </div>
            <div class="nav-links">
              <a href="#home" class="nav-link active">Home</a>
              <a href="#services" class="nav-link">Services</a>
              <a href="#articles" class="nav-link">Articles</a>
              <a href="#contact" class="nav-link">Contact</a>
            </div>
            <div class="nav-actions">
              <button class="btn-secondary-hifi" id="btn-login">Login</button>
              <button class="btn-primary-gradient" id="btn-signup">Sign Up</button>
            </div>
          </div>
        </nav>

        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-content">
            <h1>Your Health, Our Priority</h1>
            <p>Experience world-class healthcare with compassionate doctors and modern facilities.</p>
            <div class="hero-buttons">
              <button class="btn-primary-gradient btn-large" id="hero-book">Book an Appointment</button>
              <button class="btn-secondary-hifi btn-large" id="hero-learn">Learn More</button>
            </div>
          </div>
          <div class="hero-image">
            <div class="image-placeholder">${renderIcon('heart', { size: 120 })}</div>
          </div>
        </section>

        <!-- Services Preview -->
        <section class="services-preview">
          <div class="section-header">
            <h2>Our Services</h2>
            <p>Comprehensive healthcare across multiple specialties</p>
          </div>
          <div class="services-grid">
            <div class="service-card" data-service="general-medicine">
              <div class="service-icon">${renderIcon('stethoscope', { size: 48 })}</div>
              <h3>General Medicine</h3>
              <p>Comprehensive primary care for all ages</p>
              <a href="#" class="service-link">Learn More →</a>
            </div>
            <div class="service-card" data-service="cardiology">
              <div class="service-icon">${renderIcon('heart', { size: 48 })}</div>
              <h3>Cardiology</h3>
              <p>Expert heart and cardiovascular care</p>
              <a href="#" class="service-link">Learn More →</a>
            </div>
            <div class="service-card" data-service="orthopedics">
              <div class="service-icon">${renderIcon('bone', { size: 48 })}</div>
              <h3>Orthopedics</h3>
              <p>Bone and joint health specialists</p>
              <a href="#" class="service-link">Learn More →</a>
            </div>
            <div class="service-card" data-service="dermatology">
              <div class="service-icon">${renderIcon('skin', { size: 48 })}</div>
              <h3>Dermatology</h3>
              <p>Skin health and beauty treatments</p>
              <a href="#" class="service-link">Learn More →</a>
            </div>
          </div>
          <button class="btn-secondary-hifi" id="view-all-services">View All Services</button>
        </section>

        <!-- Features -->
        <section class="features-section">
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">${renderIcon('clock', { size: 32 })}</div>
              <h3>24/7 Availability</h3>
              <p>Always here when you need us</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">${renderIcon('shield', { size: 32 })}</div>
              <h3>Secure Records</h3>
              <p>Your privacy is our priority</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">${renderIcon('user', { size: 32 })}</div>
              <h3>Expert Doctors</h3>
              <p>Highly trained professionals</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">${renderIcon('award', { size: 32 })}</div>
              <h3>Quality Care</h3>
              <p>Best practices in healthcare</p>
            </div>
          </div>
        </section>

        <!-- Articles Preview -->
        <section class="articles-preview">
          <div class="section-header">
            <h2>Health Articles</h2>
            <p>Stay informed with our latest health tips and news</p>
          </div>
          <div class="articles-grid" id="articles-grid">
            <!-- Articles will be loaded dynamically -->
          </div>
          <button class="btn-secondary-hifi" id="view-all-articles">Read More Articles</button>
        </section>

        <!-- Footer -->
        <footer class="home-footer">
          <div class="footer-content">
            <div class="footer-section">
              <h4>About GVC</h4>
              <p>Green Valley Clinic provides excellence in healthcare</p>
            </div>
            <div class="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#articles">Articles</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Contact</h4>
              <p>Email: info@gvc.clinic</p>
              <p>Phone: +256 123 456 789</p>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2026 Green Valley Clinic. All rights reserved.</p>
          </div>
        </footer>
      </div>
    `;
  }

  onMount() {
    const loginBtn = this.element.querySelector('#btn-login');
    const signupBtn = this.element.querySelector('#btn-signup');
    const serviceCards = this.element.querySelectorAll('.service-card');
    const viewAllServicesBtn = this.element.querySelector('#view-all-services');
    const viewAllArticlesBtn = this.element.querySelector('#view-all-articles');
    const heroBookBtn = this.element.querySelector('#hero-book');
    const navLinks = this.element.querySelectorAll('.nav-link');

    // Navigation
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'patient-login' } }));
      });
    }

    if (signupBtn) {
      signupBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'patient-signup' } }));
      });
    }

    // Service cards navigation
    serviceCards.forEach(card => {
      card.addEventListener('click', () => {
        const serviceId = card.getAttribute('data-service');
        window.dispatchEvent(new CustomEvent('navigate', { 
          detail: { route: 'service-details', params: { serviceId } } 
        }));
      });
    });

    // View all services
    if (viewAllServicesBtn) {
      viewAllServicesBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'services' } }));
      });
    }

    // View all articles
    if (viewAllArticlesBtn) {
      viewAllArticlesBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'articles' } }));
      });
    }

    // Hero book button
    if (heroBookBtn) {
      heroBookBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'patient-login' } }));
      });
    }

    // Nav link scrolling/navigation
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href === '#home') {
          window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'home' } }));
        } else if (href === '#services') {
          window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'services' } }));
        } else if (href === '#articles') {
          window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'articles' } }));
        }
      });
    });

    // Load articles preview
    this.loadArticlesPreview();
  }

  loadArticlesPreview() {
    const articlesGrid = this.element.querySelector('#articles-grid');
    if (!articlesGrid) return;

    // Mock articles - in real scenario, this comes from gvc-backend
    const articles = [
      {
        id: 1,
        title: 'Heart Health Tips',
        excerpt: 'Learn how to maintain a healthy heart with these simple tips.',
        date: 'May 15, 2026'
      },
      {
        id: 2,
        title: 'Managing Diabetes',
        excerpt: 'A comprehensive guide to managing type 2 diabetes.',
        date: 'May 10, 2026'
      },
      {
        id: 3,
        title: 'Mental Wellness',
        excerpt: 'Tips for improving your mental health and wellbeing.',
        date: 'May 5, 2026'
      }
    ];

    articlesGrid.innerHTML = articles.map(article => `
      <div class="article-preview-card" data-article-id="${article.id}">
        <h3>${article.title}</h3>
        <p>${article.excerpt}</p>
        <small>${article.date}</small>
      </div>
    `).join('');

    const articleCards = this.element.querySelectorAll('.article-preview-card');
    articleCards.forEach(card => {
      card.addEventListener('click', () => {
        const articleId = card.getAttribute('data-article-id');
        window.dispatchEvent(new CustomEvent('navigate', { 
          detail: { route: 'article-details', params: { articleId } } 
        }));
      });
    });
  }
}

export default Home;
