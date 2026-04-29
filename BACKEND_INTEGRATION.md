# Backend Integration Guide

This document explains how the GVC Backend (mock database + APIs) is integrated into the public and clinic portals, with search functionality.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Frontend Applications                                      │
│  ┌──────────────────┐              ┌──────────────────┐   │
│  │  Public Portal   │              │  Clinic Portal   │   │
│  │  (public/*)      │              │  (clinic/*)      │   │
│  └────────┬─────────┘              └────────┬─────────┘   │
│           │                                  │             │
│           └──────────────────┬───────────────┘             │
│                              │                             │
│                   ┌──────────▼──────────┐                  │
│                   │   GVC Backend       │                  │
│                   │  (gvc-backend/*)    │                  │
│                   │                     │                  │
│                   │  ┌─────────────┐    │                  │
│                   │  │ db.js       │    │                  │
│                   │  │ (Database)  │    │                  │
│                   │  └─────────────┘    │                  │
│                   │                     │                  │
│                   │  ┌─────────────┐    │                  │
│                   │  │ api/        │    │                  │
│                   │  │ - auth.js   │    │                  │
│                   │  │ - appt.js   │    │                  │
│                   │  │ - patient.js│    │                  │
│                   │  │ - staff.js  │    │                  │
│                   │  │ - public.js │    │                  │
│                   │  └─────────────┘    │                  │
│                   │                     │                  │
│                   │  ┌─────────────┐    │                  │
│                   │  │ utils/      │    │                  │
│                   │  │ - search.js │    │                  │
│                   │  └─────────────┘    │                  │
│                   │                     │                  │
│                   └────────┬────────────┘                  │
│                            │                              │
│                   ┌────────▼──────────┐                   │
│                   │  localStorage      │                  │
│                   │  (Data Persistence)│                  │
│                   └────────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## How It's Wired

### 1. Public Portal (`public/index.js`)

```javascript
// Imports the backend modules
import * as AuthAPI from '../gvc-backend/api/auth.js';
import * as AppointAPI from '../gvc-backend/api/appointments.js';
import * as PatientAPI from '../gvc-backend/api/patients.js';
import * as PublicAPI from '../gvc-backend/api/public.js';
import db from '../gvc-backend/db.js';

// Global search functions automatically available
window.searchPatients   // Search patients by name, email, MRN
window.searchAppointments  // Search appointments by reason/ref
window.searchHealthArticles // Search articles and announcements
```

**Available Features:**
- Patient registration & login
- Appointment booking & rescheduling
- View appointments & medical records
- Browse health articles
- Submit contact enquiries

### 2. Clinic Portal (`clinic/index.js`)

```javascript
// Imports the backend modules
import * as AuthAPI from '../gvc-backend/api/auth.js';
import * as AppointAPI from '../gvc-backend/api/appointments.js';
import * as PatientAPI from '../gvc-backend/api/patients.js';
import * as StaffAPI from '../gvc-backend/api/staff.js';
import * as DashboardAPI from '../gvc-backend/api/dashboard.js';
import db from '../gvc-backend/db.js';

// Global search functions automatically available
window.searchPatients  // Search patients in system
window.searchStaff     // Search staff members
window.searchAppointments // Search all appointments
```

**Available Features:**
- Staff login & authentication
- Patient management & medical records
- Appointment management (create, reschedule, cancel)
- Staff management & scheduling
- Dashboard analytics & reporting

## Search Functionality

### 1. Quick Search (Global Functions)

Available in both portals via `window`:

```javascript
// Patient search
const patients = await window.searchPatients('John Doe');
// Returns matching patients by name, MRN, email, or phone

// Staff search (clinic only)
const staff = await window.searchStaff('Dr. Smith');
// Returns matching staff by name, username, email, or department

// Appointment search
const appointments = await window.searchAppointments('checkup');
// Returns matching appointments by reason, confirmation ref, or notes

// Article search
const articles = await window.searchHealthArticles('diabetes');
// Returns matching health articles
```

### 2. Advanced Search (Utility Module)

For complex searches with ranking and filtering:

```javascript
import * as searchUtils from './gvc-backend/utils/search.js';

// Multi-table search with relevance scoring
const results = await searchUtils.globalSearch(
    'John',
    ['patients', 'staff'],
    ['first_name', 'last_name', 'email']
);
// Returns: [
//   { table: 'patients', record: {...}, relevanceScore: 100, matchedFields: [...] },
//   { table: 'staff', record: {...}, relevanceScore: 50, matchedFields: [...] }
// ]

// Quick search for autocomplete dropdowns
const quick = await searchUtils.quickSearch('J', 'patients', 5);
// Returns: top 5 matching patients

// Filter appointments by multiple criteria
const filtered = await searchUtils.filterAppointments({
    dateFrom: '2024-06-01',
    dateTo: '2024-06-30',
    status: 'completed',
    department: 'Cardiology'
});
```

### 3. Search Features

- **Case-insensitive** — "john" matches "JOHN", "John", etc.
- **Partial matching** — "joh" matches "John"
- **Relevance scoring** — exact matches ranked higher than partial
- **Multi-field search** — searches across multiple fields
- **Real-time indexing** — no delay, searches against in-memory data
- **Conflict-free** — doesn't interfere with concurrent operations

## Data Flow Examples

### Example 1: Patient Booking an Appointment

```
User fills booking form in public portal
  ↓
JavaScript calls: AppointAPI.createAppointment({ patient_id, doctor_id, date, slot })
  ↓
db.js processes transaction:
  1. Check patient exists
  2. Check doctor exists
  3. Check slot available (no double-booking)
  4. Insert appointment record
  5. Mark slot as taken
  ↓
All changes committed to in-memory db AND localStorage
  ↓
Return: { ok: true, data: { appointment, confirmation_ref } }
  ↓
UI updates with confirmation details
```

### Example 2: Clinic Staff Searching for Patient

```
Staff types "John Doe" in search box
  ↓
JavaScript calls: window.searchPatients('John Doe')
  ↓
db.js searches patients table:
  - Find rows where first_name, last_name, mrn, email, phone match 'john'
  - Rank by relevance (exact match > starts with > contains)
  - Return top results
  ↓
Return: { ok: true, data: [patient1, patient2, ...] }
  ↓
UI displays search results in real-time
```

### Example 3: Staff Login with Session

```
Staff enters username/password on clinic portal
  ↓
JavaScript calls: AuthAPI.login('dr.smith', 'password123')
  ↓
db.js validates:
  1. Find staff record by username
  2. Verify password hash (bcrypt)
  3. Create session token with expiry
  ↓
Return: { ok: true, data: { user: {name, role, department}, token: 'jwt...' } }
  ↓
Token stored in session/memory
  ↓
All future API calls include token for authorization
```

## API Error Handling

Every API call returns a consistent response:

```javascript
// Success
const result = await AuthAPI.login(...);
if (result.ok) {
    console.log(result.data); // contains actual data
}

// Failure
if (!result.ok) {
    console.error(result.error.code);    // 'AUTH_INVALID_CREDENTIALS'
    console.error(result.error.message); // 'Invalid credentials'
}
```

## Database Tables & Initialization

On first load, the database seeds with:

- **2 Patients** with full medical histories and appointments
- **3 Staff members** (doctors, receptionist) with schedules
- **5+ Appointments** with various statuses (scheduled, completed, cancelled)
- **Medical records**, prescriptions, and test results
- **Health articles** and clinic announcements
- **Schedules** with available appointment slots

Each table is accessible via:
```javascript
db._tables.patients
db._tables.staff
db._tables.appointments
db._tables.medical_records
db._tables.schedules
db._tables.enquiries
db._tables.announcements
db._tables.health_articles
```

## localStorage Persistence

After each successful transaction, the entire database is automatically saved:

```javascript
// What's stored
{
  "version": 1,
  "timestamp": "2024-06-15T10:30:00Z",
  "tables": {
    "patients": [...],
    "staff": [...],
    "appointments": [...],
    // ... all other tables
  }
}
```

On page reload, the database automatically restores from localStorage. To reset:

```javascript
localStorage.removeItem('gvc_db');
// Page reload will re-seed with initial sample data
```

## API Modules Reference

| Module | Purpose | Key Functions |
|--------|---------|---|
| `db.js` | In-memory database engine | `find()`, `insert()`, `update()`, `delete()`, `transaction()` |
| `api/auth.js` | Staff authentication | `login()`, `logout()`, `refreshSession()`, `requestPasswordReset()` |
| `api/appointments.js` | Appointment management | `createAppointment()`, `cancelAppointment()`, `rescheduleAppointment()`, `getAvailableSlots()` |
| `api/patients.js` | Patient management | `createPatient()`, `getPatient()`, `searchPatients()`, `getMedicalRecords()` |
| `api/staff.js` | Staff management | `createStaff()`, `listStaff()`, `setSchedule()`, `getSchedule()` |
| `api/dashboard.js` | Analytics & reports | `getDashboardStats()`, `generateReport()` |
| `api/public.js` | Public-facing APIs | `getClinicInfo()`, `getDoctorProfiles()`, `submitEnquiry()`, `getHealthArticles()` |
| `utils/search.js` | Search & filtering | `globalSearch()`, `searchPatients()`, `filterAppointments()`, `quickSearch()` |

## Integration Checklist

- ✅ Public portal imports backend modules (`public/index.js`)
- ✅ Clinic portal imports backend modules (`clinic/index.js`)
- ✅ Global search functions available in both portals
- ✅ Database initialization on page load
- ✅ localStorage persistence configured
- ✅ Error handling implemented
- ✅ ACID transactions for critical operations
- ✅ Sample data auto-seeding
- ✅ API consistency across all modules

## Troubleshooting

### Search returning no results
- Ensure search query is at least 2 characters (1 for articles)
- Check console for `[v0] Searching...` debug logs
- Verify sample data was loaded: `console.log(db._tables.patients)`

### API call returns error
- Check `result.ok` and `result.error.code`
- Look for validation errors in `result.error.message`
- Check console for `[v0]` debug logs

### Data not persisting after page reload
- Check browser localStorage: `localStorage.getItem('gvc_db')`
- Ensure localStorage is enabled in browser
- Check browser console for quota exceeded errors

### Performance issues with large datasets
- The mock database is in-memory and best for prototyping
- For production data volumes, migrate to a real database
- Use pagination in reports and listings

## Next Steps

1. **Integrate with Views** — update view components to use API functions
2. **Add Form Handling** — wire form submissions to API calls
3. **Implement Navigation** — handle routing based on API results
4. **Add Error Messages** — display user-friendly error handling
5. **Create Reports** — use dashboard API for analytics
6. **Migrate to Real Backend** — swap import paths when ready

See `gvc-backend/README.md` for detailed API documentation.
