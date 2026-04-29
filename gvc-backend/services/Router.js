// Router — SPA routing with authentication protection
import AuthService from './AuthService.js';

class Router {
  constructor() {
    this.routes = new Map();
    this.currentView = null;
    this.currentRoute = null;
    this.setupHashListener();
  }

  /**
   * Register a route
   * @param {string} path - Route path (e.g., '#home', '#services', '#patient/dashboard')
   * @param {Component} component - Component class to render
   * @param {object} options - { protected: boolean, requiredRole: string|string[] }
   */
  register(path, component, options = {}) {
    this.routes.set(path, { component, options });
  }

  /**
   * Navigate to a route
   */
  navigate(path) {
    window.location.hash = path;
  }

  /**
   * Setup hash change listener
   */
  setupHashListener() {
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  /**
   * Check if user can access a route
   */
  canAccess(options) {
    const token = localStorage.getItem('gvc_auth_token');

    if (options.protected) {
      if (!token || !AuthService.isAuthenticated(token)) {
        return false;
      }

      // Check role requirements
      if (options.requiredRole) {
        const roles = Array.isArray(options.requiredRole) ? options.requiredRole : [options.requiredRole];
        if (!AuthService.hasAnyRole(token, roles)) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Handle route change
   */
  async handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const route = this.routes.get(`#${hash}`);

    console.log(`[v0] Route: #${hash}`);

    if (!route) {
      this.renderNotFound();
      return;
    }

    if (!this.canAccess(route.options)) {
      console.log(`[v0] Access denied for route: #${hash}`);
      this.navigate('#login');
      return;
    }

    this.renderRoute(route);
  }

  /**
   * Render a route
   */
  renderRoute(route) {
    const root = this.getRootElement();
    if (!root) return;

    try {
      const component = new route.component();
      const html = component.render();
      root.innerHTML = html;

      if (component.onMount) {
        component.onMount();
      }

      this.currentView = component;
    } catch (error) {
      console.error('[v0] Error rendering route:', error);
      root.innerHTML = '<div class="error">Error loading page</div>';
    }
  }

  /**
   * Render 404 not found
   */
  renderNotFound() {
    const root = this.getRootElement();
    if (root) {
      root.innerHTML = `
        <div class="not-found-view">
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist.</p>
          <a href="#home" class="btn-primary">Go Home</a>
        </div>
      `;
    }
  }

  /**
   * Get root element (try multiple options)
   */
  getRootElement() {
    return document.getElementById('public-root') || 
           document.getElementById('clinic-root') || 
           document.getElementById('root');
  }

  /**
   * Get current user session
   */
  getCurrentUser() {
    const token = localStorage.getItem('gvc_auth_token');
    return token ? AuthService.getSession(token) : null;
  }

  /**
   * Logout and redirect
   */
  logout() {
    const token = localStorage.getItem('gvc_auth_token');
    if (token) {
      AuthService.logout(token);
    }
    this.navigate('#home');
  }
}

export default new Router();
