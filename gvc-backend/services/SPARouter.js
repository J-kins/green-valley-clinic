// SPARouter — Master Single Page Application Router
// Handles all navigation, authentication checks, and route protection
import AuthService from './AuthService.js';

class SPARouter {
  constructor() {
    this.routes = new Map();
    this.protectedRoutes = new Map();
    this.currentView = null;
    this.viewCache = new Map();
    this.setupHashListener();
  }

  /**
   * Register a public route
   */
  registerPublicRoute(path, htmlUrl) {
    this.routes.set(path, { htmlUrl, protected: false });
  }

  /**
   * Register a protected route
   */
  registerProtectedRoute(path, htmlUrl, requiredRole = null) {
    this.protectedRoutes.set(path, { htmlUrl, requiredRole });
    this.routes.set(path, { htmlUrl, protected: true, requiredRole });
  }

  /**
   * Setup hash change listener for SPA navigation
   */
  setupHashListener() {
    window.addEventListener('hashchange', () => this.handleNavigation());
    window.addEventListener('load', () => this.handleNavigation());
  }

  /**
   * Handle navigation
   */
  async handleNavigation() {
    const hash = window.location.hash.slice(1) || 'home';
    console.log(`[v0] Navigating to: ${hash}`);

    const route = this.findRoute(hash);

    if (!route) {
      this.renderNotFound();
      return;
    }

    if (route.protected && !this.canAccess(route)) {
      console.log('[v0] Access denied, redirecting to login');
      this.navigate('login');
      return;
    }

    await this.loadAndRenderView(route, hash);
  }

  /**
   * Find route by hash
   */
  findRoute(hash) {
    if (this.routes.has(`#${hash}`)) {
      return this.routes.get(`#${hash}`);
    }

    // Check for dynamic routes (e.g., #patient/dashboard, #clinic/admin/dashboard)
    for (const [path, route] of this.routes) {
      const regex = this.pathToRegex(path);
      if (regex.test(`#${hash}`)) {
        return route;
      }
    }

    return null;
  }

  /**
   * Convert path pattern to regex
   */
  pathToRegex(path) {
    const pattern = path
      .replace(/:[^\s/]+/g, '[^/]+')
      .replace(/\*/g, '.*');
    return new RegExp(`^${pattern}$`);
  }

  /**
   * Check if user can access route
   */
  canAccess(route) {
    const token = localStorage.getItem('gvc_auth_token');
    const session = token ? AuthService.getSession(token) : null;

    if (!token || !session) {
      return false;
    }

    if (route.requiredRole) {
      return session.role === route.requiredRole;
    }

    return true;
  }

  /**
   * Load and render view from HTML file
   */
  async loadAndRenderView(route, hash) {
    const root = this.getRootElement();
    if (!root) return;

    try {
      // Check cache first
      if (this.viewCache.has(route.htmlUrl)) {
        root.innerHTML = this.viewCache.get(route.htmlUrl);
        this.executeScripts(root, route.htmlUrl);
        return;
      }

      // Load HTML from file
      const response = await fetch(route.htmlUrl);
      if (!response.ok) throw new Error(`Failed to load: ${route.htmlUrl}`);

      const html = await response.text();
      root.innerHTML = html;

      // Cache the view
      this.viewCache.set(route.htmlUrl, html);

      // Execute any scripts in the loaded HTML
      this.executeScripts(root, route.htmlUrl);

    } catch (error) {
      console.error('[v0] Error loading view:', error);
      root.innerHTML = `
        <div style="padding: 40px; text-align: center;">
          <h2>Error Loading Page</h2>
          <p>${error.message}</p>
          <a href="#home" style="color: #003459; text-decoration: none; font-weight: 600;">Back to Home</a>
        </div>
      `;
    }
  }

  /**
   * Execute scripts in loaded HTML
   */
  executeScripts(container, source) {
    const scripts = container.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      Array.from(script.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = script.textContent;
      script.parentNode.replaceChild(newScript, script);
    });
  }

  /**
   * Get root element
   */
  getRootElement() {
    return document.getElementById('app') ||
           document.getElementById('public-root') || 
           document.getElementById('clinic-root') || 
           document.getElementById('root');
  }

  /**
   * Navigate to a route
   */
  navigate(path) {
    window.location.hash = path.startsWith('#') ? path : `#${path}`;
  }

  /**
   * Render 404 page
   */
  renderNotFound() {
    const root = this.getRootElement();
    if (root) {
      root.innerHTML = `
        <div style="padding: 60px 20px; text-align: center; font-family: Inter, sans-serif;">
          <h2 style="font-size: 28px; margin-bottom: 16px;">Page Not Found</h2>
          <p style="color: #64748B; margin-bottom: 32px;">The page you're looking for doesn't exist.</p>
          <a href="#home" style="
            display: inline-block;
            padding: 10px 20px;
            background: linear-gradient(135deg, #003459 0%, #0A4A7A 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
          ">Go Home</a>
        </div>
      `;
    }
  }

  /**
   * Get current user session
   */
  getCurrentUser() {
    const token = localStorage.getItem('gvc_auth_token');
    return token ? AuthService.getSession(token) : null;
  }

  /**
   * Get current user role
   */
  getCurrentUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    const token = localStorage.getItem('gvc_auth_token');
    return token && AuthService.isAuthenticated(token);
  }

  /**
   * Logout and redirect
   */
  logout() {
    const token = localStorage.getItem('gvc_auth_token');
    if (token) {
      AuthService.logout(token);
    }
    this.viewCache.clear();
    this.navigate('home');
  }

  /**
   * Clear view cache (useful after auth changes)
   */
  clearCache() {
    this.viewCache.clear();
  }
}

export default new SPARouter();
