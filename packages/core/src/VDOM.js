/**
 * Simple VDOM-like helper for creating DOM elements
 * @module VDOM
 */

/**
 * Tagged template literal for creating DOM elements from strings
 * @param {TemplateStringsArray} strings - Template parts
 * @param {any[]} values - Dynamic values
 * @returns {HTMLElement} - The resulting DOM element
 */
export const html = (strings, ...values) => {
  const result = strings.reduce((acc, str, i) => {
    let value = values[i];
    
    // Handle array of values
    if (Array.isArray(value)) {
      value = value.join('');
    }
    
    // Handle undefined or null
    if (value === undefined || value === null) {
      value = '';
    }
    
    return acc + str + value;
  }, '');
  
  const temp = document.createElement('div');
  temp.innerHTML = result.trim();
  
  // Return a fragment or the first child
  if (temp.childNodes.length > 1) {
    const fragment = document.createDocumentFragment();
    while (temp.firstChild) {
      fragment.appendChild(temp.firstChild);
    }
    return fragment;
  }
  
  return temp.firstChild;
};

/**
 * Standardize property access for components
 * @param {Object} props - Component properties
 * @returns {string} - Serialized attributes
 */
export const serializeProps = (props = {}) => {
  return Object.entries(props)
    .filter(([_, value]) => typeof value !== 'object' && typeof value !== 'function')
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
};

export default {
  html,
  serializeProps
};
