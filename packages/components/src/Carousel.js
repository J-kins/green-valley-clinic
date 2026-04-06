import { Component } from '../../core/src/index.js';

/**
 * Carousel component
 */
export class Carousel extends Component {
  constructor(props = {}) {
    super(props);
    this.state = { currentIndex: 0 };
  }

  next() {
    const { items = [] } = this.props;
    const nextIndex = (this.state.currentIndex + 1) % items.length;
    this.setState({ currentIndex: nextIndex });
  }

  prev() {
    const { items = [] } = this.props;
    const prevIndex = (this.state.currentIndex - 1 + items.length) % items.length;
    this.setState({ currentIndex: prevIndex });
  }

  render() {
    const { items = [] } = this.props;
    const { currentIndex } = this.state;

    return `
      <div class="carousel">
        <div class="carousel-content">
          ${items[currentIndex]?.content || ''}
        </div>
        <button class="carousel-prev" data-action="prev">←</button>
        <button class="carousel-next" data-action="next">→</button>
      </div>
    `;
  }

  onMount() {
    const prevBtn = this.element.querySelector('.carousel-prev');
    const nextBtn = this.element.querySelector('.carousel-next');
    
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
  }
}

export default Carousel;
