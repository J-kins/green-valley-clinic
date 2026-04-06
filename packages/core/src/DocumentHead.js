/**
 * DocumentHead class for managing dynamic head content
 * @module DocumentHead
 */

export class DocumentHead {
  /**
   * Create a new DocumentHead instance
   * @param {Object} defaultConfig - Default configuration for all pages
   * @param {string} defaultConfig.title - Default title
   * @param {string} defaultConfig.description - Default description
   * @param {string} defaultConfig.charset - Character set
   * @param {string} defaultConfig.viewport - Viewport settings
   * @param {string} defaultConfig.favicon - Favicon path
   * @param {string} defaultConfig.author - Site author
   * @param {Array<Object>} defaultConfig.additionalMeta - Additional meta tags
   * @param {Array<Object>} defaultConfig.additionalLinks - Additional link tags
   */
  constructor(defaultConfig = {}) {
    this.defaultConfig = {
      title: 'My Vanilla App',
      description: 'A vanilla JavaScript application',
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0',
      favicon: '',
      author: 'Clickin',
      additionalMeta: [],
      additionalLinks: [],
      ...defaultConfig
    };

    this.currentConfig = { ...this.defaultConfig };
    this.listeners = new Set();
  }

  /**
   * Set default configuration
   * @param {Object} config - New default configuration
   */
  setDefaultConfig(config) {
    this.defaultConfig = { ...this.defaultConfig, ...config };
    this.currentConfig = { ...this.defaultConfig, ...this.currentConfig };
    this._notifyListeners();
  }

  /**
   * Update current page configuration
   * @param {Object} config - Page-specific configuration
   * @returns {DocumentHead} - Returns this for chaining
   */
  setConfig(config = {}) {
    this.currentConfig = { ...this.defaultConfig, ...config };
    this._notifyListeners();
    return this;
  }

  /**
   * Reset to default configuration
   * @returns {DocumentHead} - Returns this for chaining
   */
  reset() {
    this.currentConfig = { ...this.defaultConfig };
    this._notifyListeners();
    return this;
  }

  /**
   * Subscribe to head changes
   * @param {Function} listener - Callback function when head changes
   * @returns {Function} - Unsubscribe function
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of changes
   * @private
   */
  _notifyListeners() {
    const headHtml = this.render();
    this.listeners.forEach(listener => listener(headHtml, this.currentConfig));
  }

  /**
   * Build meta tags from configuration
   * @private
   * @returns {Array<string>} Array of meta tag strings
   */
  _buildMetaTags() {
    const {
      charset,
      viewport,
      description,
      author,
      keywords,
      robots,
      themeColor,
      ogImage,
      ogType = 'website',
      ogTitle,
      ogDescription,
      twitterCard,
      twitterSite,
      additionalMeta = []
    } = this.currentConfig;

    const metaTags = [
      `<meta charset="${charset}">`,
      `<meta name="viewport" content="${viewport}">`,
      description && `<meta name="description" content="${description}">`,
      author && `<meta name="author" content="${author}">`,
      keywords && `<meta name="keywords" content="${keywords}">`,
      robots && `<meta name="robots" content="${robots}">`,
      themeColor && `<meta name="theme-color" content="${themeColor}">`,
      
      // Open Graph
      `<meta property="og:title" content="${ogTitle || this.currentConfig.title}">`,
      `<meta property="og:description" content="${ogDescription || description}">`,
      `<meta property="og:type" content="${ogType}">`,
      ogImage && `<meta property="og:image" content="${ogImage}">`,
      
      // Twitter Cards
      twitterCard && `<meta name="twitter:card" content="${twitterCard}">`,
      twitterSite && `<meta name="twitter:site" content="${twitterSite}">`,
      
      // Additional meta tags
      ...additionalMeta.map(meta => {
        if (meta.property) {
          return `<meta property="${meta.property}" content="${meta.content}">`;
        }
        return `<meta name="${meta.name}" content="${meta.content}">`;
      })
    ].filter(Boolean);

    return metaTags;
  }

  /**
   * Build link tags from configuration
   * @private
   * @returns {Array<string>} Array of link tag strings
   */
  _buildLinkTags() {
    const {
      favicon,
      canonical,
      stylesheets = [],
      preconnects = [],
      preloads = [],
      additionalLinks = []
    } = this.currentConfig;

    const linkTags = [
      favicon && `<link rel="icon" type="image/x-icon" href="${favicon}">`,
      canonical && `<link rel="canonical" href="${canonical}">`,
      
      // Stylesheets
      ...stylesheets.map(href => `<link rel="stylesheet" href="${href}">`),
      
      // Preconnects
      ...preconnects.map(href => `<link rel="preconnect" href="${href}">`),
      
      // Preloads
      ...preloads.map(({ href, as, type }) => 
        `<link rel="preload" href="${href}" as="${as}"${type ? ` type="${type}"` : ''}>`
      ),
      
      // Additional links
      ...additionalLinks.map(link => {
        const attrs = Object.entries(link)
          .map(([key, value]) => `${key}="${value}"`)
          .join(' ');
        return `<link ${attrs}>`;
      })
    ].filter(Boolean);

    return linkTags;
  }

  /**
   * Build script tags from configuration
   * @private
   * @returns {Array<string>} Array of script tag strings
   */
  _buildScriptTags() {
    const {
      scripts = []
    } = this.currentConfig;

    return scripts.map(script => {
      if (script.src) {
        const attrs = [
          `src="${script.src}"`,
          script.async && 'async',
          script.defer && 'defer',
          script.type && `type="${script.type}"`,
          script.module && 'type="module"'
        ].filter(Boolean).join(' ');
        
        return `<script ${attrs}></script>`;
      } else if (script.content) {
        return `<script>${script.content}</script>`;
      }
      return '';
    }).filter(Boolean);
  }

  /**
   * Render the head as HTML string
   * @param {Object} config - Optional configuration override
   * @returns {string} HTML head string
   */
  render(config = null) {
    const renderConfig = config 
      ? { ...this.defaultConfig, ...config }
      : this.currentConfig;

    // Save current config if not overridden
    if (config) {
      this.currentConfig = { ...renderConfig };
    }

    const title = renderConfig.title || this.defaultConfig.title;
    const metaTags = this._buildMetaTags();
    const linkTags = this._buildLinkTags();
    const scriptTags = this._buildScriptTags();

    const allTags = [...metaTags, ...linkTags, ...scriptTags];

    return `
<head>
  <title>${title}</title>
  ${allTags.map(tag => `  ${tag}`).join('\n')}
</head>`.trim();
  }

  /**
   * Apply head to document (for client-side)
   * @param {Object} config - Configuration to apply
   */
  applyToDocument(config = null) {
    if (typeof document === 'undefined') {
      console.warn('DocumentHead.applyToDocument can only be used in browser environment');
      return;
    }

    const renderConfig = config 
      ? { ...this.defaultConfig, ...config }
      : this.currentConfig;

    // Update title
    document.title = renderConfig.title;

    // Remove existing dynamic meta/link/script tags
    const dynamicTags = document.querySelectorAll('[data-dynamic-head]');
    dynamicTags.forEach(tag => tag.remove());

    // Create new head content
    const headHtml = this.render(config);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headHtml;

    // Add data attribute to identify dynamic tags
    const headChildren = tempDiv.querySelectorAll('head > *');
    headChildren.forEach(tag => {
      tag.setAttribute('data-dynamic-head', 'true');
      document.head.appendChild(tag);
    });

    this._notifyListeners();
  }

  /**
   * Create a page-specific head configuration
   * @param {Object} pageConfig - Page-specific configuration
   * @returns {Function} Function to apply page head
   */
  forPage(pageConfig) {
    return () => this.applyToDocument(pageConfig);
  }

  /**
   * Get current configuration
   * @returns {Object} Current configuration
   */
  getConfig() {
    return { ...this.currentConfig };
  }

  /**
   * Merge additional configuration
   * @param {Object} config - Configuration to merge
   * @returns {DocumentHead} - Returns this for chaining
   */
  merge(config) {
    this.currentConfig = { ...this.currentConfig, ...config };
    this._notifyListeners();
    return this;
  }
}

// Export singleton instance for easy use
export const documentHead = new DocumentHead();

// Default export
export default DocumentHead;
