class BugFactory {
  height = 0;
  width = 0;
  clickCallback = null;
  bugCount = 0;
  constructor(height, width, clickCallback) {
    this.height = height;
    this.width = width;
    this.clickCallback = clickCallback;
  }
  createBugElement() {
    const randomX = Math.floor(Math.random() * this.width) + 1;
    const randomY = Math.floor(Math.random() * this.height) + 1;
    const el = document.createElement('i');
    el.classList.add('bug', 'animate', 'fas', 'fa-bug');
    el.style.top = randomY + 'px';
    el.style.left = randomX + 'px';
    el.id = `enemy-${this.bugCount}`;
    el.onclick = e => {
      this.clickCallback();
      this.animateSquash(el);
    };
    this.bugCount++;
    return el;
  }

  animateSquash(element) {
    element.classList.add('squash-shake');
    setTimeout(() => {
      element.classList.remove('squash-shake');
      element.classList.add('fade-out');
      setTimeout(() => {
        element.remove();
      }, 300);
    }, 1000);
  }
}

export default BugFactory;
