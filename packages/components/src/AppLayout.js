import { Component } from '../../core/src/index.js';
import Sidebar from './Sidebar.js';
import TopBar from './TopBar.js';

/**
 * AppLayout component with responsive sidebar toggle logic.
 * @module AppLayout
 */
export class AppLayout extends Component {
  render() {
    return `
      <div class="hifi-app-shell">
        <!-- Overlay backdrop for mobile sidebar -->
        <div id="sidebar-backdrop" class="sidebar-backdrop"></div>
        
        <aside id="sidebar-mount"></aside>
        
        <main class="hifi-main-content">
          <header id="topbar-mount"></header>
          <div id="view-mount" class="hifi-view-container">
            <!-- View content will be mounted here -->
          </div>
        </main>
      </div>
    `;
  }

  onMount() {
    // 1. Mount Sub-components
    new Sidebar().mount(this.element.querySelector('#sidebar-mount'));
    new TopBar().mount(this.element.querySelector('#topbar-mount'));

    // 2. Responsive Sidebar Toggle Logic
    // We use event delegation since TopBar is a child component
    this.element.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('#mobile-menu-toggle');
      const backdrop = e.target.closest('#sidebar-backdrop');
      const sidebar = this.element.querySelector('#sidebar-mount');
      const backdropEl = this.element.querySelector('#sidebar-backdrop');

      if (toggleBtn) {
        sidebar.classList.toggle('open');
        backdropEl.classList.toggle('visible');
      }

      if (backdrop) {
        sidebar.classList.remove('open');
        backdropEl.classList.remove('visible');
      }
    });

    // Close sidebar on navigation (for mobile)
    this.element.addEventListener('click', (e) => {
      if (e.target.closest('.nav-item')) {
        const sidebar = this.element.querySelector('#sidebar-mount');
        const backdropEl = this.element.querySelector('#sidebar-backdrop');
        if (window.innerWidth <= 768) { // $bp-mobile
          sidebar.classList.remove('open');
          backdropEl.classList.remove('visible');
        }
      }
    });
  }
}

export default AppLayout;
