class Navigation {
  constructor(nav) {
    this.primaryNav = nav;
    this.menuToggle = document.querySelector('[aria-controls="primary-navigation"]');
    this.menuStatus = this.menuToggle.querySelector('#mobile-nav-status');
    this.navLinks = nav.querySelectorAll('.header__nav-link');

    this.state = {
      isExpanded: false,
      currentLink: 0,
      previousLink: 0,
    }

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('load', () => {
      for (let i = 0; i < this.navLinks.length; i++) {
        this.navLinks[i].addEventListener('click', (e) => this.handleClick(e, i));
      }
    });
    this.menuToggle.addEventListener("click", (e) => this.toggleMenu(e));
  }

  toggleMenu(e) {
    const isExpanded = e.currentTarget.getAttribute("aria-expanded");
    if (isExpanded === "true") {
      this.state = {
        ...this.state,
        isExpanded: false
      }
      this.primaryNav.setAttribute("data-expanded", false);
      this.menuToggle.setAttribute("aria-expanded", false);
      this.menuStatus.textContent = 'Open';
    } else {
      this.state = {
        ...this.state,
        isExpanded: true
      }
      this.primaryNav.setAttribute("data-expanded", true);
      this.menuToggle.setAttribute("aria-expanded", true);
      this.menuStatus.textContent = 'Close';
    }
  }

  handleClick(e, domIndex) {
    e.preventDefault();
    if (this.state.previousLink === domIndex) return;
    const srOnlyText = document.createElement('span');
    srOnlyText.className = 'visually-hidden';
    srOnlyText.textContent = "(current section)";
    if (this.state.previousLink !== null) {
      const prevLink = this.navLinks[this.state.previousLink];
      prevLink.classList.remove('active');
      prevLink.removeChild(prevLink.lastElementChild);
      e.currentTarget.classList.add('active');
      e.currentTarget.appendChild(srOnlyText);
      this.state = {
        ...this.state,
        previousLink: domIndex
      }
    }
  }
}

new Navigation(document.querySelector('#primary-navigation'));