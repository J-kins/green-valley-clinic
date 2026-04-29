// GVC Backend Mock — In-Memory Database with localStorage Persistence
// This is the core data engine for the Green Valley Clinic ICMS.

const DB_VERSION = 1;

class GVCDatabase {
  constructor() {
    this._tables = {};
    this._constraints = {};
    this._transactionStack = [];
    this._writeQueue = [];
    this._writing = false;
    this._initialize();
  }

  _initialize() {
    const stored = localStorage.getItem('gvc_db');
    if (stored) {
      try {
        const { version, tables } = JSON.parse(stored);
        if (version === DB_VERSION) {
          this._tables = tables;
          console.log('[v0] Database hydrated from localStorage');
          return;
        }
      } catch (e) {
        console.warn('[v0] Failed to load stored DB, re-seeding:', e.message);
      }
    }
    this._seed();
  }

  _seed() {
    this._tables = {
      patients: [
        {
          id: 'p001',
          mrn: 'MRN-001001',
          first_name: 'John',
          last_name: 'Doe',
          dob: '1985-05-15',
          gender: 'male',
          phone: '555-0101',
          email: 'john.doe@email.com',
          address: '123 Main St, Springfield',
          blood_type: 'O+',
          allergies: ['Penicillin'],
          medical_history_summary: 'Hypertension, managed with medication',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'p002',
          mrn: 'MRN-001002',
          first_name: 'Jane',
          last_name: 'Smith',
          dob: '1990-08-22',
          gender: 'female',
          phone: '555-0102',
          email: 'jane.smith@email.com',
          address: '456 Oak Ave, Springfield',
          blood_type: 'A+',
          allergies: [],
          medical_history_summary: 'Healthy, routine checkups',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      staff: [
        {
          id: 's001',
          username: 'dr_wilson',
          password_hash: '$2b$10$encrypted_password_dr_wilson',
          first_name: 'Robert',
          last_name: 'Wilson',
          role: 'doctor',
          department: 'General Medicine',
          specialisation: 'General Practice',
          email: 'robert.wilson@gvc.com',
          phone: '555-0201',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: 's002',
          username: 'dr_patel',
          password_hash: '$2b$10$encrypted_password_dr_patel',
          first_name: 'Priya',
          last_name: 'Patel',
          role: 'doctor',
          department: 'Pediatrics',
          specialisation: 'Pediatrician',
          email: 'priya.patel@gvc.com',
          phone: '555-0202',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: 's003',
          username: 'receptionist_jane',
          password_hash: '$2b$10$encrypted_password_receptionist',
          first_name: 'Jane',
          last_name: 'Anderson',
          role: 'receptionist',
          department: 'Front Desk',
          email: 'jane.anderson@gvc.com',
          phone: '555-0203',
          is_active: true,
          created_at: new Date().toISOString()
        }
      ],
      appointments: [
        {
          id: 'a001',
          patient_id: 'p001',
          doctor_id: 's001',
          department: 'General Medicine',
          appointment_date: '2026-05-15',
          slot: '09:00',
          duration_mins: 30,
          reason: 'Blood pressure checkup',
          status: 'scheduled',
          room: 'Room 101',
          notes: 'Regular followup',
          confirmation_ref: 'GVC12345',
          created_by: 's003',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      medical_records: [
        {
          id: 'mr001',
          patient_id: 'p001',
          appointment_id: 'a001',
          doctor_id: 's001',
          record_type: 'consultation',
          date: '2026-04-20',
          diagnosis: 'Hypertension (controlled)',
          notes: 'Patient responding well to medication',
          prescriptions: [
            { drug: 'Lisinopril', dose: '10mg', frequency: 'Once daily', duration: '30 days' }
          ],
          test_results: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      schedules: [
        {
          id: 'sc001',
          doctor_id: 's001',
          day_of_week: 1,
          start_time: '08:00',
          end_time: '17:00',
          slot_duration: 30,
          is_active: true
        },
        {
          id: 'sc002',
          doctor_id: 's002',
          day_of_week: 2,
          start_time: '09:00',
          end_time: '16:00',
          slot_duration: 45,
          is_active: true
        }
      ],
      slots: [],
      enquiries: [],
      announcements: [
        {
          id: 'ann001',
          title: 'New Vaccination Drive',
          body: 'We are excited to announce our new vaccination drive starting next month.',
          category: 'Health Initiative',
          author_id: 's001',
          published: true,
          created_at: new Date().toISOString()
        }
      ],
      health_articles: [
        {
          id: 'ha001',
          title: 'Managing Hypertension at Home',
          body: 'Hypertension is a common condition affecting millions. Here are evidence-based strategies to manage it at home...',
          category: 'Chronic Disease Management',
          author_id: 's001',
          published: true,
          created_at: new Date().toISOString()
        },
        {
          id: 'ha002',
          title: 'The Importance of Regular Checkups',
          body: 'Regular medical checkups help detect health issues early and prevent complications. Schedule your checkup today!',
          category: 'Preventive Care',
          author_id: 's001',
          published: true,
          created_at: new Date().toISOString()
        }
      ]
    };
    this._persist();
    console.log('[v0] Database seeded with initial data');
  }

  // === Core CRUD Operations ===

  async find(table, query = {}) {
    this._validateTable(table);
    const results = this._tables[table].filter(record => {
      return Object.entries(query).every(([key, value]) => record[key] === value);
    });
    return results;
  }

  async findOne(table, query = {}) {
    const results = await this.find(table, query);
    return results[0] || null;
  }

  async insert(table, record) {
    this._validateTable(table);
    if (!record.id) record.id = this._generateId();
    record.created_at = record.created_at || new Date().toISOString();
    record.updated_at = record.updated_at || new Date().toISOString();
    
    await this._checkConstraints(table, record);
    this._tables[table].push(record);
    return record;
  }

  async update(table, id, patch) {
    this._validateTable(table);
    const record = this._tables[table].find(r => r.id === id);
    if (!record) throw new Error(`Record ${id} not found in ${table}`);
    
    const updated = { ...record, ...patch, updated_at: new Date().toISOString() };
    await this._checkConstraints(table, updated);
    
    Object.assign(record, patch);
    record.updated_at = new Date().toISOString();
    return record;
  }

  async delete(table, id) {
    this._validateTable(table);
    const idx = this._tables[table].findIndex(r => r.id === id);
    if (idx === -1) throw new Error(`Record ${id} not found in ${table}`);
    
    const [deleted] = this._tables[table].splice(idx, 1);
    return deleted;
  }

  // === Transactions (ACID) ===

  async transaction(fn) {
    const snapshot = this._deepClone(this._tables);
    const tx = {
      begin: () => snapshot,
      insert: (table, record) => this.insert(table, record),
      update: (table, id, patch) => this.update(table, id, patch),
      delete: (table, id) => this.delete(table, id),
      find: (table, query) => this.find(table, query),
      findOne: (table, query) => this.findOne(table, query)
    };

    this._transactionStack.push(tx);
    try {
      const result = await fn(tx);
      this._transactionStack.pop();
      this._persist();
      return { ok: true, data: result };
    } catch (error) {
      // Rollback: restore snapshot
      this._tables = snapshot;
      this._transactionStack.pop();
      return { ok: false, error: { code: 'TX_ROLLBACK', message: error.message } };
    }
  }

  // === Constraints & Validation ===

  addConstraint(table, fn) {
    this._constraints[table] = fn;
  }

  async _checkConstraints(table, record) {
    if (this._constraints[table]) {
      await this._constraints[table](record);
    }
  }

  exists(table, id) {
    return this._tables[table].some(r => r.id === id);
  }

  // === Persistence ===

  _persist() {
    const data = {
      version: DB_VERSION,
      tables: this._tables,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('gvc_db', JSON.stringify(data));
  }

  // === Helpers ===

  _validateTable(table) {
    if (!this._tables.hasOwnProperty(table)) {
      throw new Error(`Table "${table}" does not exist`);
    }
  }

  _generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
  }

  _deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // === Admin/Utility ===

  clear() {
    this._tables = {};
    localStorage.removeItem('gvc_db');
  }

  reset() {
    this.clear();
    this._seed();
  }

  dump() {
    return JSON.parse(JSON.stringify(this._tables));
  }
}

const db = new GVCDatabase();
export default db;
