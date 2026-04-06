import { Component } from '../../core/src/index.js';

/**
 * Alerts component
 */
export class Alerts extends Component {
  render() {
    const { type = 'info', message = '', dismissible = true } = this.props;

    return `
      <div class="alert alert-${type}" role="alert">
        <p>${message}</p>
        ${dismissible ? `<button class="alert-close" aria-label="Close">×</button>` : ''}
      </div>
    `;
  }

  onMount() {
    const closeBtn = this.element.querySelector('.alert-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
      });
    }
  }
}

export default Alerts;
