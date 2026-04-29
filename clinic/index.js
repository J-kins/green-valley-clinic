import AppLayout from '../packages/components/src/AppLayout.js';
import AuthLayout from '../packages/components/src/AuthLayout.js';
import Dashboard from './views/Dashboard.js';
import StaffLogin from './views/StaffLogin.js';
import PasswordReset from './views/PasswordReset.js';
import StaffManagement from './views/StaffManagement.js';
import HelpDesk from './views/HelpDesk.js';
import PatientDetails from './views/PatientDetails.js';
import ClinicalNotes from './views/ClinicalNotes.js';
import LabAndImaging from './views/LabAndImaging.js';
import Inventory from './views/Inventory.js';
import ProcurementOrders from './views/ProcurementOrders.js';
import Finance from './views/Finance.js';
import Administration from './views/Administration.js';

// GVC Backend - Mock Database & APIs
import db from '../gvc-backend/db.js';
import * as AuthAPI from '../gvc-backend/api/auth.js';
import * as AppointAPI from '../gvc-backend/api/appointments.js';
import * as PatientAPI from '../gvc-backend/api/patients.js';
import * as StaffAPI from '../gvc-backend/api/staff.js';
import * as DashboardAPI from '../gvc-backend/api/dashboard.js';

/**
 * Global Search Handler for Clinic Staff
 * Enables searching patients, staff, and appointments
 */
window.searchPatients = async (query) => {
    console.log('[v0] Clinic searching patients:', query);
    if (!query || query.length < 2) return [];
    try {
        const result = await PatientAPI.searchPatients(query);
        if (result.ok) {
            console.log('[v0] Patient search results:', result.data);
            return result.data;
        }
        return [];
    } catch (error) {
        console.error('[v0] Patient search error:', error);
        return [];
    }
};

window.searchStaff = async (query) => {
    console.log('[v0] Searching staff:', query);
    if (!query || query.length < 2) return [];
    try {
        const result = await StaffAPI.listStaff({ search: query });
        if (result.ok) {
            console.log('[v0] Staff search results:', result.data);
            return result.data;
        }
        return [];
    } catch (error) {
        console.error('[v0] Staff search error:', error);
        return [];
    }
};

window.searchAppointments = async (query) => {
    console.log('[v0] Searching appointments:', query);
    if (!query || query.length < 2) return [];
    try {
        const result = await AppointAPI.listAppointments({ search: query });
        if (result.ok) {
            console.log('[v0] Appointment search results:', result.data);
            return result.data;
        }
        return [];
    } catch (error) {
        console.error('[v0] Appointment search error:', error);
        return [];
    }
};

/**
 * Clinic Staff Portal Router
 * Handles role-based access control and view routing for clinic staff
 * Authentication required for all views
 */

import { sessionManager } from '../gvc-backend/services/SessionManager.js';

class ClinicRouter {
  constructor() {
    this.root = document.getElementById('clinic-root');
    this.currentView = null;
    this.currentRoute = 'staff-login';

    // Public routes - no auth required
    this.publicRoutes = ['staff-login', 'password-reset'];

    // Role-based protected routes
    this.routesByRole = {
      'doctor': ['dashboard', 'patients', 'clinical-notes', 'lab-imaging', 'appointments'],
      'admin': ['dashboard', 'staff', 'admin', 'finance'],
      'front-desk': ['dashboard', 'patients', 'appointments'],
      'staff': ['dashboard', 'helpdesk']
    };

    // All available view classes
    this.views = {
      'staff-login': StaffLogin,
      'password-reset': PasswordReset,
      'dashboard': Dashboard,
      'patients': PatientDetails,
      'clinical-notes': ClinicalNotes,
      'lab-imaging': LabAndImaging,
      'staff': StaffManagement,
      'helpdesk': HelpDesk,
      'inventory': Inventory,
      'procurement': ProcurementOrders,
      'finance': Finance,
      'admin': Administration
    };

    console.log('[v0] Initializing Clinic Router');
    console.log('[v0] GVC Backend initialized with tables:', Object.keys(db._tables || {}));
    
    this.setupEventListeners();
    this.handleInitialRoute();
  }

  setupEventListeners() {
    // Listen for navigate events from views
    window.addEventListener('navigate', (e) => {
      const { route, params } = e.detail;
      this.navigateTo(route, params);
    });

    // Session events
    window.addEventListener('session-created', () => {
      console.log('[v0] Staff session created');
      this.updateUserState();
    });

    window.addEventListener('session-destroyed', () => {
      console.log('[v0] Staff logged out');
      this.navigateTo('staff-login');
    });

    // Hash-based navigation
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      if (hash && this.views[hash]) {
        this.navigateTo(hash);
      }
    });
  }

  handleInitialRoute() {
    const hash = window.location.hash.slice(1);
    const session = sessionManager.getCurrentSession();

    if (session && session.type === 'staff') {
      // If logged in, go to dashboard
      this.navigateTo('dashboard');
    } else {
      // If not logged in, go to login
      this.navigateTo('staff-login');
    }
  }

  canAccessRoute(route) {
    const session = sessionManager.getCurrentSession();

    // Public routes
    if (this.publicRoutes.includes(route)) return true;

    // Protected routes - check authentication and role
    if (!session || session.type !== 'staff') {
      return false;
    }

    const userRole = session.user?.role;
    const allowedRoutes = this.routesByRole[userRole] || [];

    return allowedRoutes.includes(route);
  }

  navigateTo(route, params = {}) {
    console.log('[v0] Clinic router navigating to:', route);

    if (!this.canAccessRoute(route)) {
      const redirectRoute = sessionManager.isAuthenticated() ? 'dashboard' : 'staff-login';
      console.log('[v0] Access denied, redirecting to:', redirectRoute);
      this.navigateTo(redirectRoute);
      return;
    }

    if (!this.views[route]) {
      console.log('[v0] Route not found:', route);
      this.navigateTo('staff-login');
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

    console.log('[v0] Clinic view mounted:', route);
  }

  updateUserState() {
    const session = sessionManager.getCurrentSession();
    if (session) {
      console.log('[v0] Staff state updated:', {
        name: session.user.name,
        role: session.user.role
      });
    }
  }
}

// Initialize clinic portal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('[v0] Initializing clinic staff portal');
  window.clinicRouter = new ClinicRouter();
});

export default ClinicRouter;
