/**
 * Patient Portal Router
 * Handles authentication and view routing for patient portal
 * Authentication required for all protected views
 */

import { sessionManager } from '../gvc-backend/services/SessionManager.js';
import { routeGuard } from '../gvc-backend/services/RouteGuard.js';

import PatientLogin from './views/PatientLogin.js';
import PatientSignup from './views/PatientSignup.js';
import PatientDashboard from './views/PatientDashboard.js';
import BookAppointment from './views/BookAppointment.js';
import Pharmacy from './views/Pharmacy.js';
import MyAppointments from './views/MyAppointments.js';

class PatientPortalRouter {
  constructor() {
    this.root = document.getElementById('public-root') || document.getElementById('root');
    this.currentView = null;
    this.currentRoute = 'patient-login';
    
    this.publicRoutes = ['patient-login', 'patient-signup'];
    this.protectedRoutes = ['patient-dashboard', 'patient-appointments', 'patient-pharmacy'];

    this.views = {
      'patient-login': PatientLogin,
      'patient-signup': PatientSignup,
      'patient-dashboard': PatientDashboard,
      'patient-appointments': MyAppointments,
      'patient-pharmacy': Pharmacy,
      'book-appointment': BookAppointment
    };

    this.setupEventListeners();
    this.handleInitialRoute();
  }

  setupEventListeners() {
    // Listen for navigate events from views
    window.addEventListener('navigate', (e) => {
      const { route, params } = e.detail;
      this.navigateTo(route, params);
    });

    // Session changes
    window.addEventListener('session-created', () => {
      console.log('[v0] Patient session created');
      this.updateUserState();
    });

    window.addEventListener('session-destroyed', () => {
      console.log('[v0] Patient logged out');
      this.navigateTo('patient-login');
    });

    // Hash-based navigation
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1) || 'patient-login';
      if (this.views[hash]) {
        this.navigateTo(hash);
      }
    });
  }

  handleInitialRoute() {
    const hash = window.location.hash.slice(1);
    const session = sessionManager.getCurrentSession();

    if (session && session.type === 'patient') {
      // If logged in, go to dashboard
      this.navigateTo('patient-dashboard');
    } else {
      // If not logged in, go to login
      this.navigateTo('patient-login');
    }
  }

  canAccessRoute(route) {
    if (this.publicRoutes.includes(route)) return true;

    const session = sessionManager.getCurrentSession();
    if (this.protectedRoutes.includes(route)) {
      return session && session.type === 'patient';
    }

    return false;
  }

  navigateTo(route, params = {}) {
    console.log('[v0] Patient portal navigating to:', route);

    if (!this.canAccessRoute(route)) {
      const redirectRoute = sessionManager.isAuthenticated() ? 'patient-dashboard' : 'patient-login';
      console.log('[v0] Access denied, redirecting to:', redirectRoute);
      this.navigateTo(redirectRoute);
      return;
    }

    if (!this.views[route]) {
      console.log('[v0] Route not found:', route);
      this.navigateTo('patient-login');
      return;
    }

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

    console.log('[v0] Patient portal view mounted:', route);
  }

  updateUserState() {
    const session = sessionManager.getCurrentSession();
    if (session) {
      console.log('[v0] User state updated:', session.user.name);
    }
  }
}

// Initialize patient portal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('[v0] Initializing patient portal');
  window.patientPortal = new PatientPortalRouter();
});

export default PatientPortalRouter;
