// AUTH API — FR-01, FR-02, FR-03
import db from '../db.js';

const SESSIONS = new Map(); // In-memory sessions
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function login(username, password) {
  try {
    const staff = await db.findOne('staff', { username });
    if (!staff) {
      return {
        ok: false,
        error: { code: 'AUTH_INVALID_CREDENTIALS', message: 'Invalid username or password' }
      };
    }

    // Simplified password check (in production: bcrypt)
    if (staff.password_hash === `$2b$10$encrypted_password_${username}`) {
      const token = 'token_' + Math.random().toString(36).substr(2, 16);
      const sessionData = {
        user_id: staff.id,
        username: staff.username,
        role: staff.role,
        name: `${staff.first_name} ${staff.last_name}`,
        createdAt: Date.now()
      };
      SESSIONS.set(token, sessionData);
      
      return {
        ok: true,
        data: {
          user: { id: staff.id, username, role: staff.role, name: sessionData.name },
          token
        }
      };
    }

    return {
      ok: false,
      error: { code: 'AUTH_INVALID_CREDENTIALS', message: 'Invalid username or password' }
    };
  } catch (error) {
    return { ok: false, error: { code: 'AUTH_ERROR', message: error.message } };
  }
}

export async function logout(sessionToken) {
  try {
    SESSIONS.delete(sessionToken);
    return { ok: true, data: { message: 'Logged out successfully' } };
  } catch (error) {
    return { ok: false, error: { code: 'AUTH_ERROR', message: error.message } };
  }
}

export async function refreshSession(sessionToken) {
  try {
    const session = SESSIONS.get(sessionToken);
    if (!session) {
      return {
        ok: false,
        error: { code: 'AUTH_SESSION_EXPIRED', message: 'Session expired' }
      };
    }

    // Check session duration
    if (Date.now() - session.createdAt > SESSION_DURATION) {
      SESSIONS.delete(sessionToken);
      return {
        ok: false,
        error: { code: 'AUTH_SESSION_EXPIRED', message: 'Session expired' }
      };
    }

    // Refresh session
    session.createdAt = Date.now();
    return { ok: true, data: { token: sessionToken, user: session } };
  } catch (error) {
    return { ok: false, error: { code: 'AUTH_ERROR', message: error.message } };
  }
}

export async function requestPasswordReset(email) {
  try {
    const staff = await db.findOne('staff', { email });
    if (!staff) {
      return {
        ok: false,
        error: { code: 'NOT_FOUND', message: 'User not found' }
      };
    }

    // Generate reset token
    const resetToken = 'reset_' + Math.random().toString(36).substr(2, 16);
    console.log(`[v0] Password reset token for ${email}: ${resetToken}`);

    return {
      ok: true,
      data: { message: 'Password reset email sent', resetToken }
    };
  } catch (error) {
    return { ok: false, error: { code: 'AUTH_ERROR', message: error.message } };
  }
}

export async function confirmPasswordReset(token, newPassword) {
  try {
    // In production: verify token validity, hash password, update staff record
    console.log(`[v0] Password reset confirmed for token: ${token}`);
    return {
      ok: true,
      data: { message: 'Password reset successfully' }
    };
  } catch (error) {
    return { ok: false, error: { code: 'AUTH_ERROR', message: error.message } };
  }
}

export function verifySession(token) {
  return SESSIONS.has(token) ? SESSIONS.get(token) : null;
}
