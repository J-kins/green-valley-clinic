import MobileLayout from '../packages/components/src/MobileLayout.js';
import Landing from './views/Landing.js';
import PatientLogin from './views/PatientLogin.js';
import PatientSignup from './views/PatientSignup.js';
import PatientDashboard from './views/PatientDashboard.js';
import BookAppointment from './views/BookAppointment.js';
import Pharmacy from './views/Pharmacy.js';
import MyAppointments from './views/MyAppointments.js';
import About from './views/About.js';
import ContactUs from './views/ContactUs.js';

// GVC Backend - Mock Database & APIs
import db from '../gvc-backend/db.js';
import * as AuthAPI from '../gvc-backend/api/auth.js';
import * as AppointAPI from '../gvc-backend/api/appointments.js';
import * as PatientAPI from '../gvc-backend/api/patients.js';
import * as PublicAPI from '../gvc-backend/api/public.js';

/**
 * Global Search Handler
 * Implements patient/appointment search across the platform
 */
window.searchPatients = async (query) => {
    console.log('[v0] Searching patients:', query);
    if (!query || query.length < 2) return [];
    try {
        const result = await PatientAPI.searchPatients(query);
        if (result.ok) {
            console.log('[v0] Search results:', result.data);
            return result.data;
        }
        return [];
    } catch (error) {
        console.error('[v0] Search error:', error);
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

window.searchHealthArticles = async (query) => {
    console.log('[v0] Searching articles:', query);
    if (!query || query.length < 1) return [];
    try {
        const result = await PublicAPI.getHealthArticles();
        if (result.ok) {
            const filtered = result.data.filter(article => 
                article.title.toLowerCase().includes(query.toLowerCase()) ||
                article.body.toLowerCase().includes(query.toLowerCase())
            );
            console.log('[v0] Article search results:', filtered);
            return filtered;
        }
        return [];
    } catch (error) {
        console.error('[v0] Article search error:', error);
        return [];
    }
};

/**
 * Public Patient Portal Entry Point
 * Bootstraps the mobile-first application shell and handles view switching.
 * Includes backend database initialization and API access.
 */
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('public-root');
    if (!root) return;
    
    // Initialize backend database
    console.log('[v0] Initializing GVC Backend...');
    console.log('[v0] Database tables:', Object.keys(db._tables || {}));

    // 1. Mount the Mobile Layout (Shell)
    const layout = new MobileLayout();
    layout.mount(root);

    const viewMount = document.getElementById('mobile-view-mount');
    if (!viewMount) return;

    // 2. Initialize Views
    const views = {
        landing: new Landing(),
        patientLogin: new PatientLogin(),
        patientSignup: new PatientSignup(),
        dashboard: new PatientDashboard(),
        booking: new BookAppointment(),
        pharmacy: new Pharmacy(),
        appointments: new MyAppointments(),
        profile: { 
            mount: (container) => { 
                container.innerHTML = `
                    <div class="mobile-view">
                        <header class="mobile-header">
                            <h2 class="h2">My Profile</h2>
                            <p class="small">Manage your personal information</p>
                        </header>
                        <div class="card mt-24 center">
                            <div class="profile-avatar-large mx-auto">JD</div>
                            <h3 class="h3 mt-16">John Doe</h3>
                            <p class="small">Patient ID: GV-9821</p>
                            <button class="btn-secondary-hifi mt-24">Edit Profile</button>
                        </div>
                    </div>
                `; 
            } 
        }
    };

    // 3. Mount Initial View (Landing page)
    views.landing.mount(viewMount);

    // 4. Handle View Switching via BottomNav
    document.addEventListener('click', (e) => {
        const navItem = e.target.closest('.nav-item');
        if (navItem && viewMount) {
            const viewId = navItem.dataset.id;
            if (views[viewId]) {
                // Clear and Switch
                viewMount.innerHTML = '';
                views[viewId].mount(viewMount);
                
                // Analytics or Logging can go here
                console.log(`Switched to mobile view: ${viewId}`);
            }
        }
    });

    // 5. Handle Custom Navigation Events
    window.addEventListener('navigate-patient-login', () => {
        viewMount.innerHTML = '';
        views.patientLogin.mount(viewMount);
    });

    window.addEventListener('navigate-patient-signup', () => {
        viewMount.innerHTML = '';
        views.patientSignup.mount(viewMount);
    });

    window.addEventListener('navigate-landing', () => {
        viewMount.innerHTML = '';
        views.landing.mount(viewMount);
    });

    window.addEventListener('navigate-booking', () => {
        viewMount.innerHTML = '';
        views.booking.mount(viewMount);
    });

    window.addEventListener('navigate-dashboard', () => {
        viewMount.innerHTML = '';
        views.dashboard.mount(viewMount);
    });
});
