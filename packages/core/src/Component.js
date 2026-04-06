/**
 * Base Component class for the vanilla JS framework
 * @module Component
 */

export class Component {
  /**
   * Create a new Component instance
   * @param {Object} props - Initial properties
   */
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.element = null;
    this._isMounted = false;
  }

  /**
   * Set component state and trigger re-render
   * @param {Object} newState - New state properties to merge
   */
  setState(newState) {
    const oldState = { ...this.state };
    this.state = { ...this.state, ...newState };
    
    if (this._isMounted && this._shouldUpdate(oldState, this.state)) {
      this.update();
    }
  }

  /**
   * Determine if component should re-render after state change
   * @protected
   * @returns {boolean}
   */
  _shouldUpdate(oldState, newState) {
    return JSON.stringify(oldState) !== JSON.stringify(newState);
  }

  /**
   * Update the component's DOM representation
   * @protected
   */
  update() {
    if (!this.element) return;

    const newContent = this.render();
    
    // Simple DOM update - in a real VDOM this would be a diff/patch
    if (typeof newContent === 'string') {
      const temp = document.createElement('div');
      temp.innerHTML = newContent.trim();
      const newElement = temp.firstChild;
      
      if (this.element.parentNode) {
        this.element.parentNode.replaceChild(newElement, this.element);
      }
      this.element = newElement;
    } else if (newContent instanceof HTMLElement) {
      if (this.element.parentNode) {
        this.element.parentNode.replaceChild(newContent, this.element);
      }
      this.element = newContent;
    }

    this.onUpdate();
  }

  /**
   * Mount the component to a DOM container
   * @param {HTMLElement} container - Target container
   */
  mount(container) {
    const content = this.render();
    
    if (typeof content === 'string') {
      const temp = document.createElement('div');
      temp.innerHTML = content.trim();
      this.element = temp.firstChild;
    } else {
      this.element = content;
    }

    container.appendChild(this.element);
    this._isMounted = true;
    this.onMount();
  }

  /**
   * Unmount the component from the DOM
   */
  unmount() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this._isMounted = false;
    this.onUnmount();
  }

  /**
   * Render the component's HTML structure
   * @abstract
   * @returns {string|HTMLElement}
   */
  render() {
    return '';
  }

  // Lifecycle hooks
  onMount() {}
  onUpdate() {}
  onUnmount() {}
}

export default Component;
