import { Component } from '../../core/src/index.js';

/**
 * Sidebar component with navigational active state.
 * @module Sidebar
 */
export class Sidebar extends Component {
  render() {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', active: true },
      { id: 'patients', label: 'Patient Details', icon: 'records' },
      { id: 'clinical-notes', label: 'Clinical Notes', icon: 'notes' },
      { id: 'lab-imaging', label: 'Lab & Imaging', icon: 'lab' },
      { id: 'inventory', label: 'Inventory', icon: 'inventory' },
      { id: 'procurement', label: 'Procurement Orders', icon: 'procurement' },
      { id: 'finance', label: 'Finance', icon: 'finance' },
      { id: 'admin', label: 'Administration', icon: 'admin' },
      { id: 'staff', label: 'Staff Management', icon: 'staff' },
      { id: 'helpdesk', label: 'Help Desk', icon: 'help' }
    ];

    return `
      <div class="sidebar">
        <div class="sidebar-brand">
          <div class="brand-logo">
            <div class="logo-inner"></div>
          </div>
          <div class="brand-text">
            <h3>Green Valley</h3>
            <p>Clinic management system</p>
          </div>
        </div>

        <nav class="sidebar-nav">
          <ul>
            ${navItems.map(item => `
              <li class="${item.active ? 'active' : ''} ${item.onboarding ? 'onboarding-item' : ''}" data-id="${item.id}">
                <span class="sidebar-icon icon-${item.icon}"></span>
                <span class="sidebar-label">${item.label}</span>
              </li>
            `).join('')}
          </ul>
        </nav>

        <div class="sidebar-spacer"></div>

        <div class="sidebar-help">
          <div class="help-card">
            <h4>Need help?</h4>
            <p>System guide and support</p>
            <button class="btn-help">Open guide</button>
          </div>
        </div>
      </div>
    `;
  }

  onMount() {
    this.element.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => {
        this.element.querySelectorAll('li').forEach(el => el.classList.remove('active'));
        li.classList.add('active');
        
        // Notify the layout or app of the navigation event
        const viewId = li.dataset.id;
        window.dispatchEvent(new CustomEvent('navigate-view', { detail: { viewId } }));
      });
    });
  }
}

export default Sidebar;
