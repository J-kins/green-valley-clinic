import { Component } from '../../core/src/index.js';
import { renderIcon } from './Icons.js';

/**
 * StatCard component showing numbers and labels.
 * @module StatCard
 */
export class StatCard extends Component {
  render() {
    const { 
      value = '0', 
      label = 'Stat', 
      type = 'primary', 
      icon = 'check' 
    } = this.props;

    return `
      <div class="stat-card stat-${type}">
        <div class="stat-info">
          <span class="stat-value">${value}</span>
          <span class="stat-label">${label}</span>
        </div>
        <div class="stat-icon-wrapper">
          <div class="stat-icon icon-${icon}">${renderIcon(icon, { size: 16 })}</div>
        </div>
      </div>
    `;
  }
}

export default StatCard;
