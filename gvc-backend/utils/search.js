/**
 * Search Utility Module
 * Provides cross-table search, filtering, and ranking capabilities
 * Integrated with the GVC mock backend (db.js)
 */

import db from '../db.js';

/**
 * Perform a global multi-table search
 * @param {string} query - Search query string
 * @param {string[]} tables - Tables to search in
 * @param {string[]} fields - Fields to search within
 * @returns {Promise<Array>} Combined search results with relevance ranking
 */
export async function globalSearch(query, tables = [], fields = []) {
    console.log('[v0] Global search:', { query, tables, fields });
    
    if (!query || query.trim().length === 0) {
        return [];
    }

    const searchTerm = query.toLowerCase();
    const results = [];

    // Default tables and fields if not specified
    const defaultConfig = {
        patients: ['first_name', 'last_name', 'mrn', 'email', 'phone'],
        staff: ['first_name', 'last_name', 'username', 'email', 'department'],
        appointments: ['reason', 'confirmation_ref', 'notes'],
        medical_records: ['diagnosis', 'notes', 'record_type']
    };

    const tablesToSearch = tables.length > 0 ? tables : Object.keys(defaultConfig);
    
    for (const table of tablesToSearch) {
        if (!db._tables[table]) continue;

        const searchFields = fields.length > 0 ? fields : (defaultConfig[table] || []);
        const rows = db._tables[table];

        for (const row of rows) {
            let relevanceScore = 0;
            let matchedFields = [];

            // Score each field match
            for (const field of searchFields) {
                const value = row[field];
                if (!value) continue;

                const fieldValue = String(value).toLowerCase();
                
                // Exact match scores highest
                if (fieldValue === searchTerm) {
                    relevanceScore += 100;
                    matchedFields.push(field);
                }
                // Starts with match
                else if (fieldValue.startsWith(searchTerm)) {
                    relevanceScore += 50;
                    matchedFields.push(field);
                }
                // Contains match
                else if (fieldValue.includes(searchTerm)) {
                    relevanceScore += 25;
                    matchedFields.push(field);
                }
            }

            // Include result if it has matches
            if (relevanceScore > 0) {
                results.push({
                    table,
                    record: row,
                    relevanceScore,
                    matchedFields: [...new Set(matchedFields)]
                });
            }
        }
    }

    // Sort by relevance score (highest first)
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Search patients by query
 * @param {string} query - Search term (name, MRN, email, phone)
 * @returns {Promise<Array>} Matching patient records
 */
export async function searchPatients(query) {
    console.log('[v0] Patient search:', query);
    const results = await globalSearch(
        query,
        ['patients'],
        ['first_name', 'last_name', 'mrn', 'email', 'phone']
    );
    return results.map(r => r.record);
}

/**
 * Search staff by query
 * @param {string} query - Search term (name, username, email, department)
 * @returns {Promise<Array>} Matching staff records
 */
export async function searchStaff(query) {
    console.log('[v0] Staff search:', query);
    const results = await globalSearch(
        query,
        ['staff'],
        ['first_name', 'last_name', 'username', 'email', 'department']
    );
    return results.map(r => r.record);
}

/**
 * Search appointments by query
 * @param {string} query - Search term (reason, confirmation ref, notes)
 * @returns {Promise<Array>} Matching appointment records with patient/doctor details
 */
export async function searchAppointments(query) {
    console.log('[v0] Appointment search:', query);
    const results = await globalSearch(
        query,
        ['appointments'],
        ['reason', 'confirmation_ref', 'notes']
    );
    
    // Enrich with related patient and doctor data
    return results.map(r => ({
        ...r.record,
        patient: db.find('patients', { id: r.record.patient_id })?.[0],
        doctor: db.find('staff', { id: r.record.doctor_id })?.[0]
    }));
}

/**
 * Advanced filtering for appointments
 * @param {Object} filters - Filter criteria
 * @returns {Promise<Array>} Filtered appointments
 */
export async function filterAppointments(filters = {}) {
    console.log('[v0] Filter appointments:', filters);
    
    const appointments = db._tables.appointments || [];
    let filtered = [...appointments];

    // Filter by date range
    if (filters.dateFrom) {
        filtered = filtered.filter(a => new Date(a.appointment_date) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
        filtered = filtered.filter(a => new Date(a.appointment_date) <= new Date(filters.dateTo));
    }

    // Filter by status
    if (filters.status) {
        filtered = filtered.filter(a => a.status === filters.status);
    }

    // Filter by doctor
    if (filters.doctor_id) {
        filtered = filtered.filter(a => a.doctor_id === filters.doctor_id);
    }

    // Filter by patient
    if (filters.patient_id) {
        filtered = filtered.filter(a => a.patient_id === filters.patient_id);
    }

    // Filter by department
    if (filters.department) {
        filtered = filtered.filter(a => a.department === filters.department);
    }

    return filtered;
}

/**
 * Quick search with autocomplete
 * Returns limited results for autocomplete dropdowns
 * @param {string} query - Partial search query
 * @param {string} type - Search type: 'patients', 'staff', 'appointments'
 * @param {number} limit - Max results to return
 * @returns {Promise<Array>} Limited matching results
 */
export async function quickSearch(query, type = 'patients', limit = 5) {
    console.log('[v0] Quick search:', { query, type, limit });
    
    if (!query || query.length < 1) return [];

    let searchFn;
    switch (type) {
        case 'staff':
            searchFn = searchStaff;
            break;
        case 'appointments':
            searchFn = searchAppointments;
            break;
        case 'patients':
        default:
            searchFn = searchPatients;
    }

    const results = await searchFn(query);
    return results.slice(0, limit);
}

export default {
    globalSearch,
    searchPatients,
    searchStaff,
    searchAppointments,
    filterAppointments,
    quickSearch
};
