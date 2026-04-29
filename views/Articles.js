/**
 * Articles View - Display health articles with search
 */

import { Component } from '../packages/core/src/index.js';
import { renderIcon } from '../packages/components/src/index.js';

export class Articles extends Component {
  constructor(params = {}) {
    super();
    this.params = params;
    this.allArticles = [];
    this.filteredArticles = [];
    this.selectedCategory = 'all';
  }

  render() {
    return `
      <div class="articles-view">
        <nav class="articles-nav">
          <div class="nav-container">
            <h2 class="nav-logo">GVC</h2>
            <div class="nav-links">
              <a href="#home" class="nav-link">Home</a>
              <a href="#services" class="nav-link">Services</a>
              <a href="#articles" class="nav-link active">Articles</a>
            </div>
            <button class="btn-secondary-hifi btn-small" id="back-home">Back Home</button>
          </div>
        </nav>

        <section class="articles-header">
          <h1>Health & Wellness Articles</h1>
          <p>Stay informed with our latest health tips and medical news</p>
        </section>

        <section class="articles-controls">
          <div class="search-bar">
            <input type="text" id="search-articles" placeholder="Search articles..." class="input-field search-input">
            <button id="search-btn" class="btn-icon">${renderIcon('search', { size: 20 })}</button>
          </div>
          
          <div class="category-filters">
            <button class="filter-btn active" data-category="all">All</button>
            <button class="filter-btn" data-category="heart-health">Heart Health</button>
            <button class="filter-btn" data-category="mental-wellness">Mental Wellness</button>
            <button class="filter-btn" data-category="nutrition">Nutrition</button>
            <button class="filter-btn" data-category="fitness">Fitness</button>
          </div>
        </section>

        <!-- Search Results Container -->
        <div class="search-results-panel" id="searchResults" style="display: none;">
          <div class="results-header">
            <h3>Search Results</h3>
            <button class="close-results" id="closeResults">${renderIcon('close', { size: 20 })}</button>
          </div>
          <div class="results-body" id="resultsBody">
            <!-- Results populated here -->
          </div>
        </div>

        <section class="articles-list">
          <div class="articles-grid" id="articles-grid">
            <!-- Articles will be loaded dynamically -->
          </div>
        </section>
      </div>
    `;
  }

  onMount() {
    const backBtn = this.element.querySelector('#back-home');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'home' } }));
      });
    }

    // Load articles
    this.loadArticles();

    // Search functionality
    const searchInput = this.element.querySelector('#search-articles');
    const searchBtn = this.element.querySelector('#search-btn');
    const closeResultsBtn = this.element.querySelector('#closeResults');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => this.performSearch());
    }

    if (closeResultsBtn) {
      closeResultsBtn.addEventListener('click', () => this.closeSearch());
    }

    // Category filters
    const filterBtns = this.element.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-category');
        this.filterByCategory(category);
      });
    });
  }

  loadArticles() {
    const articlesGrid = this.element.querySelector('#articles-grid');
    if (!articlesGrid) return;

    this.allArticles = [
      {
        id: 1,
        title: 'Heart Health Tips',
        excerpt: 'Learn how to maintain a healthy heart with these simple tips.',
        category: 'heart-health',
        date: 'May 15, 2026',
        image: 'heart'
      },
      {
        id: 2,
        title: 'Managing Diabetes',
        excerpt: 'A comprehensive guide to managing type 2 diabetes effectively.',
        category: 'nutrition',
        date: 'May 10, 2026',
        image: 'stethoscope'
      },
      {
        id: 3,
        title: 'Mental Wellness Guide',
        excerpt: 'Tips for improving your mental health and wellbeing.',
        category: 'mental-wellness',
        date: 'May 5, 2026',
        image: 'heart'
      },
      {
        id: 4,
        title: 'Fitness for Beginners',
        excerpt: 'Start your fitness journey with these beginner-friendly exercises.',
        category: 'fitness',
        date: 'April 28, 2026',
        image: 'activity'
      },
      {
        id: 5,
        title: 'Healthy Eating Habits',
        excerpt: 'Discover the basics of nutrition for a healthier lifestyle.',
        category: 'nutrition',
        date: 'April 20, 2026',
        image: 'apple'
      },
      {
        id: 6,
        title: 'Stress Management',
        excerpt: 'Learn practical stress reduction techniques.',
        category: 'mental-wellness',
        date: 'April 15, 2026',
        image: 'heart'
      }
    ];

    this.filteredArticles = this.allArticles;
    this.renderArticles();
  }

  renderArticles() {
    const articlesGrid = this.element.querySelector('#articles-grid');
    if (!articlesGrid) return;

    if (this.filteredArticles.length === 0) {
      articlesGrid.innerHTML = '<p class="no-results">No articles found.</p>';
      return;
    }

    articlesGrid.innerHTML = this.filteredArticles.map(article => `
      <div class="article-card" data-article-id="${article.id}">
        <div class="article-image">${renderIcon(article.image, { size: 60 })}</div>
        <div class="article-content">
          <span class="article-category">${article.category.replace('-', ' ')}</span>
          <h3>${article.title}</h3>
          <p>${article.excerpt}</p>
          <small class="article-date">${article.date}</small>
        </div>
        <button class="read-more-btn" data-article-id="${article.id}">Read More →</button>
      </div>
    `).join('');

    // Add click handlers
    const articleCards = this.element.querySelectorAll('.article-card');
    const readMoreBtns = this.element.querySelectorAll('.read-more-btn');

    articleCards.forEach(card => {
      card.addEventListener('click', () => {
        const articleId = card.getAttribute('data-article-id');
        window.dispatchEvent(new CustomEvent('navigate', { 
          detail: { route: 'article-details', params: { articleId } } 
        }));
      });
    });

    readMoreBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const articleId = btn.getAttribute('data-article-id');
        window.dispatchEvent(new CustomEvent('navigate', { 
          detail: { route: 'article-details', params: { articleId } } 
        }));
      });
    });
  }

  handleSearch(query) {
    if (!query || query.length < 2) {
      this.closeSearch();
      return;
    }

    const results = this.allArticles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length > 0) {
      this.displaySearchResults(results, query);
    }
  }

  performSearch() {
    const searchInput = this.element.querySelector('#search-articles');
    if (searchInput) {
      this.handleSearch(searchInput.value);
    }
  }

  displaySearchResults(results, query) {
    const resultsPanel = this.element.querySelector('#searchResults');
    const resultsBody = this.element.querySelector('#resultsBody');

    if (!resultsPanel || !resultsBody) return;

    resultsBody.innerHTML = results.map(article => `
      <div class="result-item" data-article-id="${article.id}">
        <h4>${article.title}</h4>
        <p>${article.excerpt}</p>
        <small>${article.category} • ${article.date}</small>
      </div>
    `).join('');

    resultsPanel.style.display = 'flex';

    const resultItems = this.element.querySelectorAll('.result-item');
    resultItems.forEach(item => {
      item.addEventListener('click', () => {
        const articleId = item.getAttribute('data-article-id');
        window.dispatchEvent(new CustomEvent('navigate', { 
          detail: { route: 'article-details', params: { articleId } } 
        }));
        this.closeSearch();
      });
    });
  }

  closeSearch() {
    const resultsPanel = this.element.querySelector('#searchResults');
    if (resultsPanel) resultsPanel.style.display = 'none';
  }

  filterByCategory(category) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredArticles = this.allArticles;
    } else {
      this.filteredArticles = this.allArticles.filter(article => article.category === category);
    }
    this.renderArticles();
  }
}

export default Articles;
