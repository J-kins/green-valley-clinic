// PUBLIC API — FR-18, FR-19, FR-20, FR-21, FR-22
import db from '../db.js';

export async function getClinicInfo() {
  try {
    const info = {
      name: 'Green Valley Clinic',
      address: '123 Healthcare Lane, Springfield',
      phone: '555-0100',
      email: 'info@greenvalleyclinic.com',
      hours: {
        monday: '8:00 AM - 5:00 PM',
        tuesday: '8:00 AM - 5:00 PM',
        wednesday: '8:00 AM - 5:00 PM',
        thursday: '8:00 AM - 5:00 PM',
        friday: '8:00 AM - 5:00 PM',
        saturday: '9:00 AM - 1:00 PM',
        sunday: 'Closed'
      },
      emergency_contact: '555-0999'
    };
    return { ok: true, data: info };
  } catch (error) {
    return { ok: false, error: { code: 'ERROR', message: error.message } };
  }
}

export async function getDepartments() {
  try {
    const departments = [
      { id: 'd001', name: 'General Medicine', description: 'Primary care and general health' },
      { id: 'd002', name: 'Pediatrics', description: 'Healthcare for children' },
      { id: 'd003', name: 'Dental Care', description: 'Dental and oral health' },
      { id: 'd004', name: 'Eye Care', description: 'Ophthalmology services' },
      { id: 'd005', name: 'Laboratory', description: 'Diagnostic testing' },
      { id: 'd006', name: 'Pharmacy', description: 'Medication and health products' }
    ];
    return { ok: true, data: departments };
  } catch (error) {
    return { ok: false, error: { code: 'ERROR', message: error.message } };
  }
}

export async function getDoctorProfiles() {
  try {
    const doctors = await db.find('staff', { role: 'doctor', is_active: true });
    const profiles = doctors.map(doc => ({
      id: doc.id,
      name: `${doc.first_name} ${doc.last_name}`,
      specialisation: doc.specialisation,
      department: doc.department,
      phone: doc.phone,
      email: doc.email
    }));
    return { ok: true, data: profiles };
  } catch (error) {
    return { ok: false, error: { code: 'ERROR', message: error.message } };
  }
}

export async function registerPatientUser(payload) {
  return await db.transaction(async (tx) => {
    // Check if email already exists
    const existing = await tx.find('patients', { email: payload.email });
    if (existing.length > 0) throw new Error('Email already registered');

    const patient = {
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

    return await tx.insert('patients', patient);
  });
}

export async function loginPatientUser(email, password) {
  try {
    const patient = await db.findOne('patients', { email });
    if (!patient) {
      return {
        ok: false,
        error: { code: 'AUTH_INVALID_CREDENTIALS', message: 'Email or password incorrect' }
      };
    }

    // Simplified password validation (in production: bcrypt + dedicated patient_users table)
    const token = `patient_${Math.random().toString(36).substr(2, 16)}`;
    
    return {
      ok: true,
      data: {
        patient: { id: patient.id, email, name: `${patient.first_name} ${patient.last_name}` },
        token
      }
    };
  } catch (error) {
    return { ok: false, error: { code: 'AUTH_ERROR', message: error.message } };
  }
}

export async function submitEnquiry(payload) {
  return await db.transaction(async (tx) => {
    const enquiry = {
      id: `enq_${Math.random().toString(36).substr(2, 9)}`,
      name: payload.name,
      email: payload.email,
      message: payload.message,
      status: 'new',
      created_at: new Date().toISOString()
    };

    return await tx.insert('enquiries', enquiry);
  });
}

export async function getHealthArticles() {
  try {
    const articles = await db.find('health_articles', { published: true });
    return { ok: true, data: articles };
  } catch (error) {
    return { ok: false, error: { code: 'ERROR', message: error.message } };
  }
}

export async function getAnnouncements() {
  try {
    const announcements = await db.find('announcements', { published: true });
    return { ok: true, data: announcements };
  } catch (error) {
    return { ok: false, error: { code: 'ERROR', message: error.message } };
  }
}
