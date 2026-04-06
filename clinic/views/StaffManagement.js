import { Component } from '../../packages/core/src/index.js';

/**
 * StaffManagement view matching SVG 13 for "Onboarding" and team directory.
 * @module StaffManagement
 */
export class StaffManagement extends Component {
  render() {
    const staff = [
      { id: 'GV-01', name: 'Dr. Kato', role: 'Doctor', dept: 'General', status: 'Active', statusType: 'success' },
      { id: 'GV-02', name: 'Dr. Mugisha', role: 'Doctor', dept: 'Dental', status: 'Active', statusType: 'success' },
      { id: 'GV-03', name: 'Nalwoga', role: 'Doctor', dept: 'Pediatrics', status: 'On leave', statusType: 'warning' },
      { id: 'GV-07', name: 'Ritah', role: 'Receptionist', dept: 'Front desk', status: 'Active', statusType: 'success' },
      { id: 'GV-10', name: 'Peter', role: 'IT Admin', dept: 'Systems', status: 'Limited', statusType: 'danger' }
    ];

    return `
      <div class="staff-management-view dashboard-view-container">
        <header class="view-header">
           <h2 class="title">Staff Management</h2>
           <p class="small dim">Manage team roles, departments and current status</p>
        </header>

        <section class="staff-stats-grid mt-24">
           <div class="card stat-card stat-primary">
              <div class="stat-info">
                 <span class="stat-value">12</span>
                 <span class="stat-label">Doctors</span>
              </div>
              <div class="stat-icon-wrapper"><div class="stat-icon"></div></div>
           </div>
           
           <div class="card stat-card stat-peach">
              <div class="stat-info">
                 <span class="stat-value">5</span>
                 <span class="stat-label">Receptionists</span>
              </div>
              <div class="stat-icon-wrapper"><div class="stat-icon"></div></div>
           </div>

           <div class="card stat-card stat-lavender">
              <div class="stat-info">
                 <span class="stat-value">2</span>
                 <span class="stat-label">IT Admin</span>
              </div>
              <div class="stat-icon-wrapper"><div class="stat-icon"></div></div>
           </div>

           <div class="add-staff-container">
              <button class="btn-primary-gradient full-height">Add staff member</button>
           </div>
        </section>

        <section class="card directory-card mt-32">
           <h3 class="h3">Team directory</h3>
           
           <div class="dashboard-table-wrapper mount-table mt-16">
              <div class="dashboard-table-row header">
                 <span>Staff ID</span>
                 <span>Name</span>
                 <span>Role</span>
                 <span>Department</span>
                 <span>Status</span>
                 <span>Action</span>
              </div>
              
              ${staff.map(mem => `
                 <div class="dashboard-table-row">
                    <span class="small bold">${mem.id}</span>
                    <span class="body">${mem.name}</span>
                    <span class="small">${mem.role}</span>
                    <span class="small">${mem.dept}</span>
                    <span class="chip status-${mem.statusType}">${mem.status}</span>
                    <span class="button-link">Edit</span>
                 </div>
              `).join('')}
           </div>
        </section>
      </div>
    `;
  }
}

export default StaffManagement;
