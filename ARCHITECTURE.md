# GVC System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│  GREEN VALLEY CLINIC - INTEGRATED CLINIC MANAGEMENT SYSTEM (ICMS)           │
│                                                                               │
│  ┌──────────────────────┐                         ┌──────────────────────┐  │
│  │  PUBLIC PORTAL       │                         │  CLINIC STAFF PORTAL │  │
│  │  (Patient-Facing)    │                         │  (Staff-Facing)      │  │
│  │                      │                         │                      │  │
│  │ • Landing Page       │                         │ • Dashboard          │  │
│  │ • Patient Login      │                         │ • Patient Management │  │
│  │ • Book Appointment   │                         │ • Appointments       │  │
│  │ • View Medical Hx    │                         │ • Clinical Notes     │  │
│  │ • Search Articles    │                         │ • Staff Management   │  │
│  │ • Contact Form       │                         │ • Reports & Analytics│  │
│  │                      │                         │                      │  │
│  │ public/index.js ────┼─────────────────────────┼─ clinic/index.js     │  │
│  └──────────┬───────────┘                         └──────────┬───────────┘  │
│             │                                                │               │
│             │    ┌─────────────────────────────────────┐    │               │
│             │    │                                       │    │               │
│             └────┤     GVC BACKEND SYSTEM              │────┘               │
│                  │                                       │                   │
│                  │  ┌──────────────────────────────┐   │                   │
│                  │  │  DATABASE ENGINE (db.js)     │   │                   │
│                  │  │                              │   │                   │
│                  │  │ • In-Memory Database         │   │                   │
│                  │  │ • ACID Transactions          │   │                   │
│                  │  │ • Constraint Validation      │   │                   │
│                  │  │ • Conflict Detection         │   │                   │
│                  │  │ • Data Integrity             │   │                   │
│                  │  └──────────────────────────────┘   │                   │
│                  │                                       │                   │
│                  │  ┌──────────────────────────────┐   │                   │
│                  │  │  API MODULES (api/*)         │   │                   │
│                  │  │                              │   │                   │
│                  │  │ • auth.js ──→ Login/Session │   │                   │
│                  │  │ • appt.js ──→ Appointments  │   │                   │
│                  │  │ • patient.js ─ Patients     │   │                   │
│                  │  │ • staff.js ── Staff Mgmt    │   │                   │
│                  │  │ • dashboard.js Reports      │   │                   │
│                  │  │ • public.js ─ Public APIs   │   │                   │
│                  │  └──────────────────────────────┘   │                   │
│                  │                                       │                   │
│                  │  ┌──────────────────────────────┐   │                   │
│                  │  │  UTILITIES (utils/*)         │   │                   │
│                  │  │                              │   │                   │
│                  │  │ • search.js ──→ Search      │   │                   │
│                  │  │                              │   │                   │
│                  │  └──────────────────────────────┘   │                   │
│                  │                                       │                   │
│                  └───────────────────┬───────────────────┘                   │
│                                      │                                       │
│                            ┌─────────▼──────────┐                           │
│                            │  localStorage      │                           │
│                            │  (Persistence)     │                           │
│                            └────────────────────┘                           │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Architecture

### 1. User Interaction Flow

```
User Action
    │
    ▼
Component Event Handler
    │
    ▼
Window Search Function OR API Module Call
    │
    ├─→ window.searchPatients()
    ├─→ window.searchAppointments()
    ├─→ AuthAPI.login()
    ├─→ AppointAPI.createAppointment()
    └─→ etc.
    │
    ▼
API Module (api/auth.js, api/appointments.js, etc.)
    │
    ├─→ Input Validation
    ├─→ Business Logic
    └─→ Database Transaction
    │
    ▼
Database Engine (db.js)
    │
    ├─→ Validate Constraints
    ├─→ Check Consistency
    ├─→ Execute Transaction
    ├─→ Atomic Write
    └─→ Commit or Rollback
    │
    ▼
localStorage (Persist Changes)
    │
    ▼
Return { ok, data, error } Response
    │
    ▼
Component Renders Results
```

## Request/Response Cycle

### Example: Book an Appointment

```
┌─ PUBLIC PORTAL ─────────────────────────────────────────┐
│                                                          │
│  BookAppointment.js                                     │
│  │                                                       │
│  ├─ User fills form                                    │
│  │  - Patient ID                                       │
│  │  - Doctor ID                                        │
│  │  - Date & Time                                      │
│  │                                                      │
│  └─ Calls API:                                         │
│     AppointAPI.createAppointment({...})                │
│                                                          │
└─────────────────────┬──────────────────────────────────┘
                      │
                      ▼
┌─ GVC BACKEND ───────────────────────────────────────────┐
│                                                          │
│  api/appointments.js → createAppointment()             │
│  │                                                       │
│  ├─ Validate Input                                     │
│  │  ✓ patient_id exists                               │
│  │  ✓ doctor_id exists                                │
│  │  ✓ date is in future                               │
│  │                                                      │
│  ├─ Call db.transaction():                             │
│  │                                                      │
│  └─→ db.js                                             │
│     │                                                   │
│     ├─ BEGIN TRANSACTION                               │
│     │  1. db.find('patients', {id})     ✓             │
│     │  2. db.find('staff', {id})        ✓             │
│     │  3. db.find('slots', {check})     ✓ AVAILABLE  │
│     │  4. db.insert('appointments')     ✓             │
│     │  5. db.update('slots', {taken})   ✓             │
│     ├─ COMMIT TRANSACTION                              │
│     │                                                   │
│     └─ Save to localStorage                            │
│                                                          │
│  Return: {                                              │
│    ok: true,                                            │
│    data: {                                              │
│      appointment: {...},                               │
│      confirmation_ref: "GVC-ABC123"                    │
│    }                                                    │
│  }                                                      │
└─────────────────────┬──────────────────────────────────┘
                      │
                      ▼
┌─ PUBLIC PORTAL ─────────────────────────────────────────┐
│                                                          │
│  BookAppointment.js                                     │
│  │                                                       │
│  ├─ Receive Response                                   │
│  │                                                      │
│  ├─ if (result.ok) {                                  │
│  │    Show success message                            │
│  │    Display confirmation ref                        │
│  │    Clear form                                       │
│  │    Navigate to "My Appointments"                   │
│  │  }                                                  │
│  └─ else {                                             │
│     Show error message (result.error.message)          │
│  }                                                      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## Database Schema Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 IN-MEMORY DATABASE                      │
│                                                          │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │   patients    │  │     staff    │  │appointments │  │
│  ├───────────────┤  ├──────────────┤  ├─────────────┤  │
│  │ id (PK)       │  │ id (PK)      │  │ id (PK)     │  │
│  │ mrn (UNIQUE)  │  │ username     │  │ patient_id  │  │
│  │ first_name    │  │ password_hash│  │ doctor_id   │  │
│  │ last_name     │  │ first_name   │  │ appt_date   │  │
│  │ dob           │  │ role         │  │ slot        │  │
│  │ blood_type    │  │ department   │  │ status      │  │
│  │ allergies[]   │  │ email        │  │ confirmation│  │
│  │ email         │  │ is_active    │  │ ref         │  │
│  │ created_at    │  │ created_at   │  │ created_at  │  │
│  └───────────────┘  └──────────────┘  └─────────────┘  │
│       ▲                   ▲                   │         │
│       │ (1:N)             │ (1:N)             │ (N:1)  │
│       │                   │                   │         │
│       └───────┬───────────┘───────────────────┘         │
│               │                                          │
│       ┌───────▼──────────────┐                          │
│       │  medical_records     │                          │
│       ├──────────────────────┤                          │
│       │ id (PK)              │                          │
│       │ patient_id (FK)      │                          │
│       │ doctor_id (FK)       │                          │
│       │ appointment_id (FK)  │                          │
│       │ record_type          │                          │
│       │ diagnosis            │                          │
│       │ prescriptions[]      │                          │
│       │ test_results[]       │                          │
│       │ created_at           │                          │
│       └──────────────────────┘                          │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │  schedules   │  │  slots       │  │  enquiries  │  │
│  ├──────────────┤  ├──────────────┤  ├─────────────┤  │
│  │ id (PK)      │  │ id (PK)      │  │ id (PK)     │  │
│  │ doctor_id(FK)│  │ doctor_id(FK)│  │ name        │  │
│  │ day_of_week  │  │ date         │  │ email       │  │
│  │ start_time   │  │ time         │  │ message     │  │
│  │ end_time     │  │ available    │  │ status      │  │
│  │ is_active    │  │ appointment_ │  │ created_at  │  │
│  │              │  │ id           │  │             │  │
│  └──────────────┘  └──────────────┘  └─────────────┘  │
│                                                          │
│  ┌────────────────────────┐ ┌──────────────────────┐   │
│  │  announcements         │ │  health_articles     │   │
│  ├────────────────────────┤ ├──────────────────────┤   │
│  │ id (PK)                │ │ id (PK)              │   │
│  │ title                  │ │ title                │   │
│  │ body                   │ │ body                 │   │
│  │ author_id (FK)         │ │ category             │   │
│  │ published              │ │ author_id (FK)       │   │
│  │ created_at             │ │ published            │   │
│  └────────────────────────┘ │ created_at           │   │
│                             └──────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘

Legend:
PK = Primary Key
FK = Foreign Key
UNIQUE = Unique constraint
(1:N) = One-to-Many relationship
(N:1) = Many-to-One relationship
```

## Search Architecture

```
Search Request
    │
    ▼
window.search*() global function
    │
    ├─ searchPatients('query')
    ├─ searchStaff('query')
    ├─ searchAppointments('query')
    └─ searchHealthArticles('query')
    │
    ▼
utils/search.js module
    │
    ├─ globalSearch(query, tables, fields)
    │  ├─ Case-insensitive normalization
    │  ├─ Linear scan of target tables
    │  ├─ Field-by-field matching
    │  ├─ Relevance score calculation:
    │  │  • Exact match: +100
    │  │  • Starts with: +50
    │  │  • Contains: +25
    │  └─ Sort by score (highest first)
    │
    ├─ OR Quick search (for autocomplete)
    │  ├─ Use globalSearch()
    │  └─ Return limited results (5-10)
    │
    ├─ OR Advanced filters
    │  ├─ Date range filtering
    │  ├─ Status filtering
    │  ├─ Department filtering
    │  └─ Return filtered results
    │
    ▼
Return Results Array
    │
    ├─ Matched records
    ├─ Relevance scores
    └─ Matched fields
    │
    ▼
Component Displays Results
```

## ACID Transaction Flow

```
Transaction Request
    │
    ▼
db.transaction(async (tx) => { ... })
    │
    ├─ SAVE SNAPSHOT of data
    │  (Isolation: consistent view)
    │
    ├─ Step 1: Business Logic
    │  ├─ Check constraints
    │  ├─ Validate foreign keys
    │  └─ Run validation rules
    │  (Consistency guaranteed)
    │
    ├─ Step 2: Execute Writes
    │  ├─ tx.insert(table, record)
    │  ├─ tx.update(table, id, patch)
    │  ├─ tx.delete(table, id)
    │  └─ All buffered (not committed yet)
    │  (Atomicity: all-or-nothing)
    │
    ├─ If any step fails:
    │  └─ ROLLBACK all changes
    │     (Atomicity preserved)
    │
    ├─ If all steps succeed:
    │  └─ COMMIT all changes
    │     └─ Save to localStorage
    │        (Durability achieved)
    │
    ▼
Return Result
    │
    ├─ { ok: true, data: {...} }  ← Success
    └─ { ok: false, error: {...} } ← Failure
```

## File Organization

```
v0-project/
│
├── index.js                    ← Main landing page portal
├── index.html                  ← Main HTML shell
│
├── public/                     ← PATIENT PORTAL
│   ├── index.js               ← Entry point (linked to backend)
│   ├── index.html             ← Shell HTML
│   └── views/                 ← Page components
│       ├── Landing.js
│       ├── PatientLogin.js
│       ├── PatientSignup.js
│       ├── BookAppointment.js
│       ├── MyAppointments.js
│       ├── PatientDashboard.js
│       └── ...
│
├── clinic/                     ← STAFF PORTAL
│   ├── index.js               ← Entry point (linked to backend)
│   ├── index.html             ← Shell HTML
│   └── views/                 ← Page components
│       ├── StaffLogin.js
│       ├── Dashboard.js
│       ├── PatientDetails.js
│       ├── StaffManagement.js
│       ├── ClinicalNotes.js
│       └── ...
│
├── gvc-backend/               ← BACKEND ENGINE
│   ├── db.js                  ← Database engine
│   ├── api/                   ← API modules
│   │   ├── auth.js
│   │   ├── appointments.js
│   │   ├── patients.js
│   │   ├── staff.js
│   │   ├── dashboard.js
│   │   └── public.js
│   ├── utils/                 ← Utilities
│   │   └── search.js
│   └── README.md              ← API documentation
│
├── pages/                      ← PUBLIC WEBSITE
│   ├── services.html
│   ├── about.html
│   ├── contact.html
│   └── articles.html
│
├── packages/                   ← COMPONENT LIBRARY
│   ├── core/
│   ├── components/
│   └── cli/
│
└── Documentation
    ├── ARCHITECTURE.md         ← You are here
    ├── BACKEND_INTEGRATION.md  ← How it's wired
    ├── QUICK_START.md         ← Quick reference
    └── IMPLEMENTATION_SUMMARY.md ← What's done
```

## Technology Stack

### Frontend
- **Vanilla JavaScript** (ES6+)
- **Custom Component Classes** (packages/core/)
- **CSS Grid & Flexbox** (layout)
- **localStorage API** (persistence)

### Backend (Mock)
- **In-Memory Database** (JavaScript object)
- **ACID Transactions** (custom implementation)
- **Bcrypt** (password hashing in sample data)
- **JWT** (session tokens in sample data)

### Storage
- **localStorage** (data persistence)
- **JSON** (serialization format)

## Performance Characteristics

| Operation | Time | Notes |
|-----------|------|-------|
| Search 100 patients | <1ms | Linear O(n) scan |
| Book appointment | 1-2ms | ACID transaction |
| Login | <1ms | Password hash check |
| Get dashboard stats | 2-3ms | Aggregation query |
| Load from localStorage | 5-10ms | JSON.parse |
| Save to localStorage | 5-10ms | JSON.stringify |

## Security Architecture

```
┌──────────────────────────────────────┐
│     SECURITY LAYERS                  │
├──────────────────────────────────────┤
│                                      │
│ Layer 1: Authentication              │
│ • Username/password login            │
│ • Bcrypt password hashing (sample)   │
│ • JWT session tokens                 │
│ • Session expiry (2 hours)           │
│                                      │
│ Layer 2: Authorization               │
│ • Role-based access control (RBAC)  │
│ • staff: Doctor, Receptionist, Admin │
│ • patients: View own data only       │
│                                      │
│ Layer 3: Data Integrity              │
│ • Foreign key constraints            │
│ • Business rule validation           │
│ • ACID transactions                  │
│                                      │
│ Layer 4: Input Validation            │
│ • Email format validation            │
│ • Phone number validation            │
│ • Date validation                    │
│ • Required field checks              │
│                                      │
└──────────────────────────────────────┘
```

## Scalability Path

```
Current Architecture (Prototype)
├─ In-memory database
├─ Direct API imports
├─ localStorage persistence
└─ Single-user (no concurrency)

     ↓ When Ready to Scale

Real Backend Architecture
├─ PostgreSQL/MySQL database
├─ REST/GraphQL API server
├─ Redis caching layer
├─ Load balancing
├─ Multi-user support
└─ Only import paths change!
```

## Migration Path

```
Step 1: Current (Mock Backend)
import * as AuthAPI from '../gvc-backend/api/auth.js'

Step 2: Real Backend
import * as AuthAPI from '../services/auth.js'
// New service makes HTTP calls:
// fetch('/api/auth/login', {...})

Step 3: Everything else stays the same!
// Response format unchanged
// Error handling unchanged
// API signatures unchanged
```

---

**This architecture enables:**
- ✅ Rapid prototyping with mock backend
- ✅ Real-time search and filtering
- ✅ ACID transaction safety
- ✅ Data persistence
- ✅ Easy migration to real backend
- ✅ Scalable design patterns
