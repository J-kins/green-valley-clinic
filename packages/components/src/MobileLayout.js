import { Component } from '../../core/src/index.js';
import BottomNav from './BottomNav.js';

/**
 * MobileLayout component refactored to be a fluid, responsive public shell.
 * @module MobileLayout
 */
export class MobileLayout extends Component {
  render() {
    return `
      <div class="mobile-app-shell">
        <!-- Conditional mobile status bar (hidden on desktop via CSS) -->
        <header class="mobile-status-bar">
          <div class="time">9:41</div>
          <div class="notch"></div>
          <div class="indicators">
            <div class="signal"></div>
            <div class="wifi"></div>
            <div class="battery"></div>
          </div>
        </header>
        
        <div class="phone-container">
          <main id="mobile-view-mount" class="mobile-view-content">
            <!-- Fluid view content -->
          </main>
          
          <footer id="bottom-nav-mount"></footer>
        </div>
      </div>
    `;
  }

  onMount() {
    new BottomNav().mount(this.element.querySelector('#bottom-nav-mount'));
  }
}

export default MobileLayout;
