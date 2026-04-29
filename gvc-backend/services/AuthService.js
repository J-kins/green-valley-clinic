// AuthService — Centralized authentication and session management
import db from '../db.js';

class AuthService {
  constructor() {
    this.sessions = new Map();
    this.SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
    this.loadSessionsFromStorage();
  }

  loadSessionsFromStorage() {
    try {
      const stored = localStorage.getItem('gvc_sessions');
      if (stored) {
        const sessions = JSON.parse(stored);
        Object.entries(sessions).forEach(([token, session]) => {
          if (Date.now() - session.createdAt < this.SESSION_DURATION) {
            this.sessions.set(token, session);
          }
        });
      }
    } catch (e) {
      console.warn('[v0] Failed to load sessions:', e);
    }
  }

  saveSessionsToStorage() {
    try {
      const sessionsObj = {};
      this.sessions.forEach((session, token) => {
        sessionsObj[token] = session;
      });
      localStorage.setItem('gvc_sessions', JSON.stringify(sessionsObj));
    } catch (e) {
      console.warn('[v0] Failed to save sessions:', e);
    }
  }

  /**
   * Patient login
   */
  async loginPatient(identifier, password) {
    try {
      const patient = await db.findOne('patients', (p) => 
        p.email === identifier || p.mrn === identifier
      );

      if (!patient) {
        return {
          ok: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid patient ID or password' }
        };
      }

      // Simplified password check (in production: bcrypt)
      if (password.length < 6) {
        return {
          ok: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' }
        };
      }

      const token = this.generateToken();
      const session = {
        token,
        user_id: patient.id,
        user_type: 'patient',
        email: patient.email,
        name: `${patient.first_name} ${patient.last_name}`,
        role: 'patient',
        createdAt: Date.now()
      };

      this.sessions.set(token, session);
      this.saveSessionsToStorage();
      localStorage.setItem('gvc_auth_token', token);

      return {
        ok: true,
        data: {
          token,
          user: {
            id: patient.id,
            type: 'patient',
            name: session.name,
            email: patient.email,
            role: 'patient'
          }
        }
      };
    } catch (error) {
      return { ok: false, error: { code: 'AUTH_ERROR', message: error.message } };
    }
  }

  /**
   * Staff login
   */
  async loginStaff(username, password) {
    try {
      const staff = await db.findOne('staff', { username });

      if (!staff || !staff.is_active) {
        return {
          ok: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid username or password' }
        };
      }

      // Simplified password check (in production: bcrypt)
      if (password.length < 6) {
        return {
          ok: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' }
        };
      }

      const token = this.generateToken();
      const session = {
        token,
        user_id: staff.id,
        user_type: 'staff',
        username: staff.username,
        name: `${staff.first_name} ${staff.last_name}`,
        role: staff.role,
        department: staff.department || '',
        createdAt: Date.now()
      };

      this.sessions.set(token, session);
      this.saveSessionsToStorage();
      localStorage.setItem('gvc_auth_token', token);
      localStorage.setItem('gvc_user_role', staff.role);

      return {
        ok: true,
        data: {
          token,
          user: {
            id: staff.id,
            type: 'staff',
            username: staff.username,
            name: session.name,
            role: staff.role,
            department: staff.department
          }
        }
      };
    } catch (error) {
      return { ok: false, error: { code: 'AUTH_ERROR', message: error.message } };
    }
  }

  /**
   * Logout
   */
  logout(token) {
    this.sessions.delete(token);
    this.saveSessionsToStorage();
    localStorage.removeItem('gvc_auth_token');
    localStorage.removeItem('gvc_user_role');
    return { ok: true, data: { message: 'Logged out successfully' } };
  }

  /**
   * Get current session
   */
  getSession(token) {
    if (!token) {
      token = localStorage.getItem('gvc_auth_token');
    }
    if (!token) return null;

    const session = this.sessions.get(token);
    if (!session) return null;

    // Check if session expired
    if (Date.now() - session.createdAt > this.SESSION_DURATION) {
      this.sessions.delete(token);
      localStorage.removeItem('gvc_auth_token');
      return null;
    }

    return session;
  }

  /**
   * Verify session is valid
   */
  isAuthenticated(token) {
    return this.getSession(token) !== null;
  }

  /**
   * Check if user has specific role
   */
  hasRole(token, expectedRole) {
    const session = this.getSession(token);
    if (!session) return false;
    return session.role === expectedRole;
  }

  /**
   * Check if user is staff with any of the given roles
   */
  hasAnyRole(token, roles) {
    const session = this.getSession(token);
    if (!session) return false;
    return roles.includes(session.role);
  }

  /**
   * Register new patient
   */
  async registerPatient(data) {
    try {
      // Check if patient already exists
      const existing = await db.findOne('patients', { email: data.email });
      if (existing) {
        return {
          ok: false,
          error: { code: 'PATIENT_EXISTS', message: 'Patient with this email already exists' }
        };
      }

      const newPatient = {
        id: `p${Date.now()}`,
        mrn: `MRN-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
        first_name: data.firstName,
        last_name: data.lastName,
        dob: data.dob,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        address: data.address || '',
        blood_type: data.bloodType || '',
        allergies: [],
        medical_history_summary: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const result = await db.insert('patients', newPatient);
      if (!result.ok) {
        return result;
      }

      return {
        ok: true,
        data: { patient: newPatient, message: 'Patient registered successfully' }
      };
    } catch (error) {
      return { ok: false, error: { code: 'AUTH_ERROR', message: error.message } };
    }
  }

  /**
   * Register new staff member
   */
  async registerStaff(data) {
    try {
      // Check if staff already exists
      const existing = await db.findOne('staff', { username: data.username });
      if (existing) {
        return {
          ok: false,
          error: { code: 'STAFF_EXISTS', message: 'Staff with this username already exists' }
        };
      }

      const newStaff = {
        id: `s${Date.now()}`,
        username: data.username,
        password_hash: `$2b$10$encrypted_password_${data.username}`,
        first_name: data.firstName,
        last_name: data.lastName,
        role: data.role,
        department: data.department || '',
        specialisation: data.specialisation || '',
        email: data.email,
        phone: data.phone,
        is_active: true,
        created_at: new Date().toISOString()
      };

      const result = await db.insert('staff', newStaff);
      if (!result.ok) {
        return result;
      }

      return {
        ok: true,
        data: { staff: newStaff, message: 'Staff registered successfully' }
      };
    } catch (error) {
      return { ok: false, error: { code: 'AUTH_ERROR', message: error.message } };
    }
  }

  /**
   * Generate random token
   */
  generateToken() {
    return 'token_' + Math.random().toString(36).substr(2, 24) + '_' + Date.now();
  }
}

// Export singleton
export default new AuthService();
