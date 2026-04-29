/**
 * RouteGuard - Handles route protection and access control
 * Manages public and protected routes based on authentication and roles
 */

import { sessionManager } from './SessionManager.js';

class RouteGuard {
  constructor() {
    this.publicRoutes = [
      'home',
      'services',
      'service-details',
      'articles',
      'article-details',
      'patient-login',
      'patient-signup',
      'staff-login',
      'staff-signup'
    ];

    this.patientRoutes = [
      'patient-dashboard',
      'patient-appointments',
      'patient-medical-records',
      'patient-medications'
    ];

    this.staffRoutes = {
      'doctor': ['doctor-dashboard', 'doctor-patients', 'doctor-appointments', 'doctor-notes'],
      'admin': ['admin-dashboard', 'admin-staff', 'admin-reports', 'admin-settings'],
      'staff': ['staff-dashboard', 'staff-appointments', 'staff-patients'],
      'front-desk': ['frontdesk-dashboard', 'frontdesk-appointments', 'frontdesk-checkin']
    };

    this.currentRoute = null;
  }

  /**
   * Check if route is accessible
   */
  canAccessRoute(routeName) {
    // Public routes are always accessible
    if (this.publicRoutes.includes(routeName)) {
      return true;
    }

    const session = sessionManager.getCurrentSession();

    // Not authenticated
    if (!session) {
      console.log('[v0] Route guard: User not authenticated. Route:', routeName);
      return false;
    }

    // Patient routes
    if (this.patientRoutes.includes(routeName)) {
      return session.type === 'patient';
    }

    // Staff routes
    for (const [role, routes] of Object.entries(this.staffRoutes)) {
      if (routes.includes(routeName)) {
        return session.type === 'staff' && session.role === role;
      }
    }

    console.log('[v0] Route guard: No access to route:', routeName);
    return false;
  }

  /**
   * Get redirect route for unauthorized access
   */
  getRedirectRoute() {
    const session = sessionManager.getCurrentSession();

    if (!session) {
      return 'patient-login';
    }

    if (session.type === 'patient') {
      return 'patient-dashboard';
    }

    if (session.type === 'staff') {
      switch (session.role) {
        case 'doctor':
          return 'doctor-dashboard';
        case 'admin':
          return 'admin-dashboard';
        case 'staff':
          return 'staff-dashboard';
        case 'front-desk':
          return 'frontdesk-dashboard';
        default:
          return 'staff-login';
      }
    }

    return 'home';
  }

  /**
   * Navigate to a protected route
   */
  navigate(routeName, callback) {
    if (this.canAccessRoute(routeName)) {
      this.currentRoute = routeName;
      console.log('[v0] Route guard: Navigating to:', routeName);
      window.dispatchEvent(new CustomEvent('navigate', { detail: { route: routeName } }));
      if (callback) callback();
      return true;
    } else {
      const redirectRoute = this.getRedirectRoute();
      console.log('[v0] Route guard: Access denied. Redirecting to:', redirectRoute);
      window.dispatchEvent(new CustomEvent('navigate', { detail: { route: redirectRoute } }));
      return false;
    }
  }

  /**
   * Get current route
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * Check if user can access staff portal
   */
  canAccessStaffPortal() {
    return sessionManager.isStaff();
  }

  /**
   * Check if user can access patient portal
   */
  canAccessPatientPortal() {
    return sessionManager.isPatient();
  }
}

export const routeGuard = new RouteGuard();
export default RouteGuard;
