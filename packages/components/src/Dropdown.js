import { Component } from '../../core/src/index.js';

/**
 * Dropdown component
 */
export class Dropdown extends Component {
  constructor(props = {}) {
    super(props);
    this.state = { isOpen: false };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { label = 'Menu', items = [] } = this.props;
    const { isOpen } = this.state;

    return `
      <div class="dropdown">
        <button class="dropdown-toggle">${label}</button>
        <ul class="dropdown-menu ${isOpen ? 'open' : ''}">
          ${items.map(item => `<li><a href="${item.href}">${item.label}</a></li>`).join('')}
        </ul>
      </div>
    `;
  }

  onMount() {
    const toggle = this.element.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggle());
    }
  }
}

export default Dropdown;
