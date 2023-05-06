class Accordion {
  constructor(el) {
    this.el = el;
    this.control = el.querySelector('[aria-expanded]');
    this.content = el.querySelector('[aria-hidden]');

    this.control.addEventListener('click', () => this.onClick());
  }

  onClick() {
    const isExpanded = this.control.getAttribute('aria-expanded');

    if (isExpanded === 'false') {
      this.control.setAttribute('aria-expanded', true);
      this.content.setAttribute('aria-hidden', false);
    } else {
      this.control.setAttribute('aria-expanded', false);
      this.content.setAttribute('aria-hidden', true);
    }
  }
}

document.querySelectorAll('.accordion-list__item')
  .forEach(accordion => new Accordion(accordion));