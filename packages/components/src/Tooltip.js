import { Component } from '../../core/src/index.js';

/**
 * Tooltip component
 */
export class Tooltip extends Component {
  constructor(props = {}) {
    super(props);
    this.state = { visible: false };
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  render() {
    const { text = '', position = 'top' } = this.props;
    const { visible } = this.state;

    return `
      <div class="tooltip-wrapper">
        <div class="tooltip-trigger">Hover me</div>
        ${visible ? `<div class="tooltip ${position}">${text}</div>` : ''}
      </div>
    `;
  }

  onMount() {
    const trigger = this.element.querySelector('.tooltip-trigger');
    if (trigger) {
      trigger.addEventListener('mouseenter', () => this.show());
      trigger.addEventListener('mouseleave', () => this.hide());
    }
  }
}

export default Tooltip;
