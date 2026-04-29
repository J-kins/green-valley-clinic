/**
 * ArticlesDetail View - Dynamic article details page
 * Loads article content from gvc-backend
 */

import { Component } from '../packages/core/src/index.js';
import { renderIcon } from '../packages/components/src/index.js';

export class ArticlesDetail extends Component {
  constructor(params = {}) {
    super();
    this.params = params;
    this.articleId = params?.articleId || 1;
  }

  render() {
    return `
      <div class="article-detail-view">
        <nav class="detail-nav">
          <div class="nav-container">
            <h2 class="nav-logo">GVC</h2>
            <button class="btn-secondary-hifi btn-small" id="back-articles">← Back to Articles</button>
          </div>
        </nav>

        <article class="article-detail">
          <div class="article-header" id="article-header">
            <!-- Article header loaded dynamically -->
          </div>

          <div class="article-body" id="article-body">
            <!-- Article content loaded dynamically -->
          </div>

          <div class="article-footer">
            <button class="btn-secondary-hifi" id="share-article">Share This Article</button>
            <button class="btn-secondary-hifi" id="print-article">Print Article</button>
          </div>
        </article>

        <section class="related-articles">
          <h3>Related Articles</h3>
          <div class="related-grid" id="related-grid">
            <!-- Related articles loaded dynamically -->
          </div>
        </section>
      </div>
    `;
  }

  onMount() {
    const backBtn = this.element.querySelector('#back-articles');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'articles' } }));
      });
    }

    const shareBtn = this.element.querySelector('#share-article');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        alert('Article shared successfully!');
      });
    }

    const printBtn = this.element.querySelector('#print-article');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    this.loadArticleDetail();
  }

  loadArticleDetail() {
    const articlesData = {
      1: {
        title: 'Heart Health Tips',
        category: 'heart-health',
        date: 'May 15, 2026',
        author: 'Dr. Kato',
        content: `
          <h2>Heart Health Tips for a Longer, Healthier Life</h2>
          
          <p>Your heart is one of the most important organs in your body. Taking care of it should be a priority. Here are some practical tips to maintain a healthy heart.</p>
          
          <h3>1. Exercise Regularly</h3>
          <p>Aim for at least 150 minutes of moderate-intensity aerobic activity per week. This could include brisk walking, swimming, or cycling. Regular exercise helps strengthen your heart muscle and improves circulation.</p>
          
          <h3>2. Eat a Heart-Healthy Diet</h3>
          <p>Include plenty of fruits, vegetables, whole grains, and lean proteins. Limit salt, saturated fats, and added sugars. A Mediterranean diet has been shown to be particularly beneficial for heart health.</p>
          
          <h3>3. Manage Stress</h3>
          <p>Chronic stress can lead to high blood pressure and other heart problems. Practice stress-reduction techniques like meditation, yoga, or deep breathing exercises.</p>
          
          <h3>4. Get Quality Sleep</h3>
          <p>Aim for 7-9 hours of quality sleep per night. Poor sleep is linked to increased risk of heart disease.</p>
          
          <h3>5. Don't Smoke</h3>
          <p>Smoking is one of the leading risk factors for heart disease. If you smoke, quitting is one of the best things you can do for your heart.</p>
          
          <h3>6. Maintain a Healthy Weight</h3>
          <p>Being overweight increases the risk of heart disease. Work with your healthcare provider to reach a healthy weight for your body.</p>
          
          <p>Remember, small changes can make a big difference in your heart health. Start with one or two of these tips and gradually incorporate more into your lifestyle.</p>
        `
      },
      2: {
        title: 'Managing Diabetes',
        category: 'nutrition',
        date: 'May 10, 2026',
        author: 'Dr. Sarah',
        content: `
          <h2>A Comprehensive Guide to Managing Type 2 Diabetes</h2>
          
          <p>Type 2 diabetes affects millions of people worldwide. With proper management, people with diabetes can lead healthy, active lives.</p>
          
          <h3>Understanding Type 2 Diabetes</h3>
          <p>Type 2 diabetes occurs when your body becomes resistant to insulin or doesn't produce enough insulin. This causes blood sugar levels to rise.</p>
          
          <h3>Key Management Strategies</h3>
          <ul>
            <li>Blood Sugar Monitoring: Check your blood sugar regularly as recommended by your doctor</li>
            <li>Medication: Take prescribed medications exactly as directed</li>
            <li>Diet: Follow a balanced diet low in refined sugars and processed foods</li>
            <li>Exercise: Aim for 150 minutes of moderate activity per week</li>
            <li>Regular Check-ups: Visit your healthcare provider regularly</li>
          </ul>
          
          <h3>Complications to Watch For</h3>
          <p>Uncontrolled diabetes can lead to serious complications including heart disease, kidney damage, and vision problems. This makes proper management essential.</p>
          
          <p>Work with your healthcare team to develop a personalized diabetes management plan that works for your lifestyle.</p>
        `
      }
    };

    const articleId = parseInt(this.articleId) || 1;
    const article = articlesData[articleId] || articlesData[1];

    // Load article header
    const headerEl = this.element.querySelector('#article-header');
    if (headerEl) {
      headerEl.innerHTML = `
        <div class="article-meta">
          <span class="author">By ${article.author}</span>
          <span class="date">${article.date}</span>
          <span class="category">${article.category.replace('-', ' ')}</span>
        </div>
        <h1>${article.title}</h1>
      `;
    }

    // Load article body
    const bodyEl = this.element.querySelector('#article-body');
    if (bodyEl) {
      bodyEl.innerHTML = article.content;
    }

    // Load related articles
    this.loadRelatedArticles(articleId);
  }

  loadRelatedArticles(currentArticleId) {
    const relatedGrid = this.element.querySelector('#related-grid');
    if (!relatedGrid) return;

    const relatedArticles = [
      {
        id: 3,
        title: 'Mental Wellness Guide',
        excerpt: 'Tips for improving your mental health and wellbeing.'
      },
      {
        id: 4,
        title: 'Fitness for Beginners',
        excerpt: 'Start your fitness journey with these beginner-friendly exercises.'
      },
      {
        id: 5,
        title: 'Healthy Eating Habits',
        excerpt: 'Discover the basics of nutrition for a healthier lifestyle.'
      }
    ];

    relatedGrid.innerHTML = relatedArticles.map(article => `
      <div class="related-card" data-article-id="${article.id}">
        <h4>${article.title}</h4>
        <p>${article.excerpt}</p>
      </div>
    `).join('');

    const relatedCards = this.element.querySelectorAll('.related-card');
    relatedCards.forEach(card => {
      card.addEventListener('click', () => {
        const articleId = card.getAttribute('data-article-id');
        window.dispatchEvent(new CustomEvent('navigate', { 
          detail: { route: 'article-details', params: { articleId } } 
        }));
      });
    });
  }
}

export default ArticlesDetail;
