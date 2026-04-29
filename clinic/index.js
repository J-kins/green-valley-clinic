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
 * Clinic App Entry Point
 * Manages Auth and App shells and basic routing.
 * Includes backend database initialization and API access.
 */
const root = document.getElementById('clinic-root');

// Initialize backend database
console.log('[v0] Initializing GVC Backend for Clinic...');
console.log('[v0] Available database tables:', Object.keys(db._tables || {}));

/**
 * Helper to mount a layout and a specific view within it.
 * @param {typeof import('../packages/core/src/Component.js').Component} LayoutClass
 * @param {typeof import('../packages/core/src/Component.js').Component} ViewClass
 */
function mountShell(LayoutClass, ViewClass) {
    if (!root) return;
    
    // Clear root and mount layout
    root.innerHTML = '';
    const layout = new LayoutClass();
    layout.mount(root);

    // Mount specific view into the shell
    // AppLayout uses #view-mount, AuthLayout uses #auth-view-mount
    const viewMount = document.getElementById('view-mount') || document.getElementById('auth-view-mount');
    if (viewMount) {
        const view = new ViewClass();
        view.mount(viewMount);
    } else {
        console.error('Mount point not found in current layout!');
    }
}

// 1. Initial State: Start with Login Screen
document.addEventListener('DOMContentLoaded', () => {
    mountShell(AuthLayout, StaffLogin);
});

// 2. Event Listeners for "Routing"
window.addEventListener('login-success', () => {
    mountShell(AppLayout, Dashboard);
});

window.addEventListener('navigate-reset', () => {
    mountShell(AuthLayout, PasswordReset);
});

window.addEventListener('navigate-login', () => {
    mountShell(AuthLayout, StaffLogin);
});

// 3. Inner-App Navigation
window.addEventListener('navigate-view', (e) => {
    const { viewId } = e.detail;
    const viewMount = document.getElementById('view-mount');
    if (!viewMount) return;

    viewMount.innerHTML = '';
    
    // Route to appropriate view
    const views = {
        'dashboard': Dashboard,
        'staff': StaffManagement,
        'helpdesk': HelpDesk,
        'patients': PatientDetails,
        'clinical-notes': ClinicalNotes,
        'lab-imaging': LabAndImaging,
        'inventory': Inventory,
        'procurement': ProcurementOrders,
        'finance': Finance,
        'admin': Administration
    };

    const ViewClass = views[viewId];
    if (ViewClass) {
        new ViewClass().mount(viewMount);
    } else {
        viewMount.innerHTML = `
            <div class="card mt-32">
                <h2 class="h2">Coming Soon</h2>
                <p class="body dim">The ${viewId} view is currently being developed.</p>
            </div>
        `;
    }
});
