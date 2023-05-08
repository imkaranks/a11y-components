class Carousel {
  constructor($carousel) {
    this.carousel = $carousel;
    this.slideList = $carousel.querySelector('#slideList');
    this.slides = this.slideList.querySelectorAll("[data-slide]");
    this.slideNav = $carousel.querySelector('#slideNav');
    this.slideNavBtns = this.slideNav.querySelectorAll('[data-slide]');
    this.playPauseBtn = $carousel.querySelector("[data-autoslide]");
    this.nextBtn = $carousel.querySelector("#btn-next-slide");
    this.prevBtn = $carousel.querySelector("#btn-prev-slide");

    this.state = {
      currentPosition: 0,
      previousPosition: this.slideList.length - 1,
      slideInterval: null
    }

    this.constants = {
      PREVIOUS: 'PREVIOUS',
      NEXT: 'NEXT'
    }

    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.handleCurrentPosition = this.handleCurrentPosition.bind(this);
    this.handlePreviousPosition = this.handlePreviousPosition.bind(this);
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('load', () => {
      if (!this.state.slideInterval) {
        this.startTransition()
      }
      this.addLiveRegion();
    });

    this.playPauseBtn.addEventListener('click', (e) => {
      if (this.state.slideInterval) {
        this.stopTransition();
        e.currentTarget.setAttribute('data-autoslide', false);
      } else {
        this.startTransition();
        e.currentTarget.setAttribute('data-autoslide', true);
      }
    });

    this.nextBtn.addEventListener('click', () => this.handleClick(this.nextSlide));
    this.prevBtn.addEventListener('click', () => this.handleClick(this.prevSlide));

    this.slideNavBtns.forEach(slideNavBtn => {
      slideNavBtn.addEventListener('click', (e) => {
        const currentPosition = parseInt(e.currentTarget.getAttribute('data-slide'));
        if (currentPosition < this.state.currentPosition) {
          this.handleClick(this.prevSlide)
        } else {
          this.handleClick(this.nextSlide)
        }
      });
    })
  }

  nextSlide() {
    this.handleCurrentPosition({ type: this.constants.NEXT });
    this.slideList.style.transform = `translate(-${this.state.currentPosition*100}%)`;
    this.updateLiveRegion();
    
    this.handlePreviousPosition({ type: this.constants.NEXT });
    this.carousel.setAttribute('data-slide', this.state.currentPosition);
    this.slideNavBtns[this.state.previousPosition].classList.remove('active');
    this.slideNavBtns[this.state.currentPosition].classList.add('active');
  }

  prevSlide() {
    this.handleCurrentPosition({ type: this.constants.PREVIOUS });
    this.slideList.style.transform = `translate(-${this.state.currentPosition*100}%)`;
    this.updateLiveRegion();
    
    this.handlePreviousPosition({ type: this.constants.PREVIOUS });
    this.carousel.setAttribute('data-slide', this.state.currentPosition);
    this.slideNavBtns[this.state.previousPosition].classList.remove('active');
    this.slideNavBtns[this.state.currentPosition].classList.add('active');
  }

  startTransition() {
    if (!this.state.slideInterval) {
      const slideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
      this.state = {
        ...this.state,
        slideInterval
      }
    }
  }

  stopTransition() {
    clearInterval(this.state.slideInterval);
    this.state = {
      ...this.state,
      slideInterval: null
    }
    window.removeEventListener('load', this.startTransition);
  }

  handleClick(callback) {
    if (this.state.slideInterval) {
      this.stopTransition();
      callback();
      this.startTransition();
    } else {
      callback();
    }
  }

  handlePreviousPosition(action) {
    switch (action.type) {
      case this.constants.PREVIOUS:
        this.state = {
          ...this.state,
          previousPosition:
            this.state.currentPosition === this.slides.length - 1
            ? 0
            : this.state.currentPosition + 1
        }
        break;
      case this.constants.NEXT:
        this.state = {
          ...this.state,
          previousPosition:
            this.state.currentPosition === 0
            ? this.slides.length - 1
            : this.state.currentPosition - 1
        }
        break;
    }
  }

  handleCurrentPosition(action) {
    switch (action.type) {
      case this.constants.PREVIOUS:
        this.state = {
          ...this.state,
          currentPosition:
            this.state.currentPosition > 0
            ? this.state.currentPosition - 1
            : this.slides.length-1
        }
        break;
      case this.constants.NEXT:
        this.state = {
          ...this.state,
          currentPosition:
            this.state.currentPosition < this.slides.length-1
            ? this.state.currentPosition + 1
            : 0
        }
        break;
    }
  }

  addLiveRegion() {
    const liveregion = document.createElement('div');
    liveregion.setAttribute('aria-live', 'polite');
    liveregion.setAttribute('aria-atomic', true);
    liveregion.setAttribute('class', 'liveregion visually-hidden');
    this.carousel.appendChild(liveregion);
  }

  updateLiveRegion() {
    document.querySelector('[aria-live="polite"]')
      .textContent = `Slide ${this.state.currentPosition+1} of ${this.slides.length}`;
  }
}

new Carousel(document.querySelector('.carousel'));