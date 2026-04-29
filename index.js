/**
 * Root Application Router
 * Handles routing for public-facing pages (home, services, articles)
 * Integrates authentication and navigation across all portals
 */

import { sessionManager } from './gvc-backend/services/SessionManager.js';
import { routeGuard } from './gvc-backend/services/RouteGuard.js';
import Home from './views/Home.js';
import Services from './views/Services.js';
import ServicesDetail from './views/ServicesDetail.js';
import Articles from './views/Articles.js';
import ArticlesDetail from './views/ArticlesDetail.js';

class RootRouter {
  constructor() {
    this.root = document.getElementById('root');
    this.currentView = null;
    this.currentRoute = 'home';
    
    this.views = {
      'home': Home,
      'services': Services,
      'service-details': ServicesDetail,
      'articles': Articles,
      'article-details': ArticlesDetail
    };

    this.setupEventListeners();
    this.handleInitialRoute();
  }

  setupEventListeners() {
    // Listen for navigation events
    window.addEventListener('navigate', (e) => {
      const { route, params } = e.detail;
      this.navigateTo(route, params);
    });

    // Listen for session changes
    window.addEventListener('session-created', () => {
      console.log('[v0] Session created, updating navigation');
      this.updateNavigationState();
    });

    window.addEventListener('session-destroyed', () => {
      console.log('[v0] Session destroyed, redirecting to home');
      this.navigateTo('home');
    });

    // Handle hash-based navigation
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1) || 'home';
      if (this.views[hash]) {
        this.navigateTo(hash);
      }
    });
  }

  handleInitialRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    this.navigateTo(hash);
  }

  navigateTo(route, params = {}) {
    console.log('[v0] Router navigating to:', route, params);

    // Check if route is accessible
    if (!routeGuard.canAccessRoute(route)) {
      const redirectRoute = routeGuard.getRedirectRoute();
      console.log('[v0] Access denied, redirecting to:', redirectRoute);
      this.navigateTo(redirectRoute);
      return;
    }

    // Check if view exists
    if (!this.views[route]) {
      console.log('[v0] Route not found:', route);
      this.navigateTo('home');
      return;
    }

    // Store current route
    this.currentRoute = route;
    window.location.hash = route;

    // Unmount current view
    if (this.currentView) {
      this.currentView.destroy();
    }

    // Mount new view
    const ViewClass = this.views[route];
    this.currentView = new ViewClass(params);
    this.currentView.mount(this.root);

    console.log('[v0] View mounted:', route);
  }

  updateNavigationState() {
    const session = sessionManager.getCurrentSession();
    console.log('[v0] Current session:', session?.type, session?.role);
  }

  getCurrentRoute() {
    return this.currentRoute;
  }
}

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('[v0] Initializing root router');
  window.appRouter = new RootRouter();
});

export default RootRouter;
