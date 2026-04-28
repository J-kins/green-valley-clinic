# Green Valley Clinic - Development Setup Guide

This guide provides instructions for setting up, running, and debugging the Green Valley Clinic application.

## Quick Start

### Prerequisites
- **Node.js**: v16+ (tested with v24.14.1)
- **npm**: v8+ (tested with v11.11.0)
- **Git**: For version control

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /path/to/green-valley-clinic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The application will start with:
- **Sass Compiler** watching for SCSS changes
- **Browser Sync** serving the application with live reload

Once running, open your browser and navigate to the URL shown in the terminal (typically `http://localhost:3000`).

## Project Structure

```
green-valley-clinic/
├── clinic/                 # Staff portal application
│   ├── index.html         # Staff app HTML template
│   ├── index.js           # Staff app entry point
│   └── views/             # Staff pages and components
│       ├── Dashboard.js
│       ├── PatientDetails.js
│       ├── ClinicalNotes.js
│       ├── LabAndImaging.js
│       ├── Inventory.js
│       ├── ProcurementOrders.js
│       ├── Finance.js
│       └── Administration.js
├── public/                # Patient portal application
│   ├── index.html         # Patient app HTML template
│   ├── index.js           # Patient app entry point
│   └── views/             # Patient pages and components
│       ├── Landing.js
│       ├── PatientLogin.js
│       ├── PatientSignup.js
│       ├── PatientDashboard.js
│       └── ...other views
├── packages/              # Core framework packages
│   ├── core/              # Core component framework
│   ├── components/        # Reusable UI components
│   ├── styles/            # SCSS stylesheets
│   ├── hooks/             # State management
│   ├── utils/             # Utility functions
│   └── router/            # Routing system
├── dist/                  # Compiled CSS output
│   └── main.css           # Generated stylesheet
├── package.json           # Root project configuration
└── README.md              # Main project documentation
```

## Running the Application

### Development Server

```bash
npm run dev
```

This runs two tasks in parallel:
- `npm run sass:watch` — Compiles SCSS to CSS on file changes
- `npm run serve` — Starts browser-sync server with live reload

### Manual Commands

If you need to run tasks separately:

```bash
# Compile SCSS once
npm run sass

# Watch SCSS files and compile on changes
npm run sass:watch

# Start development server (requires compiled CSS)
npm run serve
```

## Application Structure

### Staff Portal (`/clinic`)

The staff application is organized with:
- **AuthLayout** — Authentication screen wrapper
- **AppLayout** — Main application shell with sidebar and top bar
- **Views** — Individual feature pages

**Available Views:**
- `Dashboard` — Main staff dashboard with patient list and quick actions
- `PatientDetails` — Detailed patient information with medical history
- `ClinicalNotes` — Clinical documentation and note management
- `LabAndImaging` — Lab orders and imaging results
- `Inventory` — Medical supplies and inventory management
- `ProcurementOrders` — Purchase order management
- `Finance` — Financial tracking and billing
- `Administration` — System administration and settings

**Navigation:**
The sidebar allows staff to navigate between views. Views are loaded dynamically on navigation events.

### Patient Portal (`/public`)

The patient application uses a mobile-first approach with:
- **MobileLayout** — Main application shell with bottom navigation
- **Views** — Individual patient-facing pages

**Available Views:**
- `Landing` — Welcome page directing to login/signup (staff pages hidden)
- `PatientLogin` — Patient login interface
- `PatientSignup` — Patient registration interface
- `PatientDashboard` — Patient home dashboard with appointments and health info
- `BookAppointment` — Appointment scheduling
- `MyAppointments` — View and manage appointments
- `Pharmacy` — Pharmacy information and prescriptions
- `ContactUs` — Contact information
- `About` — About the clinic

**Navigation:**
The bottom navigation bar allows patients to switch between views. Views load dynamically on navigation.

## Styling & CSS

### SCSS Compilation

All styles are written in SCSS and compiled to `dist/main.css`:

1. **Source**: `packages/styles/main.scss`
2. **Imports**: Organized in `packages/styles/src/`
3. **Output**: `dist/main.css`

### Color Palette

Green Valley uses a cohesive color scheme defined in `packages/styles/src/base/_variables.scss`:

```scss
$gv-mint:         #82D1C6  // Primary mint green
$gv-soft-mint:    #C1EBE5  // Light mint background
$gv-peach:        #F4B6A0  // Warm peach accent
$gv-soft-peach:   #FCE4D8  // Light peach background
$gv-lavender:     #D8CCFF  // Soft lavender
$gv-soft-lavender: #E8E0FF // Light lavender background
$gv-butter:       #FFF9D9  // Soft butter yellow
$gv-soft-butter:  #FFFCE8  // Light butter background
$gv-white:        #FFFFFF  // Pure white
$gv-text:         #25363B  // Dark text
$gv-gray-dim:     #6B7C82  // Secondary text
```

### Stylesheet Organization

- `_variables.scss` — Color and design tokens
- `_buttons.scss` — Button styles
- `_forms.scss` — Form elements
- `_modals.scss` — Modal dialogs
- `_dashboards.scss` — Dashboard layouts
- `_clinical-views.scss` — Clinical interface styles
- `_admin-views.scss` — Administrative interface styles
- `_mobile-views.scss` — Patient portal styles
- `_sidebars.scss` — Navigation sidebars
- `_app-layout.scss` — Main application layout

### Adding Custom Styles

When creating new views:

1. Add component-specific styles to the appropriate file (e.g., `_clinical-views.scss`)
2. Use CSS classes that match view class names (e.g., `.patient-details-view`)
3. Import stylesheets in `packages/styles/src/components/index.scss` if creating new files
4. Run `npm run sass` to compile

## Component System

### Creating a New Component

1. **Create JavaScript file** in `packages/components/src/`
   ```javascript
   import { Component } from '../../core/src/index.js';

   export class MyComponent extends Component {
     render() {
       return `<div class="my-component">...</div>`;
     }

     onMount() {
       // Setup event listeners here
     }
   }

   export default MyComponent;
   ```

2. **Create matching styles** in appropriate SCSS file
3. **Import and use** in view files:
   ```javascript
   import MyComponent from '../../packages/components/src/MyComponent.js';
   ```

### Component Lifecycle

- **Constructor**: Initialize component state
- **render()**: Return HTML string
- **mount(container)**: Mount component to DOM (inherited from Component class)
- **onMount()**: Called after mounting to DOM, setup listeners here

## Debugging

### Common Issues & Solutions

#### Issue: CSS not loading
**Solution**: Ensure `npm run sass` has been run to compile SCSS
```bash
npm run sass
npm run dev
```

#### Issue: Live reload not working
**Solution**: Check that browser-sync is running and you're at the correct localhost URL
- Check terminal output for the correct URL
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

#### Issue: Module not found errors
**Solution**: Ensure all imports use correct relative paths and include `.js` extension
```javascript
// ✓ Correct
import Dashboard from './views/Dashboard.js';

// ✗ Incorrect
import Dashboard from './views/Dashboard';
```

#### Issue: View not displaying
**Solution**: Check that:
1. View class extends Component
2. View has `render()` method
3. View is imported in the routing file (clinic/index.js or public/index.js)
4. Navigation event is being triggered

### Browser Console Debugging

Open browser DevTools (F12) to check for:
- **JavaScript errors** — Check Console tab
- **CSS errors** — Check Console tab for any parsing issues
- **Network errors** — Check Network tab to ensure files are loading
- **Component rendering** — Add temporary console.log() statements

### Adding Debug Statements

Add debugging in view files:
```javascript
onMount() {
  console.log("[v0] View mounted:", this.element);
  // View setup code
}
```

Remove debug statements before commit:
```bash
grep -r "console.log.*\[v0\]" clinic/ public/ packages/
```

## Testing Locally

### Test Staff Portal
1. Navigate to `http://localhost:3000/clinic/`
2. You should see the login screen
3. Check browser console for any errors

### Test Patient Portal
1. Navigate to `http://localhost:3000/public/`
2. You should see the landing page
3. Click login/signup to navigate
4. Check browser console for any errors

### Test Responsive Design
1. Open browser DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on various device sizes (mobile, tablet, desktop)
4. Verify layouts adjust properly

## Performance Tips

### CSS Optimization
- Use CSS classes instead of inline styles
- Group related styles together
- Use CSS variables for reusable values

### JavaScript Optimization
- Lazy load components when possible
- Remove event listeners when components unmount
- Use event delegation for dynamic elements

### Browser Sync
- Browser sync automatically reloads on file changes
- Use DevTools to throttle network/CPU for performance testing

## Git Workflow

### Before Committing

1. **Run Sass build**: `npm run sass`
2. **Check CSS output**: `dist/main.css` should be updated
3. **Commit both** JavaScript and CSS changes
4. **Test in browser** before pushing

### Typical Workflow

```bash
# Make code changes
npm run dev  # Keep running during development

# When satisfied
npm run sass  # Build CSS

# Stage and commit
git add .
git commit -m "Add new feature"
git push
```

## Troubleshooting Build Failures

### Sass Compilation Errors

Check the error message for the problematic file:
```bash
npm run sass 2>&1 | grep -A 5 "Error"
```

Common issues:
- Missing `@use` or `@forward` statements
- Invalid SCSS syntax
- Missing closing braces
- Undefined variables

### Module Resolution Issues

Verify import paths:
```bash
ls packages/components/src/MyComponent.js
```

Check that path matches import statement exactly.

## Next Steps

After successfully running the application:

1. **Explore the dashboard** to understand the UI structure
2. **Create a new view** in the appropriate application folder
3. **Add corresponding styles** to the SCSS files
4. **Test navigation** to ensure routing works

For more information, see README.md for project overview and architecture details.

## Support

When encountering issues:

1. Check this SETUP.md for common solutions
2. Review browser console for error messages
3. Verify all files are in correct locations
4. Ensure npm dependencies are installed (`npm install`)
5. Try clearing cache: `rm -rf node_modules && npm install`

## Commands Reference

```bash
# Development
npm run dev               # Start development server with live reload
npm run sass             # Compile SCSS once
npm run sass:watch       # Watch and compile SCSS continuously
npm run serve            # Start browser-sync server

# Maintenance
npm install              # Install dependencies
npm update               # Update dependencies
npm run sass -- --watch  # Watch specific SCSS changes
```
