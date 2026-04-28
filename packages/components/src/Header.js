import { Component } from '../../core/src/index.js';

/**
 * Header component for the application
 */
export class Header extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }

  toggleMenu() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  render() {
    const { logo = 'Bright Path', navItems = [], actions = [] } = this.props;
    const { isMenuOpen } = this.state;

    return `
      <header class="main-header">
        <div class="header-container">
          <a class="logo" href="#top" aria-label="Go to top of the page">
            <span class="logo-badge">GV</span>
            <span class="logo-copy">
              <span class="logo-title">${logo}</span>
              <span class="logo-subtitle">Care navigation hub</span>
            </span>
          </a>
          <div class="header-actions desktop-only">
            ${actions.map(action => `
              <a class="header-action ${action.variant === 'primary' ? 'primary' : ''}" href="${action.href}">${action.label}</a>
            `).join('')}
          </div>
          <button class="menu-toggle" aria-label="Toggle Navigation">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
          <nav class="main-nav ${isMenuOpen ? 'open' : ''}">
            <ul>
              ${navItems.map(item => `
                <li><a href="${item.href}">${item.label}</a></li>
              `).join('')}
            </ul>
          </nav>
        </div>
        <div class="mobile-nav-panel ${isMenuOpen ? 'open' : ''}">
          <nav>
            <ul>
              ${navItems.map(item => `
                <li><a href="${item.href}">${item.label}</a></li>
              `).join('')}
            </ul>
          </nav>
          ${actions.length ? `
            <div class="mobile-nav-actions">
              ${actions.map(action => `
                <a class="header-action ${action.variant === 'primary' ? 'primary' : ''}" href="${action.href}">${action.label}</a>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </header>
    `;
  }

  onMount() {
    const toggle = this.element.querySelector('.menu-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggleMenu());
    }
  }
}

export default Header;
