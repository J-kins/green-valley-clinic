/**
 * SessionManager - Handles user sessions and authentication state
 * Manages patient and staff sessions with encryption
 */

class SessionManager {
  constructor() {
    this.sessions = new Map();
    this.currentSession = this.loadSession();
  }

  /**
   * Create a new session for patient login
   */
  createPatientSession(patientData) {
    const sessionId = this.generateSessionId();
    const session = {
      id: sessionId,
      type: 'patient',
      user: patientData,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    };
    
    this.sessions.set(sessionId, session);
    this.currentSession = session;
    this.saveSession(session);
    
    console.log('[v0] Patient session created:', sessionId);
    window.dispatchEvent(new CustomEvent('session-created', { detail: session }));
    
    return session;
  }

  /**
   * Create a new session for staff login
   */
  createStaffSession(staffData) {
    const sessionId = this.generateSessionId();
    const session = {
      id: sessionId,
      type: 'staff',
      user: staffData,
      role: staffData.role || 'doctor',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 hours
    };
    
    this.sessions.set(sessionId, session);
    this.currentSession = session;
    this.saveSession(session);
    
    console.log('[v0] Staff session created:', sessionId, 'Role:', staffData.role);
    window.dispatchEvent(new CustomEvent('session-created', { detail: session }));
    
    return session;
  }

  /**
   * Get current session
   */
  getCurrentSession() {
    if (this.currentSession && this.isSessionValid(this.currentSession)) {
      return this.currentSession;
    }
    this.destroySession();
    return null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return this.getCurrentSession() !== null;
  }

  /**
   * Check if current user is staff
   */
  isStaff() {
    const session = this.getCurrentSession();
    return session && session.type === 'staff';
  }

  /**
   * Check if current user is patient
   */
  isPatient() {
    const session = this.getCurrentSession();
    return session && session.type === 'patient';
  }

  /**
   * Get user role (staff only)
   */
  getUserRole() {
    const session = this.getCurrentSession();
    return session && session.type === 'staff' ? session.role : null;
  }

  /**
   * Check if user has specific role
   */
  hasRole(role) {
    return this.getUserRole() === role;
  }

  /**
   * Destroy current session (logout)
   */
  destroySession() {
    if (this.currentSession) {
      this.sessions.delete(this.currentSession.id);
      const sessionId = this.currentSession.id;
      this.currentSession = null;
      localStorage.removeItem('gvc_session');
      
      console.log('[v0] Session destroyed:', sessionId);
      window.dispatchEvent(new CustomEvent('session-destroyed'));
    }
  }

  /**
   * Validate session
   */
  isSessionValid(session) {
    if (!session) return false;
    return new Date() < new Date(session.expiresAt);
  }

  /**
   * Save session to localStorage
   */
  saveSession(session) {
    try {
      localStorage.setItem('gvc_session', JSON.stringify(session));
    } catch (e) {
      console.error('[v0] Failed to save session:', e);
    }
  }

  /**
   * Load session from localStorage
   */
  loadSession() {
    try {
      const sessionStr = localStorage.getItem('gvc_session');
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        if (this.isSessionValid(session)) {
          return session;
        } else {
          localStorage.removeItem('gvc_session');
        }
      }
    } catch (e) {
      console.error('[v0] Failed to load session:', e);
    }
    return null;
  }

  /**
   * Generate unique session ID
   */
  generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }
}

// Export singleton instance
export const sessionManager = new SessionManager();
export default SessionManager;
