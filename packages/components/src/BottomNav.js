import { Component } from '../../core/src/index.js';
import { renderIcon } from './Icons.js';

/**
 * BottomNav navigation for the mobile application.
 * @module BottomNav
 */
export class BottomNav extends Component {
  render() {
    const items = [
      { id: 'dashboard', icon: 'home', label: 'Home', active: true },
      { id: 'booking', icon: 'calendar', label: 'Book' },
      { id: 'appointments', icon: 'clipboard', label: 'Visits' },
      { id: 'pharmacy', icon: 'pill', label: 'Meds' },
      { id: 'profile', icon: 'user', label: 'Profile' }
    ];

    return `
      <div class="bottom-nav">
        <div class="dock-shell">
          ${items.map(item => `
            <button type="button" class="nav-item ${item.active ? 'active' : ''}" data-id="${item.id}">
              <span class="nav-icon-container">${renderIcon(item.icon, { size: 18, title: item.label })}</span>
              <span class="nav-label">${item.label}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  onMount() {
    this.element.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        this.element.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }
}

export default BottomNav;
