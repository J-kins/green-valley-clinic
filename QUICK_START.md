# Quick Start: GVC Backend Integration

## What's Been Set Up

✅ **GVC Backend** — Complete mock database with ACID transactions  
✅ **Public Portal** (`public/index.js`) — Linked to backend  
✅ **Clinic Portal** (`clinic/index.js`) — Linked to backend  
✅ **Search System** — Global search functions available everywhere  
✅ **Data Persistence** — localStorage integration for durability  
✅ **API Modules** — Auth, Appointments, Patients, Staff, Dashboard, Public  

## File Structure

```
gvc-backend/
├── db.js                 ← In-memory database engine
├── api/
│   ├── auth.js          ← Staff login/session
│   ├── appointments.js  ← Booking/rescheduling
│   ├── patients.js      ← Patient management
│   ├── staff.js         ← Staff management
│   ├── dashboard.js     ← Analytics
│   └── public.js        ← Public APIs
├── utils/
│   └── search.js        ← Search functionality
└── README.md            ← Full documentation

public/index.js          ← Patient portal (backend linked)
clinic/index.js          ← Staff portal (backend linked)

BACKEND_INTEGRATION.md   ← How it's all connected
QUICK_START.md          ← You are here
```

## Using the Backend in Your Code

### 1. Anywhere in the App, Use Global Search

```javascript
// Patient search
const patients = await window.searchPatients('John');

// Staff search
const staff = await window.searchStaff('Dr. Smith');

// Appointment search
const appts = await window.searchAppointments('checkup');

// Health articles
const articles = await window.searchHealthArticles('diabetes');
```

### 2. Import APIs for Direct Calls

In `public/index.js` or `clinic/index.js`, the following are already imported:

```javascript
// Public Portal
import * as AuthAPI from '../gvc-backend/api/auth.js';
import * as AppointAPI from '../gvc-backend/api/appointments.js';
import * as PatientAPI from '../gvc-backend/api/patients.js';
import * as PublicAPI from '../gvc-backend/api/public.js';

// Clinic Portal (also includes)
import * as StaffAPI from '../gvc-backend/api/staff.js';
import * as DashboardAPI from '../gvc-backend/api/dashboard.js';
```

### 3. Call API Functions

```javascript
// Login staff
const loginResult = await AuthAPI.login('dr.smith', 'password123');
if (loginResult.ok) {
    const { user, token } = loginResult.data;
    console.log(`Welcome, ${user.first_name}`);
}

// Create appointment
const apptResult = await AppointAPI.createAppointment({
    patient_id: 'pt-001',
    doctor_id: 'st-001',
    appointment_date: '2024-06-15',
    slot: '09:00',
    reason: 'Annual checkup'
});

if (apptResult.ok) {
    console.log('Confirmed:', apptResult.data.confirmation_ref);
}

// Get patient
const patient = await PatientAPI.getPatient('pt-001');

// Get dashboard stats
const stats = await DashboardAPI.getDashboardStats();
```

## Sample Data

The database initializes with:

- **2 Patients:** John Doe, Jane Smith (with medical histories)
- **3 Staff:** Dr. Smith, Dr. Johnson, Receptionist Sarah
- **5+ Appointments:** Across different statuses
- **Medical Records:** Consultations, prescriptions, test results
- **Health Articles:** Educational content on various topics

Access via:
```javascript
console.log(db._tables.patients);
console.log(db._tables.staff);
console.log(db._tables.appointments);
```

## Common Tasks

### Login Staff Member
```javascript
const result = await AuthAPI.login('dr.smith', 'password123');
if (result.ok) {
    const sessionToken = result.data.token;
    // Store token and use for subsequent requests
}
```

### Book Appointment
```javascript
const result = await AppointAPI.createAppointment({
    patient_id: 'pt-001',
    doctor_id: 'st-001',
    appointment_date: '2024-06-15',
    slot: '09:00',
    reason: 'Checkup'
});
```

### Search for Patient
```javascript
const patients = await window.searchPatients('John Doe');
patients.forEach(p => console.log(`${p.first_name} ${p.last_name}`));
```

### Get Available Slots
```javascript
const slots = await AppointAPI.getAvailableSlots('st-001', '2024-06-15');
// Returns: ['09:00', '09:30', '10:00', '14:00', ...]
```

### View Patient Medical Records
```javascript
const records = await PatientAPI.getMedicalRecords('pt-001');
records.forEach(record => {
    console.log(`${record.record_type}: ${record.diagnosis}`);
});
```

### Get Dashboard Statistics
```javascript
const stats = await DashboardAPI.getDashboardStats();
console.log(`Appointments today: ${stats.data.appointments.today}`);
console.log(`Active patients: ${stats.data.patients.active}`);
console.log(`Staff members: ${stats.data.staff.total}`);
```

## Error Handling

Every API call returns `{ ok, data?, error? }`:

```javascript
const result = await AuthAPI.login(username, password);

if (result.ok) {
    // Success
    console.log(result.data);
} else {
    // Error
    switch (result.error.code) {
        case 'AUTH_INVALID_CREDENTIALS':
            console.log('Wrong username or password');
            break;
        case 'CONFLICT_DOUBLE_BOOKING':
            console.log('Slot already booked');
            break;
        case 'NOT_FOUND':
            console.log('Record not found');
            break;
        default:
            console.log(result.error.message);
    }
}
```

## Testing API Functions

In browser console:

```javascript
// Test search
window.searchPatients('John');

// Test login
AuthAPI.login('dr.smith', 'password123');

// Test appointment creation
AppointAPI.createAppointment({
    patient_id: 'pt-001',
    doctor_id: 'st-001',
    appointment_date: '2024-06-15',
    slot: '09:00'
});

// Test dashboard
DashboardAPI.getDashboardStats();
```

## Reset Database

Clear localStorage to reset to initial data:

```javascript
// In browser console
localStorage.removeItem('gvc_db');
location.reload();  // Page reloads and re-seeds database
```

## Advanced Features

### Advanced Search with Relevance Scoring
```javascript
import * as searchUtils from './gvc-backend/utils/search.js';

const results = await searchUtils.globalSearch('John', ['patients', 'staff']);
// Returns: [{ table, record, relevanceScore, matchedFields }]
```

### Filter Appointments
```javascript
import * as searchUtils from './gvc-backend/utils/search.js';

const filtered = await searchUtils.filterAppointments({
    dateFrom: '2024-06-01',
    dateTo: '2024-06-30',
    status: 'completed',
    department: 'Cardiology'
});
```

### Quick Search (for Autocomplete)
```javascript
const quick = await searchUtils.quickSearch('J', 'patients', 5);
// Returns top 5 patients starting with 'J'
```

## Key API Endpoints Quick Reference

| Function | Purpose | Returns |
|----------|---------|---------|
| `AuthAPI.login(u, p)` | Staff login | `{ user, token }` |
| `PatientAPI.searchPatients(q)` | Find patients | `[patients]` |
| `AppointAPI.createAppointment(obj)` | Book appointment | `{ appointment, confirmation_ref }` |
| `AppointAPI.getAvailableSlots(id, date)` | Check availability | `[slots]` |
| `PatientAPI.getPatient(id)` | Get patient details | `{ patient }` |
| `PatientAPI.getMedicalRecords(id)` | Get records | `[medical_records]` |
| `StaffAPI.listStaff(filters)` | List staff | `[staff]` |
| `DashboardAPI.getDashboardStats()` | Get analytics | `{ appointments, patients, staff, metrics }` |
| `DashboardAPI.generateReport(obj)` | Create report | `{ rows }` |
| `PublicAPI.getClinicInfo()` | Clinic details | `{ name, address, phone, hours }` |
| `PublicAPI.getDoctorProfiles()` | Doctor list | `[doctors]` |
| `PublicAPI.getHealthArticles()` | Articles | `[articles]` |

## Debugging

Check console for `[v0]` logs:

```javascript
// Search logs
console.log('[v0] Searching patients...');

// Database logs  
console.log('[v0] Database tables:', Object.keys(db._tables));

// API logs
console.log('[v0] API result:', result);

// Transaction logs
console.log('[v0] Transaction committed');
```

## Documentation

- **Full API docs:** `gvc-backend/README.md`
- **Integration guide:** `BACKEND_INTEGRATION.md`
- **Skill reference:** `gvc-backend/SKILL.md` (in skill file)

## Next Steps

1. **Wire to Views** — Update view components to call API functions
2. **Add Form Handlers** — Connect forms to API calls
3. **Implement Navigation** — Route based on API results
4. **Add Loading/Error States** — Display feedback to users
5. **Create Reports** — Use dashboard API
6. **Migrate Backend** — When ready, swap import paths to real API

---

**Everything is ready to use!** Start calling APIs in your view components.
