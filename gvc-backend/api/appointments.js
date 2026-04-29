// APPOINTMENTS API — FR-04, FR-05, FR-06, FR-07, FR-15, FR-17
import db from '../db.js';

export async function listAppointments(filters = {}) {
  try {
    const appointments = await db.find('appointments', filters);
    return { ok: true, data: appointments };
  } catch (error) {
    return { ok: false, error: { code: 'ERROR', message: error.message } };
  }
}

export async function createAppointment(payload) {
  return await db.transaction(async (tx) => {
    // Validate foreign keys
    const patient = await tx.findOne('patients', { id: payload.patient_id });
    if (!patient) throw new Error('Patient not found');

    const doctor = await tx.findOne('staff', { id: payload.doctor_id, role: 'doctor' });
    if (!doctor) throw new Error('Doctor not found or invalid role');

    // Check for double-booking
    const existing = await tx.find('appointments', {
      doctor_id: payload.doctor_id,
      appointment_date: payload.appointment_date,
      slot: payload.slot,
      status: 'scheduled'
    });
    if (existing.length > 0) throw new Error('CONFLICT_DOUBLE_BOOKING');

    // Check appointment date is in future
    const appointmentDate = new Date(payload.appointment_date);
    if (appointmentDate < new Date()) throw new Error('Appointment date must be in the future');

    const appointment = {
      id: `appt_${Math.random().toString(36).substr(2, 9)}`,
      patient_id: payload.patient_id,
      doctor_id: payload.doctor_id,
      department: payload.department,
      appointment_date: payload.appointment_date,
      slot: payload.slot,
      duration_mins: payload.duration_mins || 30,
      reason: payload.reason,
      status: 'scheduled',
      room: payload.room,
      notes: payload.notes || '',
      confirmation_ref: Math.random().toString(36).substr(2, 8).toUpperCase(),
      created_by: payload.created_by,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return await tx.insert('appointments', appointment);
  });
}

export async function updateAppointment(id, patch) {
  return await db.transaction(async (tx) => {
    const appointment = await tx.findOne('appointments', { id });
    if (!appointment) throw new Error('Appointment not found');

    const updated = await tx.update('appointments', id, patch);
    return updated;
  });
}

export async function cancelAppointment(id, reason) {
  return await db.transaction(async (tx) => {
    const appointment = await tx.findOne('appointments', { id });
    if (!appointment) throw new Error('Appointment not found');

    const updated = await tx.update('appointments', id, {
      status: 'cancelled',
      notes: `Cancelled: ${reason}`
    });
    return updated;
  });
}

export async function getAvailableSlots(doctorId, date) {
  try {
    const doctor = await db.findOne('staff', { id: doctorId, role: 'doctor' });
    if (!doctor) return { ok: false, error: { code: 'NOT_FOUND', message: 'Doctor not found' } };

    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();

    // Get doctor's schedule for this day
    const schedules = await db.find('schedules', { doctor_id: doctorId, day_of_week: dayOfWeek });
    if (schedules.length === 0) {
      return { ok: true, data: [] };
    }

    const schedule = schedules[0];
    const slots = [];
    
    const [startHour, startMin] = schedule.start_time.split(':').map(Number);
    const [endHour, endMin] = schedule.end_time.split(':').map(Number);
    
    let current = new Date(dateObj);
    current.setHours(startHour, startMin, 0, 0);
    const end = new Date(dateObj);
    end.setHours(endHour, endMin, 0, 0);

    while (current < end) {
      const timeStr = current.toTimeString().slice(0, 5);
      
      // Check if slot is booked
      const booked = await db.find('appointments', {
        doctor_id: doctorId,
        appointment_date: date,
        slot: timeStr,
        status: 'scheduled'
      });

      slots.push({
        time: timeStr,
        available: booked.length === 0
      });

      current.setMinutes(current.getMinutes() + schedule.slot_duration);
    }

    return { ok: true, data: slots };
  } catch (error) {
    return { ok: false, error: { code: 'ERROR', message: error.message } };
  }
}

export async function bookPublicAppointment(payload) {
  return await db.transaction(async (tx) => {
    const doctor = await tx.findOne('staff', { id: payload.doctor_id, role: 'doctor' });
    if (!doctor) throw new Error('Doctor not found');

    // Find or create patient
    let patient = await tx.findOne('patients', { email: payload.email });
    if (!patient) {
      patient = {
        id: `p_${Math.random().toString(36).substr(2, 9)}`,
        mrn: `MRN-${Date.now()}`,
        first_name: payload.first_name,
        last_name: payload.last_name,
        dob: payload.dob,
        gender: payload.gender,
        phone: payload.phone,
        email: payload.email,
        address: payload.address || '',
        blood_type: '',
        allergies: [],
        medical_history_summary: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      patient = await tx.insert('patients', patient);
    }

    const appointment = {
      id: `appt_${Math.random().toString(36).substr(2, 9)}`,
      patient_id: patient.id,
      doctor_id: payload.doctor_id,
      department: payload.department,
      appointment_date: payload.appointment_date,
      slot: payload.slot,
      duration_mins: 30,
      reason: payload.reason,
      status: 'scheduled',
      room: '',
      notes: payload.notes || '',
      confirmation_ref: Math.random().toString(36).substr(2, 8).toUpperCase(),
      created_by: 'public',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return await tx.insert('appointments', appointment);
  });
}

export async function rescheduleAppointment(id, newSlot) {
  return await db.transaction(async (tx) => {
    const appointment = await tx.findOne('appointments', { id });
    if (!appointment) throw new Error('Appointment not found');

    // Check new slot availability
    const conflicting = await tx.find('appointments', {
      doctor_id: appointment.doctor_id,
      appointment_date: newSlot.date,
      slot: newSlot.time,
      status: 'scheduled'
    });

    if (conflicting.length > 0) throw new Error('CONFLICT_DOUBLE_BOOKING');

    return await tx.update('appointments', id, {
      appointment_date: newSlot.date,
      slot: newSlot.time
    });
  });
}
