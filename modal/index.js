class Modal {
  constructor(modal) {
    this.$modalWrapper = modal;
    this.$mainContent = document.querySelector('[role="main"]');
    this.$modalTitle = modal.querySelector('#modal-title');
    this.$modalOpenBtn = this.$mainContent.querySelector('#modal-open-button');
    this.$modalCloseBtn = modal.querySelector('#modal-close-button');

    this.addEventListeners();
  }

  addEventListeners() {
    this.$modalOpenBtn.addEventListener('click', () => this.open());

    this.$modalCloseBtn.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (ev) => {
      if (ev.key.toLowerCase() === 'escape') {
        this.close();
      }
    });
  }

  open() {
    this.$mainContent.setAttribute('aria-hidden', true);
    this.$modalWrapper.setAttribute('aria-hidden', false);
    this.$modalWrapper.style.display = 'block';
    this.$modalTitle.focus();
    this.deflectFocus();
  }

  close() {
    this.$mainContent.setAttribute('aria-hidden', false);
    this.$modalWrapper.setAttribute('aria-hidden', true);
    this.$modalWrapper.style.display = 'none';
    this.$modalOpenBtn.focus();
  }

  deflectFocus() {
    this.$mainContent.addEventListener('focusin', () => {
      this.$modalCloseBtn.focus();
    });
  }
}

new Modal(document.getElementById('modal'));