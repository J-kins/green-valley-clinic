import { Component } from '../../core/src/index.js';

/**
 * Tabs component
 */
export class Tabs extends Component {
  constructor(props = {}) {
    super(props);
    this.state = { activeTab: 0 };
  }

  setActiveTab(index) {
    this.setState({ activeTab: index });
  }

  render() {
    const { tabs = [] } = this.props;
    const { activeTab } = this.state;

    return `
      <div class="tabs">
        <div class="tabs-header">
          ${tabs.map((tab, index) => `
            <button class="tab-button ${activeTab === index ? 'active' : ''}" data-index="${index}">
              ${tab.label}
            </button>
          `).join('')}
        </div>
        <div class="tabs-content">
          ${tabs[activeTab]?.content || ''}
        </div>
      </div>
    `;
  }

  onMount() {
    const buttons = this.element.querySelectorAll('.tab-button');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        this.setActiveTab(index);
      });
    });
  }
}

export default Tabs;
