import { Component } from '../../core/src/index.js';

/**
 * Footer component for the application
 */
export class Footer extends Component {
  render() {
    const { 
      copyright = `&copy; ${new Date().getFullYear()} Bright Path`, 
      links = [] 
    } = this.props;

    return `
      <footer class="main-footer">
        <div class="footer-container">
          <div class="footer-links">
            <ul>
              ${links.map(link => `
                <li><a href="${link.href}">${link.label}</a></li>
              `).join('')}
            </ul>
          </div>
          <div class="footer-copyright">
            <p>${copyright}</p>
          </div>
        </div>
      </footer>
    `;
  }
}

export default Footer;
