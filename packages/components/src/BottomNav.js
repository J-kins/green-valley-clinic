import { Component } from '../../core/src/index.js';

/**
 * BottomNav navigation for the mobile application.
 * @module BottomNav
 */
export class BottomNav extends Component {
  render() {
    const items = [
      { id: 'booking', icon: 'home', label: 'Home', active: true },
      { id: 'pharmacy', icon: 'pharmacy', label: 'Pharmacy' },
      { id: 'appointments', icon: 'calendar', label: 'My Appts' },
      { id: 'profile', icon: 'user', label: 'Profile' }
    ];

    return `
      <div class="bottom-nav">
        ${items.map(item => `
          <div class="nav-item ${item.active ? 'active' : ''}" data-id="${item.id}">
            <div class="nav-icon-container">
              <span class="nav-icon icon-${item.icon}"></span>
            </div>
            <span class="nav-label">${item.label}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  onMount() {
    this.element.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        this.element.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        // Mobile view routing logic would go here
      });
    });
  }
}

export default BottomNav;
