import { Component } from '../../core/src/index.js';

/**
 * Accordion component for collapsible content
 */
export class Accordion extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      activeIndices: new Set()
    };
  }

  toggle(index) {
    const { activeIndices } = this.state;
    const { multiple = false } = this.props;
    
    if (activeIndices.has(index)) {
      activeIndices.delete(index);
    } else {
      if (!multiple) {
        activeIndices.clear();
      }
      activeIndices.add(index);
    }
    
    this.setState({ activeIndices });
  }

  render() {
    const { items = [] } = this.props;
    const { activeIndices } = this.state;

    return `
      <div class="accordion">
        ${items.map((item, index) => {
          const isActive = activeIndices.has(index);
          return `
            <div class="accordion-item ${isActive ? 'active' : ''}">
              <div class="accordion-header" data-index="${index}">
                <h3>${item.title}</h3>
                <span class="accordion-icon">${isActive ? '-' : '+'}</span>
              </div>
              <div class="accordion-content">
                <p>${item.content}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  onMount() {
    const headers = this.element.querySelectorAll('.accordion-header');
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const index = parseInt(header.getAttribute('data-index'));
        this.toggle(index);
      });
    });
  }
}

export default Accordion;
