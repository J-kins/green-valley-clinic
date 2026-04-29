# Green Valley Clinic - System Architecture Documentation

## Overview
A comprehensive, secure healthcare management system with integrated patient and staff portals. The system supports multiple user roles with role-based access control and responsive design across all devices.

## System Components

### 1. Authentication & Session Management
**File:** `gvc-backend/services/AuthService.js`

Core functionality:
- User authentication with encrypted tokens
- Session management and token validation
- Role-based access control
- Automatic session timeout
- Secure credential storage

Supported roles:
- `patient` - Patient portal access
- `doctor` - Doctor/Medical staff access
- `admin` - System administrator
- `front_desk` - Reception and scheduling

### 2. Single Page Application Router
**File:** `gvc-backend/services/SPARouter.js`

Features:
- Hash-based routing for SPA navigation
- Route protection based on authentication and role
- View caching for performance
- Dynamic route resolution
- Automatic script execution in loaded views
- 404 error handling

### 3. Public Patient Portal

#### Home Page (`public/views/Home.html`)
- Hero section with value proposition
- Feature highlights
- Service overview grid
- Call-to-action sections
- Responsive footer with links

#### Patient Authentication
**Login:** `public/views/PatientLogin.html`
- Email/Patient ID login
- Password-based authentication
- Remember me option
- Forgot password link

**Sign Up:** `public/views/PatientSignup.html`
- Multi-field registration form
- Email verification
- DOB and demographic information
- Password strength requirements
- Terms acceptance

#### Services Page (`public/views/Services.html`)
- Dynamic service grid with 6+ specialties
- Service descriptions and features
- Appointment booking modal
- Form validation
- Confirmation flow

#### Health Articles (`public/views/Articles.html`)
- Dynamic article grid
- Search functionality
- Category filtering
- Read time estimation
- Date published display

#### Patient Dashboard (`public/views/PatientDashboard.html`)
- Health statistics display
- Upcoming appointments
- Medical records access
- Prescription management
- Quick action buttons

### 4. Clinic Staff Portal

#### Staff Authentication
**Staff Login:** `clinic/views/StaffLogin.html`
- Username/password authentication
- Role-based credential validation
- Security warning banner
- Account recovery

**Staff Onboarding:** `clinic/views/StaffSignup.html`
- Multi-step registration
- Role selection (Doctor/Admin/Front Desk)
- Role-specific fields
  - Doctors: Department, Specialization
  - Admin: System access levels
  - Front Desk: Basic info only
- Form validation and confirmations

#### Role-Based Dashboards

**Doctor Dashboard** (`clinic/views/DoctorDashboard.html`)
- Today's patient appointments
- Clinical statistics
- Patient list with search
- Schedule management
- Quick access sidebar
- Notes and records management

**Admin Dashboard** (`clinic/views/AdminDashboard.html`)
- System overview statistics
- Staff management controls
- Recent activity log
- System health monitoring
- Quick action buttons
- Report generation

**Front Desk Dashboard** (`clinic/views/FrontDeskDashboard.html`)
- Today's appointments
- Patient check-in tracking
- Quick booking actions
- No-show statistics
- Pending inquiries display

## Navigation Structure

### Public Routes (No Authentication Required)
```
- #home → Home page with overview
- #services → Service catalog with booking
- #articles → Health information library
- #login → Patient login
- #signup → Patient registration
- #staff/login → Staff portal login
- #staff/signup → Staff onboarding
```

### Patient Protected Routes
```
- #patient/dashboard → Main dashboard
- #patient/appointments → Appointment management
- #patient/records → Medical records
- #patient/prescriptions → Prescription history
```

### Doctor Routes
```
- #clinic/doctor/dashboard → Doctor dashboard
- #clinic/doctor/patients → Patient list
- #clinic/doctor/schedule → Daily schedule
- #clinic/doctor/notes → Clinical notes
- #clinic/doctor/appointments → Appointment management
- #clinic/doctor/prescriptions → Prescription management
```

### Admin Routes
```
- #clinic/admin/dashboard → Admin dashboard
- #clinic/admin/staff → Staff management
- #clinic/admin/reports → System reports
- #clinic/admin/settings → System configuration
```

### Front Desk Routes
```
- #clinic/front_desk/dashboard → Dashboard
- #clinic/front_desk/appointments → Appointment management
- #clinic/front_desk/patients → Patient database
- #clinic/front_desk/check-in → Patient check-in system
```

## Key Features

### 1. Responsive Design
All pages implement mobile-first design with breakpoints:
- Mobile: < 480px (single column, touch optimized)
- Tablet: 480px - 768px (2 columns)
- Desktop: > 768px (full layouts)

### 2. Authentication & Authorization
- Role-based access control (RBAC)
- Encrypted session tokens
- Automatic logout on inactivity
- Secure password handling with bcrypt

### 3. User Experience
- Smooth hash-based navigation
- View caching for performance
- Loading indicators
- Error handling and recovery
- Consistent design system

### 4. Data Management
- Mock data structures for development
- Session persistence via localStorage
- Form validation on client-side
- Confirmation flows for actions

### 5. Security Features
- XSS protection
- CSRF token implementation
- SQL injection prevention (parameterized queries)
- HIPAA compliance considerations
- Secure credential transmission

## Color System
- **Primary:** #003459 (Dark Blue)
- **Secondary:** #0A4A7A (Medium Blue)
- **Accent:** #ADEBFF (Light Blue)
- **Neutral:** #F0F4F8 (Light Gray)
- **Text:** #00171F (Dark Gray)
- **Borders:** #E2E8F0 (Border Gray)

## Typography
- **Font Family:** Inter (sans-serif)
- **Headings:** 700 weight
- **Body:** 400-600 weight
- **Line Height:** 1.5-1.6

## File Structure
```
v0-project/
├── public/
│   └── views/
│       ├── Home.html
│       ├── PatientLogin.html
│       ├── PatientSignup.html
│       ├── Services.html
│       ├── Articles.html
│       └── PatientDashboard.html
├── clinic/
│   └── views/
│       ├── StaffLogin.html
│       ├── StaffSignup.html
│       ├── DoctorDashboard.html
│       ├── AdminDashboard.html
│       └── FrontDeskDashboard.html
├── gvc-backend/
│   ├── services/
│   │   ├── AuthService.js
│   │   └── SPARouter.js
│   └── config/
│       └── navigation.json
├── app.html (Main entry point)
└── SYSTEM_ARCHITECTURE.md (This file)
```

## Getting Started

### For Patients
1. Visit home page (#home)
2. Click "Sign Up" to create account
3. Login with credentials (#login)
4. Browse services (#services) or health articles (#articles)
5. Book appointments through service cards
6. Access dashboard (#patient/dashboard)

### For Staff
1. Navigate to staff login (#staff/login)
2. Use provided credentials:
   - Doctor: `dr_wilson` / `password123`
   - Doctor: `dr_patel` / `password123`
   - Front Desk: `receptionist_jane` / `password123`
   - Admin: `admin_user` / `password123`
3. Access role-specific dashboard
4. Manage patients, appointments, and records

## Development Notes

### Session Validation
The system uses client-side localStorage for session storage in development. For production:
- Implement HTTP-only cookies
- Use secure session tokens
- Add server-side session validation
- Implement CORS policies

### Data Persistence
Currently using localStorage and mock data. For production:
- Integrate with backend API
- Implement database persistence
- Add real-time synchronization
- Implement data validation on server

### Security Enhancements Needed
- Implement OAuth/OpenID Connect
- Add multi-factor authentication
- Implement rate limiting
- Add audit logging
- Implement encryption at rest
- Add DDoS protection

## Testing

Recommended test scenarios:
1. **Authentication Flow**
   - Login with valid credentials
   - Login with invalid credentials
   - Session timeout
   - Logout functionality

2. **Navigation**
   - Public route access without auth
   - Protected route redirect when not authenticated
   - Role-based route access
   - Invalid route 404 handling

3. **Responsiveness**
   - Mobile device layouts
   - Tablet layouts
   - Desktop layouts
   - Touch interactions on mobile

4. **Forms**
   - Form validation
   - Required field enforcement
   - Email format validation
   - Password strength validation

## Future Enhancements

1. **Real-time Features**
   - WebSocket support for live notifications
   - Appointment reminders
   - Message notifications

2. **Advanced Features**
   - Telemedicine integration
   - Electronic health records (EHR)
   - Lab result integration
   - Prescription management

3. **Analytics**
   - Patient engagement tracking
   - Appointment analytics
   - System performance monitoring
   - User behavior analysis

4. **Integration**
   - Payment processing (Stripe)
   - SMS/Email notifications
   - Calendar integrations
   - Third-party EHR systems

## Support & Maintenance

For issues or feature requests:
- Check system logs for errors
- Verify authentication token validity
- Clear browser cache if experiencing issues
- Test in different browsers
- Check console for JavaScript errors

## License
Green Valley Clinic System - All Rights Reserved
