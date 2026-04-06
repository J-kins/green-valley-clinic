# Green Valley Clinic

A comprehensive vanilla JavaScript framework with UI components for clinic management and booking systems.

## Project Structure

This is a monorepo project managed with npm workspaces, containing:

### Core Packages (`/packages`)

- **`@my-framework/core`** — Core framework utilities, components, and services
- **`@my-framework/components`** — Reusable UI components (buttons, modals, layouts, etc.)
- **`@my-framework/hooks`** — Custom React-like hooks for state management
- **`@my-framework/router`** — Lightweight routing system
- **`@my-framework/utils`** — Utility functions
- **`@my-framework/styles`** — SCSS stylesheets and theming
- **`@my-framework/theme`** — Theme configuration and assets
- **`@my-framework/cli`** — Command-line tools for development
- **`@my-framework/testing`** — Testing utilities and helpers
- **`@my-framework/docs`** — Documentation and storybook
- **`@my-framework/templates`** — HTML email and layout templates

### Applications

- **`/clinic`** — Staff clinic management application
- **`/public`** — Public-facing website (bookings, pharmacy, contact, etc.)

## Getting Started

### Prerequisites

- Node.js 16+
- npm 8+ (for workspaces support)

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

This command runs:
- `sass:watch` — Watches and compiles SCSS files to CSS
- `serve` — Starts a development server with live reload

### Build Commands

- `npm run sass` — One-time Sass compilation
- `npm run sass:watch` — Watch Sass files for changes
- `npm run serve` — Start development server

## Features

- **Vanilla JavaScript** — No dependencies on large frameworks
- **Component Library** — Reusable UI components
- **SCSS Styling** — Organized stylesheets with theming support
- **Monorepo Structure** — Multiple packages organized and managed together
- **CLI Tools** — Command-line utilities for scaffolding and development
- **Testing** — Integrated testing utilities
- **Documentation** — Built-in documentation and storybook

## Project Features

### Clinic Management
- Staff login and authentication
- Dashboard and staff management
- Password reset functionality

### Public Portal
- Appointment booking
- Appointment management
- Pharmacy information
- Contact and help desk
- About information

## File Structure

```
├── packages/          # Core packages and utilities
├── clinic/            # Staff application
├── public/            # Public-facing application
├── examples/          # Example implementations
└── dist/              # Compiled output
```

## Browser Support

Modern browsers with ES6 support. For older browser support, transpilation may be necessary.

## License

MIT
