import { renderIcon } from '../../packages/components/src/index.js';
import { Component } from '../../packages/core/src/index.js';


/**
 * Pharmacy view for the mobile patient portal.
 * @module Pharmacy
 */
export class Pharmacy extends Component {
  render() {
    const products = [
      { id: 1, name: 'Panadol Advance', price: 'UGX 5,000', category: 'Pain Relief', type: 'mint' },
      { id: 2, name: 'Amoxicillin', price: 'UGX 12,000', category: 'Antibiotics', type: 'peach' },
      { id: 3, name: 'Vitamin C Syrup', price: 'UGX 8,000', category: 'Supplements', type: 'lavender' },
      { id: 4, name: 'Insulin Pen', price: 'UGX 45,000', category: 'Diabetes', type: 'yellow' }
    ];

    return `
      <div class="mobile-view pharmacy-view">
        <header class="mobile-header">
           <h2 class="h2">Pharmacy</h2>
           <p class="small">Order medication and healthcare products</p>
        </header>
       <section class="pharmacy-search mt-16">
          <div class="mobile-search-wrapper">
            <span class="icon-search">${renderIcon('search', { size: 18 })}</span>
            <input type="text" placeholder="Search medicines..." class="mobile-input">
          </div>
        </section>

        <section class="categories-scroll mt-16">
          <div class="scroll-container">
            <span class="chip active">All</span>
            <span class="chip status-mint">Pain Relief</span>
            <span class="chip status-peach">Antibiotics</span>
            <span class="chip status-lavender">Supplements</span>
          </div>
        </section>

        <section class="products-list mt-24">
          ${products.map(p => `
            <div class="card product-card mt-12 grad-${p.type}">
              <div class="product-info">
                <span class="label">${p.name}</span>
                <span class="tiny">${p.category}</span>
                <span class="body bold mt-8">${p.price}</span>
              </div>
              <button class="btn-add-cart">+</button>
            </div>
          `).join('')}
        </section>
      </div>
    `;
  }
}

export default Pharmacy;
