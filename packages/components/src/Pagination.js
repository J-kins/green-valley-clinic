import { Component } from '../../core/src/index.js';

/**
 * Pagination component
 */
export class Pagination extends Component {
  constructor(props = {}) {
    super(props);
    this.state = { currentPage: 1 };
  }

  goToPage(page) {
    const { totalPages = 1 } = this.props;
    if (page >= 1 && page <= totalPages) {
      this.setState({ currentPage: page });
    }
  }

  render() {
    const { totalPages = 5 } = this.props;
    const { currentPage } = this.state;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return `
      <nav class="pagination" aria-label="Pagination">
        <button class="pagination-prev" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>
        ${pages.map(page => `
          <button class="pagination-page ${page === currentPage ? 'active' : ''}" data-page="${page}">
            ${page}
          </button>
        `).join('')}
        <button class="pagination-next" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
      </nav>
    `;
  }

  onMount() {
    const pageButtons = this.element.querySelectorAll('.pagination-page');
    const prevBtn = this.element.querySelector('.pagination-prev');
    const nextBtn = this.element.querySelector('.pagination-next');

    pageButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.getAttribute('data-page'));
        this.goToPage(page);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.goToPage(this.state.currentPage - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.goToPage(this.state.currentPage + 1));
    }
  }
}

export default Pagination;
