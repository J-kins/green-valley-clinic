import { Component } from '../../core/src/index.js';

/**
 * OffCanvas component - Sidebar drawer
 */
export class OffCanvas extends Component {
  constructor(props = {}) {
    super(props);
    this.state = { isOpen: false };
  }

  open() {
    this.setState({ isOpen: true });
  }

  close() {
    this.setState({ isOpen: false });
  }

  render() {
    const { title = 'Menu', content = '', position = 'start' } = this.props;
    const { isOpen } = this.state;

    return `
      <div class="offcanvas-backdrop ${isOpen ? 'show' : ''}"></div>
      <div class="offcanvas ${position} ${isOpen ? 'show' : ''}">
        <div class="offcanvas-header">
          <h5>${title}</h5>
          <button class="btn-close" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          ${content}
        </div>
      </div>
    `;
  }

  onMount() {
    const closeBtn = this.element.querySelector('.btn-close');
    const backdrop = this.element.querySelector('.offcanvas-backdrop');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }
    if (backdrop) {
      backdrop.addEventListener('click', () => this.close());
    }
  }
}

export default OffCanvas;
