# GVC Backend — Mock Database & APIs

Green Valley Clinic's integrated mock backend system for the ICMS (Integrated Clinic Management System).

## Overview

This backend provides:
- **In-memory database** with localStorage persistence (`db.js`)
- **ACID transactions** with automatic rollback on errors
- **REST-like API modules** for all clinic operations
- **Global search functionality** across patients, staff, and appointments
- **Dashboard analytics** and reporting

**No HTTP server needed** — the database and APIs are directly imported into the frontend. When you're ready to switch to a real backend, only the import paths need to change.

## Quick Start

### 1. Import Backend into Your Frontend

```js
// In public/index.js or clinic/index.js
import db from '../gvc-backend/db.js';
import * as AuthAPI from '../gvc-backend/api/auth.js';
import * as AppointAPI from '../gvc-backend/api/appointments.js';
import * as PatientAPI from '../gvc-backend/api/patients.js';
import * as StaffAPI from '../gvc-backend/api/staff.js';
import * as DashboardAPI from '../gvc-backend/api/dashboard.js';
import * as PublicAPI from '../gvc-backend/api/public.js';

// Global search functions automatically added to window
console.log('[v0] Database ready:', Object.keys(db._tables));
```

### 2. Call API Functions

Every API function returns a Promise resolving to `{ ok, data, error }`:

```js
// Login staff member
const result = await AuthAPI.login('dr.smith', 'password123');
if (result.ok) {
    console.log('Logged in:', result.data.user);
    sessionToken = result.data.token;
} else {
    console.error('Login failed:', result.error.message);
}

// Search patients
const patients = await window.searchPatients('John');
console.log('Found patients:', patients);

// Book appointment
const apptResult = await AppointAPI.createAppointment({
    patient_id: 'pt-001',
    doctor_id: 'st-001',
    appointment_date: '2024-06-15',
    slot: '09:00',
    reason: 'Checkup'
});

if (apptResult.ok) {
    console.log('Appointment booked:', apptResult.data);
}
```

## File Structure

```
gvc-backend/
├── README.md                 ← you are here
├── db.js                     ← in-memory database engine
├── api/
│   ├── auth.js              ← staff login, sessions, password reset
│   ├── appointments.js      ← booking, rescheduling, cancellation
│   ├── patients.js          ← patient management & medical records
│   ├── staff.js             ← staff management & scheduling
│   ├── dashboard.js         ← analytics & reporting
│   └── public.js            ← public-facing APIs (no auth required)
├── utils/
│   └── search.js            ← cross-table search & filtering
└── seed/
    └── data.json            ← sample data (initialized in db.js)
```

## Database Tables

### patients
```json
{
  "id": "pt-001",
  "mrn": "GVC-2024-001",
  "first_name": "John",
  "last_name": "Doe",
  "dob": "1990-05-15",
  "gender": "male",
  "blood_type": "O+",
  "allergies": ["Penicillin"],
  "email": "john@example.com",
  "phone": "+1-555-0100",
  "address": "123 Main St",
  "created_at": "2024-01-15T10:00:00Z"
}
```

### staff
```json
{
  "id": "st-001",
  "username": "dr.smith",
  "password_hash": "$2b$10$...",
  "first_name": "Dr.",
  "last_name": "Smith",
  "role": "doctor",
  "department": "General Medicine",
  "specialisation": "Internal Medicine",
  "email": "smith@clinic.com",
  "phone": "+1-555-0101",
  "is_active": true
}
```

### appointments
```json
{
  "id": "ap-001",
  "patient_id": "pt-001",
  "doctor_id": "st-001",
  "appointment_date": "2024-06-15",
  "slot": "09:00",
  "duration_mins": 30,
  "reason": "Annual checkup",
  "status": "scheduled",
  "confirmation_ref": "GVC-ABC123",
  "created_at": "2024-06-01T14:30:00Z"
}
```

### medical_records
```json
{
  "id": "mr-001",
  "patient_id": "pt-001",
  "doctor_id": "st-001",
  "record_type": "consultation",
  "date": "2024-06-15",
  "diagnosis": "Hypertension",
  "prescriptions": [
    {
      "drug": "Lisinopril",
      "dose": "10mg",
      "frequency": "once daily",
      "duration": "30 days"
    }
  ]
}
```

### Other Tables
- `staff_schedules` — doctor availability
- `slots` — pre-generated appointment slots
- `enquiries` — patient contact form submissions
- `announcements` — clinic news & updates
- `health_articles` — educational content

## API Reference

### Auth (`api/auth.js`)

```js
// Login with username and password
await AuthAPI.login('dr.smith', 'password123')
// → { ok: true, data: { user, token } }

// Create new staff member
await AuthAPI.registerStaff({ username, password, first_name, last_name, role })
// → { ok: true, data: { user, token } }

// Logout and invalidate session
await AuthAPI.logout(sessionToken)
// → { ok: true }

// Refresh expired session
await AuthAPI.refreshSession(sessionToken)
// → { ok: true, data: { token } }

// Request password reset
await AuthAPI.requestPasswordReset('smith@clinic.com')
// → { ok: true, data: { reset_token } }
```

### Appointments (`api/appointments.js`)

```js
// List appointments with filters
await AppointAPI.listAppointments({ 
    patient_id: 'pt-001',
    status: 'scheduled',
    date_from: '2024-06-01'
})
// → { ok: true, data: [...appointments] }

// Create new appointment (ACID transaction)
await AppointAPI.createAppointment({
    patient_id: 'pt-001',
    doctor_id: 'st-001',
    appointment_date: '2024-06-15',
    slot: '09:00',
    reason: 'Checkup'
})
// → { ok: true, data: { appointment, confirmation_ref } }

// Reschedule appointment
await AppointAPI.rescheduleAppointment('ap-001', {
    appointment_date: '2024-06-20',
    slot: '14:00'
})
// → { ok: true, data: { appointment } }

// Cancel appointment
await AppointAPI.cancelAppointment('ap-001', 'Patient requested')
// → { ok: true, data: { appointment } }

// Check available slots
await AppointAPI.getAvailableSlots('st-001', '2024-06-15')
// → { ok: true, data: [...slots] }
```

### Patients (`api/patients.js`)

```js
// Get patient by ID
await PatientAPI.getPatient('pt-001')
// → { ok: true, data: { patient } }

// Search patients
await PatientAPI.searchPatients('John')
// → { ok: true, data: [...patients] }

// Create new patient (ACID transaction)
await PatientAPI.createPatient({
    first_name, last_name, dob, gender, phone, email, address
})
// → { ok: true, data: { patient, mrn } }

// Update patient
await PatientAPI.updatePatient('pt-001', { phone: '+1-555-9999' })
// → { ok: true, data: { patient } }

// Get medical records
await PatientAPI.getMedicalRecords('pt-001')
// → { ok: true, data: [...records] }

// Add medical record
await PatientAPI.addMedicalRecord('pt-001', {
    doctor_id, record_type, diagnosis, prescriptions
})
// → { ok: true, data: { record } }
```

### Staff (`api/staff.js`)

```js
// List staff with filters
await StaffAPI.listStaff({ role: 'doctor', department: 'Cardiology' })
// → { ok: true, data: [...staff] }

// Get doctor schedule
await StaffAPI.getSchedule('st-001')
// → { ok: true, data: { schedule } }

// Set doctor availability
await StaffAPI.setSchedule('st-001', {
    day_of_week: 1,  // Monday
    start_time: '08:00',
    end_time: '17:00'
})
// → { ok: true, data: { schedule } }
```

### Dashboard (`api/dashboard.js`)

```js
// Get dashboard statistics
await DashboardAPI.getDashboardStats()
// → { ok: true, data: { appointments, patients, staff, metrics } }

// Generate custom report
await DashboardAPI.generateReport({
    type: 'appointments',
    date_from: '2024-06-01',
    date_to: '2024-06-30',
    department: 'Cardiology'
})
// → { ok: true, data: { rows: [...] } }
```

### Public APIs (`api/public.js`)

```js
// Get clinic information
await PublicAPI.getClinicInfo()
// → { ok: true, data: { name, address, phone, hours } }

// Get doctor profiles (public)
await PublicAPI.getDoctorProfiles()
// → { ok: true, data: [...doctors] }

// Submit contact form
await PublicAPI.submitEnquiry({ name, email, message })
// → { ok: true, data: { enquiry_id } }

// Get health articles
await PublicAPI.getHealthArticles()
// → { ok: true, data: [...articles] }
```

## Search & Filtering

### Global Search
```js
// Search across all tables
const results = await window.searchPatients('John');
// Returns: [{ first_name, last_name, mrn, ... }]

// Search staff
const staff = await window.searchStaff('Dr. Smith');

// Search appointments
const appts = await window.searchAppointments('checkup');
```

### Advanced Search (Utility Module)
```js
import * as searchUtils from './utils/search.js';

// Multi-table search
const results = await searchUtils.globalSearch('John', 
    ['patients', 'staff'], 
    ['first_name', 'last_name']
);
// Returns: [{ table, record, relevanceScore, matchedFields }]

// Quick search for autocomplete
const quick = await searchUtils.quickSearch('J', 'patients', 5);
// Returns: top 5 matching patients

// Filter appointments by date and status
const filtered = await searchUtils.filterAppointments({
    dateFrom: '2024-06-01',
    dateTo: '2024-06-30',
    status: 'completed',
    department: 'Cardiology'
});
```

## ACID Transactions

All write operations are wrapped in transactions that guarantee ACID properties:

```js
// Example: Book appointment atomically
// If any step fails, entire transaction rolls back
const result = await AppointAPI.createAppointment({
    patient_id: 'pt-001',
    doctor_id: 'st-001',
    appointment_date: '2024-06-15',
    slot: '09:00'
});

// Under the hood:
// 1. Check patient exists (consistency)
// 2. Check slot available (conflict detection)
// 3. Insert appointment record (atomicity)
// 4. Mark slot as taken (atomicity)
// 5. Commit all changes or rollback if error (durability via localStorage)
```

## Error Handling

All API functions return structured errors:

```js
const result = await AuthAPI.login('invalid', 'password');

if (!result.ok) {
    console.error(result.error.code);      // 'AUTH_INVALID_CREDENTIALS'
    console.error(result.error.message);   // 'Invalid credentials'
}

// Common error codes:
// AUTH_INVALID_CREDENTIALS — wrong username/password
// AUTH_SESSION_EXPIRED — token expired
// CONFLICT_DOUBLE_BOOKING — slot already taken
// NOT_FOUND — record doesn't exist
// VALIDATION_ERROR — field validation failed
// CONSISTENCY_ERROR — business rule violation
```

## Data Persistence

The database automatically persists to localStorage:

```js
// After any successful transaction
localStorage.getItem('gvc_db');
// Contains: { version: 1, tables: {...all data...}, timestamp: ... }

// On page reload
// Database automatically restores from localStorage
// Or re-seeds if schema version changed
```

## Sample Data

The database initializes with realistic sample data:

- **2 patients** with full medical histories
- **3 staff members** (doctors, receptionist)
- **5+ appointments** spanning different statuses
- **Medical records**, prescriptions, and lab results
- **Health articles** and announcements
- **Schedules** and available time slots

## Switching to a Real Backend

To integrate a real HTTP backend:

1. **Update import paths** in your frontend:
```js
// Before (mock)
import * as AuthAPI from '../gvc-backend/api/auth.js';

// After (real API)
// Create a new folder: /api/services/
// Each module makes HTTP calls:
export async function login(username, password) {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });
    return res.json();
}
```

2. **No other code changes needed** — the interface (`{ ok, data, error }`) stays the same

## Troubleshooting

### Database not persisting
Check browser console for localStorage errors. Ensure localStorage is enabled.

### Search returning no results
- Query must be 2+ characters (except for health articles, 1+ char)
- Search is case-insensitive but partial matches are supported

### Transaction rollback
Check console logs for `[v0]` messages indicating validation errors or conflicts.

### API returning error
Always check `result.ok` and `result.error.code` before accessing `result.data`.

## Future Enhancements

- Real-time notifications via WebSockets
- Full-text search with Elasticsearch
- Background job queue for reports
- Multi-tenant support
- Advanced analytics and BI integration

---

For more details, see the [SKILL file](./SKILL.md) and individual API module documentation.
