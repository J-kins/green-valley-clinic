import { Component } from '../../core/src/index.js';

/**
 * TopBar component for search and profile with responsive menu toggle.
 * @module TopBar
 */
export class TopBar extends Component {
  render() {
    const { user = { name: 'Samuel', role: 'Admin' } } = this.props;

    return `
      <div class="topbar">
        <button id="mobile-menu-toggle" class="mobile-menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="search-bar desktop-only">
          <div class="search-icon"></div>
          <input type="text" placeholder="Search patients, doctors, appointments...">
        </div>

        <div class="topbar-actions">
          <div class="status-indicator desktop-only">
            <span class="status-dot"></span>
            <span class="status-label">Live</span>
          </div>
          
          <div class="notification-area">
            <div class="icon-notif bell"></div>
          </div>

          <div class="profile-card">
            <div class="profile-avatar">S</div>
            <div class="profile-info desktop-only">
              <span class="profile-name">${user.name}</span>
              <span class="profile-role">${user.role}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export default TopBar;
