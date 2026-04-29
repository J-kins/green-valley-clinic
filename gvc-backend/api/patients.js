// PATIENTS API — FR-08, FR-09, FR-10
import db from '../db.js';

export async function createPatient(payload) {
  return await db.transaction(async (tx) => {
    // Validate required fields
    if (!payload.first_name || !payload.last_name || !payload.dob) {
      throw new Error('Missing required fields');
    }

    const patient = {
      id: `p_${Math.random().toString(36).substr(2, 9)}`,
      mrn: `MRN-${Date.now()}`,
      first_name: payload.first_name,
      last_name: payload.last_name,
      dob: payload.dob,
      gender: payload.gender || 'other',
      phone: payload.phone || '',
      email: payload.email || '',
      address: payload.address || '',
      blood_type: payload.blood_type || '',
      allergies: payload.allergies || [],
      medical_history_summary: payload.medical_history_summary || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return await tx.insert('patients', patient);
  });
}

export async function updatePatient(id, patch) {
  return await db.transaction(async (tx) => {
    const patient = await tx.findOne('patients', { id });
    if (!patient) throw new Error('Patient not found');

    const updated = await tx.update('patients', id, patch);
    return updated;
  });
}

export async function getPatient(id) {
  try {
    const patient = await db.findOne('patients', { id });
    if (!patient) {
      return { ok: false, error: { code: 'NOT_FOUND', message: 'Patient not found' } };
    }
    return { ok: true, data: patient };
  } catch (error) {
    return { ok: false, error: { code: 'ERROR', message: error.message } };
  }
}

export async function searchPatients(query) {
  try {
    const patients = await db.find('patients');
    const results = patients.filter(p => {
      const fullName = `${p.first_name} ${p.last_name}`.toLowerCase();
      return (
        fullName.includes(query.toLowerCase()) ||
        p.email.toLowerCase().includes(query.toLowerCase()) ||
        p.mrn.includes(query) ||
        p.phone.includes(query)
      );
    });
    return { ok: true, data: results };
  } catch (error) {
    return { ok: false, error: { code: 'ERROR', message: error.message } };
  }
}

export async function getMedicalRecords(patientId) {
  try {
    const records = await db.find('medical_records', { patient_id: patientId });
    return { ok: true, data: records };
  } catch (error) {
    return { ok: false, error: { code: 'ERROR', message: error.message } };
  }
}

export async function addMedicalRecord(patientId, record) {
  return await db.transaction(async (tx) => {
    const patient = await tx.findOne('patients', { id: patientId });
    if (!patient) throw new Error('Patient not found');

    const newRecord = {
      id: `mr_${Math.random().toString(36).substr(2, 9)}`,
      patient_id: patientId,
      appointment_id: record.appointment_id || null,
      doctor_id: record.doctor_id,
      record_type: record.record_type,
      date: record.date || new Date().toISOString().split('T')[0],
      diagnosis: record.diagnosis || '',
      notes: record.notes || '',
      prescriptions: record.prescriptions || [],
      test_results: record.test_results || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return await tx.insert('medical_records', newRecord);
  });
}
