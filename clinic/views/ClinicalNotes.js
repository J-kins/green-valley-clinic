import { Component } from '../../packages/core/src/index.js';


/**
 * ClinicalNotes view for clinic staff.
 * Manage patient clinical notes and observations.
 * @module ClinicalNotes
 */
export class ClinicalNotes extends Component {
  render() {
    return `
      <div class="clinical-notes-container">
        <header class="view-header">
          <h2 class="title">Clinical Notes</h2>
          <button class="btn-primary-gradient" id="new-note-btn">+ New Note</button>
        </header>

        <!-- Filter & Search -->
        <section class="filter-section">
          <div class="card filter-card">
            <input type="search" placeholder="Search patient or notes..." class="search-input" id="notes-search">
            <select class="filter-select" id="doctor-filter">
              <option value="">All Doctors</option>
              <option value="kato">Dr. Kato</option>
              <option value="mugisha">Dr. Mugisha</option>
              <option value="nalwoga">Dr. Nalwoga</option>
            </select>
            <select class="filter-select" id="date-filter">
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </section>

        <!-- Notes List -->
        <section class="notes-section">
          <div class="note-card card">
            <div class="note-header">
              <div class="note-meta">
                <h4 class="note-patient">Alice Nakato (GV-2847)</h4>
                <p class="note-time">Today • 10:30 AM • Dr. Kato</p>
              </div>
              <div class="note-actions">
                <button class="btn-icon">✎</button>
                <button class="btn-icon">⋯</button>
              </div>
            </div>
            <div class="note-content">
              <p>Patient reports feeling well with no new complaints. Vital signs all normal. Continue current treatment plan. Follow-up in 2 weeks.</p>
            </div>
            <div class="note-tags">
              <span class="tag">General</span>
              <span class="tag">Follow-up Required</span>
            </div>
          </div>

          <div class="note-card card">
            <div class="note-header">
              <div class="note-meta">
                <h4 class="note-patient">Brian Okoro (GV-2831)</h4>
                <p class="note-time">Yesterday • 02:15 PM • Dr. Mugisha</p>
              </div>
              <div class="note-actions">
                <button class="btn-icon">✎</button>
                <button class="btn-icon">⋯</button>
              </div>
            </div>
            <div class="note-content">
              <p>Dental examination completed. Minor plaque buildup noted. Recommended professional cleaning. Patient education provided on oral hygiene.</p>
            </div>
            <div class="note-tags">
              <span class="tag">Dental</span>
              <span class="tag">Education Provided</span>
            </div>
          </div>

          <div class="note-card card">
            <div class="note-header">
              <div class="note-meta">
                <h4 class="note-patient">Carol Tumusinde (GV-2789)</h4>
                <p class="note-time">3 days ago • 11:00 AM • Dr. Nalwoga</p>
              </div>
              <div class="note-actions">
                <button class="btn-icon">✎</button>
                <button class="btn-icon">⋯</button>
              </div>
            </div>
            <div class="note-content">
              <p>Pediatric check-up. Child growth on track. Vaccinations up to date. Parents counseled on nutrition. Next visit in 3 months.</p>
            </div>
            <div class="note-tags">
              <span class="tag">Pediatrics</span>
              <span class="tag">Vaccinations</span>
              <span class="tag">Counseling</span>
            </div>
          </div>
        </section>

        <!-- New Note Modal (Hidden by default) -->
        <div id="new-note-modal" class="modal hidden">
          <div class="modal-overlay" id="modal-close"></div>
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Add Clinical Note</h3>
              <button class="btn-icon-close" id="close-modal">✕</button>
            </div>
            <div class="modal-body">
              <div class="field-group">
                <label class="label">Patient</label>
                <input type="text" placeholder="Search patient..." class="input-field">
              </div>

              <div class="field-group mt-16">
                <label class="label">Note Type</label>
                <select class="input-field">
                  <option>General Consultation</option>
                  <option>Follow-up</option>
                  <option>Lab Work</option>
                  <option>Procedure</option>
                  <option>Other</option>
                </select>
              </div>

              <div class="field-group mt-16">
                <label class="label">Clinical Note</label>
                <textarea placeholder="Enter your clinical observations..." class="input-field textarea"></textarea>
              </div>

              <div class="field-group mt-16">
                <label class="label">Tags</label>
                <input type="text" placeholder="Separate with commas..." class="input-field">
              </div>

              <div class="modal-actions">
                <button class="btn-secondary-hifi">Cancel</button>
                <button class="btn-primary-gradient">Save Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  onMount() {
    // New note button
    const newNoteBtn = this.element.querySelector('#new-note-btn');
    const modal = this.element.querySelector('#new-note-modal');
    const closeModal = this.element.querySelector('#close-modal');
    const modalOverlay = this.element.querySelector('#modal-close');

    if (newNoteBtn && modal) {
      newNoteBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
      });
    }

    if (closeModal && modal) {
      closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }

    if (modalOverlay && modal) {
      modalOverlay.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }
  }
}

export default ClinicalNotes;
