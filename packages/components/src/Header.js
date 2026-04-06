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
    const { logo = 'Bright Path', navItems = [] } = this.props;
    const { isMenuOpen } = this.state;

    return `
      <header class="main-header">
        <div class="header-container">
          <div class="logo">
            <h1>${logo}</h1>
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
