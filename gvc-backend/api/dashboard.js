/**
 * Dashboard API (FR-13, FR-14)
 * Provides analytics, statistics, and reporting for staff dashboards
 * All data is computed from the mock database tables
 */

import db from '../db.js';

/**
 * Get dashboard statistics and KPIs
 * Includes appointment counts, patient metrics, staff utilization
 * @returns {Promise<Object>} Dashboard stats
 */
export async function getDashboardStats() {
    console.log('[v0] Computing dashboard statistics...');
    
    try {
        const appointments = db._tables.appointments || [];
        const patients = db._tables.patients || [];
        const staff = db._tables.staff || [];
        const medicalRecords = db._tables.medical_records || [];
        
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const thisYear = new Date(now.getFullYear(), 0, 1);

        // Appointment metrics
        const todayAppts = appointments.filter(a => {
            const apptDate = new Date(a.appointment_date);
            return apptDate.getTime() === today.getTime();
        });

        const monthAppts = appointments.filter(a => {
            const apptDate = new Date(a.appointment_date);
            return apptDate >= thisMonth && apptDate <= now;
        });

        const yearAppts = appointments.filter(a => {
            const apptDate = new Date(a.appointment_date);
            return apptDate >= thisYear && apptDate <= now;
        });

        // Status breakdown
        const statusBreakdown = {
            scheduled: appointments.filter(a => a.status === 'scheduled').length,
            confirmed: appointments.filter(a => a.status === 'confirmed').length,
            completed: appointments.filter(a => a.status === 'completed').length,
            cancelled: appointments.filter(a => a.status === 'cancelled').length,
            no_show: appointments.filter(a => a.status === 'no_show').length
        };

        // Department metrics
        const departments = [...new Set(appointments.map(a => a.department).filter(Boolean))];
        const departmentStats = {};
        departments.forEach(dept => {
            departmentStats[dept] = {
                total: appointments.filter(a => a.department === dept).length,
                completed: appointments.filter(a => a.department === dept && a.status === 'completed').length,
                pending: appointments.filter(a => a.department === dept && (a.status === 'scheduled' || a.status === 'confirmed')).length
            };
        });

        // Doctor utilization
        const doctors = staff.filter(s => s.role === 'doctor');
        const doctorStats = doctors.map(doctor => ({
            id: doctor.id,
            name: `${doctor.first_name} ${doctor.last_name}`,
            specialisation: doctor.specialisation,
            appointments_this_month: monthAppts.filter(a => a.doctor_id === doctor.id).length,
            patients_served: new Set(appointments.filter(a => a.doctor_id === doctor.id).map(a => a.patient_id)).size,
            completed_appointments: appointments.filter(a => a.doctor_id === doctor.id && a.status === 'completed').length
        }));

        // Patient metrics
        const activePatients = new Set(appointments.map(a => a.patient_id)).size;
        const recentPatients = patients.filter(p => {
            const createdDate = new Date(p.created_at);
            return createdDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        }).length;

        // Medical records metrics
        const recordsByType = {};
        medicalRecords.forEach(record => {
            recordsByType[record.record_type] = (recordsByType[record.record_type] || 0) + 1;
        });

        const stats = {
            ok: true,
            data: {
                timestamp: new Date().toISOString(),
                appointments: {
                    today: todayAppts.length,
                    this_month: monthAppts.length,
                    this_year: yearAppts.length,
                    total: appointments.length,
                    status_breakdown: statusBreakdown
                },
                patients: {
                    active: activePatients,
                    total: patients.length,
                    new_this_month: recentPatients
                },
                staff: {
                    total: staff.length,
                    doctors: doctors.length,
                    receptionist: staff.filter(s => s.role === 'receptionist').length,
                    admin: staff.filter(s => s.role === 'admin').length
                },
                departments: departmentStats,
                doctor_utilization: doctorStats,
                medical_records: {
                    total: medicalRecords.length,
                    by_type: recordsByType
                },
                key_metrics: {
                    appointment_completion_rate: appointments.length > 0 
                        ? ((statusBreakdown.completed / appointments.length) * 100).toFixed(2) + '%'
                        : '0%',
                    no_show_rate: appointments.length > 0 
                        ? ((statusBreakdown.no_show / appointments.length) * 100).toFixed(2) + '%'
                        : '0%',
                    patients_per_doctor: doctors.length > 0 
                        ? (activePatients / doctors.length).toFixed(2)
                        : 0
                }
            }
        };

        console.log('[v0] Dashboard stats computed:', stats);
        return stats;
    } catch (error) {
        console.error('[v0] Dashboard stats error:', error);
        return {
            ok: false,
            error: {
                code: 'STATS_ERROR',
                message: 'Failed to compute dashboard statistics'
            }
        };
    }
}

/**
 * Generate a report with custom filters
 * @param {Object} params - Report parameters
 *   - type: 'appointments'|'patients'|'revenue'|'staff_utilization'
 *   - date_from, date_to: Date range
 *   - department: Filter by department
 *   - doctor_id: Filter by doctor
 * @returns {Promise<Object>} Report data
 */
export async function generateReport(params = {}) {
    console.log('[v0] Generating report:', params);
    
    try {
        const { type = 'appointments', date_from, date_to, department, doctor_id } = params;
        
        let reportData = [];
        const appointments = db._tables.appointments || [];

        // Apply date filters
        let filtered = appointments;
        if (date_from) {
            filtered = filtered.filter(a => new Date(a.appointment_date) >= new Date(date_from));
        }
        if (date_to) {
            filtered = filtered.filter(a => new Date(a.appointment_date) <= new Date(date_to));
        }
        if (department) {
            filtered = filtered.filter(a => a.department === department);
        }
        if (doctor_id) {
            filtered = filtered.filter(a => a.doctor_id === doctor_id);
        }

        switch (type) {
            case 'appointments': {
                reportData = filtered.map(a => {
                    const patient = db.find('patients', { id: a.patient_id })?.[0];
                    const doctor = db.find('staff', { id: a.doctor_id })?.[0];
                    return {
                        date: a.appointment_date,
                        confirmation_ref: a.confirmation_ref,
                        patient_name: patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown',
                        doctor_name: doctor ? `${doctor.first_name} ${doctor.last_name}` : 'Unknown',
                        department: a.department,
                        status: a.status,
                        duration: a.duration_mins
                    };
                });
                break;
            }

            case 'patients': {
                const patients = db._tables.patients || [];
                reportData = patients.map(p => ({
                    mrn: p.mrn,
                    name: `${p.first_name} ${p.last_name}`,
                    dob: p.dob,
                    phone: p.phone,
                    email: p.email,
                    blood_type: p.blood_type,
                    allergies: (p.allergies || []).join(', '),
                    appointments_count: appointments.filter(a => a.patient_id === p.id).length
                }));
                break;
            }

            case 'staff_utilization': {
                const staff = db._tables.staff || [];
                reportData = staff.map(s => ({
                    name: `${s.first_name} ${s.last_name}`,
                    role: s.role,
                    department: s.department,
                    appointments: appointments.filter(a => a.doctor_id === s.id).length,
                    status: s.is_active ? 'Active' : 'Inactive'
                }));
                break;
            }

            default:
                return {
                    ok: false,
                    error: {
                        code: 'INVALID_REPORT_TYPE',
                        message: `Report type '${type}' not supported`
                    }
                };
        }

        const report = {
            ok: true,
            data: {
                type,
                generated_at: new Date().toISOString(),
                filters: { date_from, date_to, department, doctor_id },
                row_count: reportData.length,
                rows: reportData
            }
        };

        console.log('[v0] Report generated:', report);
        return report;
    } catch (error) {
        console.error('[v0] Report generation error:', error);
        return {
            ok: false,
            error: {
                code: 'REPORT_ERROR',
                message: 'Failed to generate report'
            }
        };
    }
}

export default {
    getDashboardStats,
    generateReport
};
