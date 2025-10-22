class TestimonialsSlider {
  constructor() {
    this.cards = document.querySelectorAll(
      '.testimonials__card:not(.testimonials__card2)'
    );
    this.dots = document.querySelectorAll('.dot');
    this.arrowTop = document.getElementById('arrow-top');
    this.arrowBottom = document.getElementById('arrow-bottom');
    this.currentIndex = 0;
    this.isAnimating = false;

    this.init();
  }

  init() {
    // Показываем первую карточку сразу
    this.showCard(this.currentIndex, true);

    this.arrowTop.addEventListener('click', () => this.previousCard());
    this.arrowBottom.addEventListener('click', () => this.nextCard());

    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToCard(index));
    });
  }

  showCard(index, immediate = false) {
    if (this.isAnimating) return;
    if (index === this.currentIndex && !immediate) return;

    // ОПРЕДЕЛЯЕМ НАПРАВЛЕНИЕ ПЕРЕХОДА
    const direction = index > this.currentIndex ? 'right' : 'left';
    this.animateTransition(this.currentIndex, index, direction);
    this.updateDots(index);
    this.currentIndex = index;
  }

  nextCard() {
    const nextIndex = (this.currentIndex + 1) % this.cards.length;
    this.showCard(nextIndex);
  }

  previousCard() {
    const prevIndex =
      (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.showCard(prevIndex);
  }

  goToCard(index) {
    if (index !== this.currentIndex) {
      this.showCard(index);
    }
  }

  animateTransition(fromIndex, toIndex, direction) {
    this.isAnimating = true;

    // Убираем текущую карточку с анимацией в нужном направлении
    if (this.cards[fromIndex]) {
      const slideOutClass =
        direction === 'right' ? 'slide-out-left' : 'slide-out-right';
      this.cards[fromIndex].classList.add(slideOutClass);
    }

    // Подготавливаем новую карточку с начальной позицией
    const slideInClass =
      direction === 'right' ? 'slide-in-right' : 'slide-in-left';
    this.cards[toIndex].classList.add(slideInClass);
    this.cards[toIndex].classList.add('active');

    // Даем время для применения начальных стилей
    setTimeout(() => {
      this.cards[toIndex].classList.remove(slideInClass);
    }, 10);

    // Завершаем анимацию
    setTimeout(() => {
      this.cards.forEach((card) => {
        card.classList.remove(
          'active',
          'slide-out-left',
          'slide-out-right',
          'slide-in-left',
          'slide-in-right'
        );
      });

      this.cards[toIndex].classList.add('active');
      this.isAnimating = false;
    }, 500);
  }

  updateDots(activeIndex) {
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialsSlider();
});
