import { Component } from '../../core/src/index.js';

/**
 * Modal component for interactive overlays
 */
export class Modal extends Component {
  /**
   * Create a new Modal instance
   * @param {Object} props - Component properties
   */
  constructor(props = {}) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false
    };
  }

  /**
   * Open the modal
   */
  show() {
    this.setState({ isOpen: true });
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close the modal
   */
  hide() {
    this.setState({ isOpen: false });
    document.body.style.overflow = 'auto';
  }

  /**
   * Render the modal structure
   * @returns {string}
   */
  render() {
    const { title = 'Modal Title', content = '', showCloseButton = true } = this.props;
    const { isOpen } = this.state;

    if (!isOpen) return '<div></div>'; // Return empty div if closed

    return `
      <div class="modal-overlay ${isOpen ? 'show' : ''}">
        <div class="modal-container">
          <div class="modal-header">
            <h3>${title}</h3>
            ${showCloseButton ? `<button class="modal-close" aria-label="Close Modal">&times;</button>` : ''}
          </div>
          <div class="modal-body">
            ${content}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Set up event listeners on mount
   */
  onMount() {
    const closeBtn = this.element.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }
    
    // Close on overlay click
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.hide();
      }
    });

    // Close on escape key
    const escListener = (e) => {
      if (e.key === 'Escape' && this.state.isOpen) {
        this.hide();
      }
    };
    document.addEventListener('keydown', escListener);
    
    // Clean up would happen in onUnmount but we don't have it fully implemented yet
    this._escListener = escListener;
  }

  onUnmount() {
    document.removeEventListener('keydown', this._escListener);
    document.body.style.overflow = 'auto';
  }
}

export default Modal;
