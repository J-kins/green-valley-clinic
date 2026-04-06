import { Component } from '../../core/src/index.js';

/**
 * Toast notification component
 */
export class Toast extends Component {
  constructor(props = {}) {
    super(props);
    this.state = { visible: true };
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  render() {
    const { message = '', type = 'info' } = this.props;
    const { visible } = this.state;

    if (!visible) return '<div></div>';

    return `
      <div class="toast toast-${type}" role="alert">
        <p>${message}</p>
        <button class="toast-close" aria-label="Close">×</button>
      </div>
    `;
  }

  onMount() {
    const closeBtn = this.element.querySelector('.toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }
  }
}

export default Toast;
