import { Component } from '../../core/src/index.js';

/**
 * Navigation component
 */
export class Navigation extends Component {
  render() {
    const { items = [] } = this.props;
    
    return `
      <nav class="navigation">
        <ul>
          ${items.map(item => `<li><a href="${item.href}">${item.label}</a></li>`).join('')}
        </ul>
      </nav>
    `;
  }
}

export default Navigation;
