# Green Valley Clinic

A comprehensive vanilla JavaScript framework with UI components for clinic management and patient booking systems. Built with a focus on creating calm, intuitive interfaces for both medical staff and patients.

## Project Overview

Green Valley Clinic is a full-featured healthcare management platform featuring a staff portal for clinic operations and a patient-facing portal for appointments, health records, and medical information. The application emphasizes clean, non-clustered interfaces suitable for busy medical professionals and patient self-management.

## Project Structure

This is a monorepo project managed with npm workspaces, containing:

### Core Packages (`/packages`)

- **`@my-framework/core`** — Core framework utilities, components, and services
- **`@my-framework/components`** — Reusable UI components (buttons, modals, layouts, etc.)
- **`@my-framework/hooks`** — Custom React-like hooks for state management
- **`@my-framework/router`** — Lightweight routing system
- **`@my-framework/utils`** — Utility functions
- **`@my-framework/styles`** — SCSS stylesheets and theming with Green Valley color palette
- **`@my-framework/theme`** — Theme configuration and assets
- **`@my-framework/cli`** — Command-line tools for development
- **`@my-framework/testing`** — Testing utilities and helpers
- **`@my-framework/docs`** — Documentation and storybook
- **`@my-framework/templates`** — HTML email and layout templates

### Applications

- **`/clinic`** — Staff clinic management application with admin interfaces
- **`/public`** — Public-facing patient portal for appointments and health information

## Getting Started

### Prerequisites

- Node.js 16+ (tested with v24.14.1)
- npm 8+ (tested with v11.11.0)
- Git (for version control)

### Installation

```bash
npm install
```

This installs dependencies for the root project and all workspaces.

### Development

Start the development server with live Sass compilation and browser sync:

```bash
npm run dev
```

This command launches:
- **Sass Compiler** — Watches SCSS files in `packages/styles/` and compiles to `dist/main.css` in real-time
- **Browser Sync Server** — Starts a local development server with automatic page reload when files change
- **Live Reload** — Monitors HTML, JavaScript, and CSS files for changes

Once running, open your browser and navigate to the local server URL (typically `http://localhost:3000`).

### Build Commands

- `npm run sass` — One-time Sass compilation
- `npm run sass:watch` — Watch and compile Sass files continuously
- `npm run serve` — Start development server with browser-sync

## Core Features

### Technology Stack
- **Vanilla JavaScript** — No dependencies on large frameworks for lightweight performance
- **Component Library** — Modular, reusable UI components for consistency
- **SCSS Styling** — Organized stylesheets with theming and Green Valley color palette
- **Monorepo Structure** — Multiple packages organized with npm workspaces
- **Browser Sync** — Live reload and multi-device testing during development
- **Responsive Design** — Mobile-first approach with tablet and desktop enhancements

## Clinic Management Features

### Staff Portal (`/clinic`)
- **Dashboard** — Hero banner with shift status, key metrics, patient list, and quick actions
- **Patient Management** — Detailed patient profiles with tabs for vitals, history, medications, and notes
- **Clinical Notes** — Secure note-taking with filtering and modal-based creation
- **Lab & Imaging** — Lab order management with results tracking and priority indicators
- **Inventory Management** — Medical supplies tracking with stock alerts and cost analysis
- **Procurement Orders** — Purchase order system with supplier management and delivery tracking
- **Finance Dashboard** — Revenue/expense tracking, billing management, and financial metrics
- **Administration Panel** — Staff directory, system settings, audit logs, and reports
- **Authentication** — Secure staff login with password recovery

### Patient Portal (`/public`)
- **Landing Page** — Patient-focused homepage directing to login/signup (staff pages hidden)
- **Patient Dashboard** — Hero banner with next appointment, health metrics, activity feed, and quick actions
- **Appointment Booking** — Easy scheduling system with availability management
- **Appointment Management** — View, reschedule, and cancel appointments
- **Health Records** — Access to medical history and lab results
- **Pharmacy Services** — Medication information and prescription management
- **Profile Management** — Personal information and contact details
- **Authentication** — Patient login and signup with secure sessions

## Design Philosophy

Green Valley Clinic prioritizes **calm, focused interfaces** for healthcare professionals and patients:

### Visual Design
- **Color Palette**: Soft Mint, Peach, Lavender, Butter, Navy Sidebar with white backgrounds
- **Layout**: Clean 2-column and card-based layouts with proper breathing room
- **Typography**: Clear hierarchy with optimized font sizes for readability
- **Spacing**: Consistent padding and gaps to reduce cognitive overload
- **Responsive**: Mobile-first design optimized for tablets and desktops

### UX Principles
- Minimize visual clutter to avoid overwhelming busy medical staff
- Reduce complexity through focused dashboards and modular views
- Provide clear navigation and intuitive workflows
- Use status badges and color coding for quick visual scanning
- Implement proper modal and form systems for data entry

## Project Architecture

```
├── packages/
│   ├── core/          # Framework utilities and base classes
│   ├── components/    # Reusable UI components
│   ├── styles/        # SCSS stylesheets with color variables
│   ├── hooks/         # State management utilities
│   ├── router/        # Lightweight router
│   └── utils/         # Helper functions
├── clinic/            # Staff application
│   ├── views/         # Staff pages and components
│   ├── index.js       # Application entry point
│   └── index.html     # HTML template
├── public/            # Patient application
│   ├── views/         # Patient pages and components
│   ├── index.js       # Application entry point
│   └── index.html     # HTML template
├── dist/              # Compiled CSS output
└── examples/          # Example implementations
```

## File Structure Details

- **`packages/styles/src/components/`** — Component-specific SCSS files including:
  - `_dashboards.scss` — Staff dashboard layouts
  - `_clinical-views.scss` — Clinical staff interfaces
  - `_admin-views.scss` — Administrative interfaces
  - `_mobile-views.scss` — Patient portal styling
  - `_buttons.scss`, `_forms.scss`, `_modals.scss` — Common components

- **`packages/components/src/`** — JavaScript component classes:
  - `MobileLayout.js` — Patient portal shell with bottom navigation
  - `AppLayout.js` — Staff application layout with sidebar
  - `StatCard.js` — Reusable metric cards

- **`clinic/views/`** — Staff application pages:
  - `Dashboard.js` — Main staff dashboard
  - `PatientDetails.js` — Detailed patient information
  - `ClinicalNotes.js` — Clinical documentation
  - `LabAndImaging.js` — Lab and imaging management
  - `Inventory.js` — Medical supplies inventory
  - `ProcurementOrders.js` — Purchase order management
  - `Finance.js` — Financial tracking
  - `Administration.js` — System administration

- **`public/views/`** — Patient portal pages:
  - `Landing.js` — Patient landing page
  - `PatientLogin.js` — Login interface
  - `PatientSignup.js` — Registration interface
  - `PatientDashboard.js` — Patient home dashboard
  - `BookAppointment.js` — Appointment booking
  - `MyAppointments.js` — Appointment management
  - `Pharmacy.js` — Pharmacy information
  - `ContactUs.js` — Contact information

## Browser Support

Modern browsers with ES6 support (Chrome, Firefox, Safari, Edge). For older browser support, JavaScript transpilation may be required.

## Development Tips

### CSS Compilation Errors
If you see Sass compilation errors, check that all SCSS files in `packages/styles/src/` are properly imported in the component index files.

### Live Reload Not Working
Ensure that browser-sync is running (`npm run dev`) and check that your browser is viewing the correct localhost URL shown in the terminal.

### Module Import Issues
Since this uses ES6 modules in vanilla JavaScript, ensure all component imports use the correct relative paths and end with `.js` extensions.

### Color Scheme Customization
Edit color variables in `packages/styles/src/base/_variables.scss` to customize the Green Valley color palette.

## Contributing

When adding new features:
1. Create component files in `packages/components/src/` if reusable
2. Create view files in either `clinic/views/` or `public/views/`
3. Add corresponding SCSS styling in `packages/styles/src/components/`
4. Import styles in the appropriate component index file
5. Test with `npm run dev` and verify responsive design

## License

MIT
