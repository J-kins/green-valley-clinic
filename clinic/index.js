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

/**
 * Clinic App Entry Point
 * Manages Auth and App shells and basic routing.
 */
const root = document.getElementById('clinic-root');

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
