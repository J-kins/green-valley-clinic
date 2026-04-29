// STAFF API — FR-11, FR-12
import db from '../db.js';

export async function createStaff(payload) {
  return await db.transaction(async (tx) => {
    if (!payload.username || !payload.first_name || !payload.last_name) {
      throw new Error('Missing required fields');
    }

    const staff = {
      id: `s_${Math.random().toString(36).substr(2, 9)}`,
      username: payload.username,
      password_hash: `$2b$10$encrypted_password_${payload.username}`,
      first_name: payload.first_name,
      last_name: payload.last_name,
      role: payload.role || 'receptionist',
      department: payload.department || '',
      specialisation: payload.specialisation || '',
      email: payload.email || '',
      phone: payload.phone || '',
      is_active: true,
      created_at: new Date().toISOString()
    };

    return await tx.insert('staff', staff);
  });
}

export async function updateStaff(id, patch) {
  return await db.transaction(async (tx) => {
    const staff = await tx.findOne('staff', { id });
    if (!staff) throw new Error('Staff member not found');

    const updated = await tx.update('staff', id, patch);
    return updated;
  });
}

export async function deactivateStaff(id) {
  return await db.transaction(async (tx) => {
    const staff = await tx.findOne('staff', { id });
    if (!staff) throw new Error('Staff member not found');

    return await tx.update('staff', id, { is_active: false });
  });
}

export async function listStaff(filters = {}) {
  try {
    const staff = await db.find('staff', filters);
    return { ok: true, data: staff };
  } catch (error) {
    return { ok: false, error: { code: 'ERROR', message: error.message } };
  }
}

export async function setSchedule(doctorId, scheduleData) {
  return await db.transaction(async (tx) => {
    const doctor = await tx.findOne('staff', { id: doctorId, role: 'doctor' });
    if (!doctor) throw new Error('Doctor not found');

    const existingSchedule = await tx.find('schedules', { doctor_id: doctorId, day_of_week: scheduleData.day_of_week });
    
    let schedule;
    if (existingSchedule.length > 0) {
      schedule = await tx.update('schedules', existingSchedule[0].id, scheduleData);
    } else {
      schedule = {
        id: `sc_${Math.random().toString(36).substr(2, 9)}`,
        doctor_id: doctorId,
        day_of_week: scheduleData.day_of_week,
        start_time: scheduleData.start_time,
        end_time: scheduleData.end_time,
        slot_duration: scheduleData.slot_duration || 30,
        is_active: true
      };
      schedule = await tx.insert('schedules', schedule);
    }

    return schedule;
  });
}

export async function getSchedule(doctorId) {
  try {
    const schedules = await db.find('schedules', { doctor_id: doctorId });
    return { ok: true, data: schedules };
  } catch (error) {
    return { ok: false, error: { code: 'ERROR', message: error.message } };
  }
}
