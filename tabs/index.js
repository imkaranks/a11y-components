class TabList {
  constructor(tabList) {
    this.tabList = tabList;
    this.tabs = tabList.querySelectorAll('[role="tab"]');
    this.tabContainer = tabList.parentNode;
    this.tabPanels = this.tabContainer.querySelectorAll('[role="tabpanel"]');

    this.state = {
      current: 0,
      previous: null,
      focus: 0
    }

    this.addEventListeners();
  }

  addEventListeners() {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.changeTabPanel(index));
    })
    this.tabList.addEventListener('keydown', (e) => {
      e.preventDefault();
      const arrowLeft = 37;
      const arrowUp = 38;
      const arrowRight = 39;
      const arrowDown = 40;
      const { current, focus } = this.state;
      const prevFocus = focus;

      switch (e.keyCode) {
        case arrowUp:
        case arrowLeft:
          this.state = {
            ...this.state,
            previous: prevFocus,
            focus: focus > 0 ? focus - 1 : this.tabs.length - 1,
          }
          break;
        case arrowDown:
        case arrowRight:
          this.state = {
            ...this.state,
            previous: prevFocus,
            focus: focus < this.tabs.length - 1 ? focus + 1 : 0,
          }
          break;
        case 13:
          this.state = {
            ...this.state,
            previous: current,
            current: focus
          }
          this.changeTabPanel();
          break;
      }
      this.changeTabable();
      this.tabs[this.state.focus].focus();
    });
  }

  changeTabable() {
    const { previous, focus } = this.state;
    this.tabs[previous].setAttribute('tabindex', -1);
    this.tabs[focus].setAttribute('tabindex', 0);
  }

  changeTab() {
    const { previous, focus } = this.state;
    this.tabs[previous].setAttribute('aria-selected', false);
    this.tabs[previous].classList.remove('selected');
    this.tabs[focus].setAttribute('aria-selected', true);
    this.tabs[focus].classList.add('selected');
  }

  changeTabPanel(index = null) {
    if (index === this.state.current) return;
    if (index !== null) {
      this.state = {
        current: index,
        previous: this.state.current,
        focus: index
      }
    }
    const { current, previous } = this.state;
    this.changeTab();
    this.changeTabable();
    this.tabPanels[previous].setAttribute('hidden', '');
    this.tabPanels[previous].classList.remove('current');
    this.tabPanels[current].removeAttribute('hidden');
    this.tabPanels[current].classList.remove('current');
  }
}

new TabList(document.querySelector('[role="tablist"]'))