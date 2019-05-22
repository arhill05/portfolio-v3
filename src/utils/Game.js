import BugFactory from './BugFactory';

class Game {
  squashCount = 0;
  bugs = [];
  gameDurationSeconds = 30;
  gameDurationRemaining = this.gameDurationSeconds;
  gameContainer = null;
  gameCountdown = null;
  gameInterval = null;
  countdownInterval = null;
  bugFactory = null;

  async start() {
    const height = document.body.clientHeight;
    const width = document.body.clientWidth;

    this.gameContainer = this.createContainer();
    this.bugFactory = new BugFactory(height, width, this.squashCallback);
    await this.showIntro();
    this.gameCountdown = this.createCountdown();
    this.gameContainer.appendChild(this.gameCountdown);

    this.countdownInterval = setInterval(() => {
      this.gameDurationRemaining--;
      this.gameCountdown.innerText = this.gameDurationRemaining;
    }, 1000);

    this.gameInterval = setInterval(() => {
      const bugElement = this.bugFactory.createBugElement();
      this.bugs.push(bugElement);
      this.gameContainer.appendChild(bugElement);
    }, 400);

    setTimeout(async () => {
      this.end();
    }, this.gameDurationSeconds * 1000);
  }

  async showEndScreen() {
    await this.doEmphasisText(
      `Thanks for your help! You squashed ${this.squashCount} bugs!`,
      5000
    );
  }

  async showIntro() {
    return new Promise(async resolve => {
      await this.doEmphasisText(
        'You found a bug! Squash as many more as you can!',
        3000
      );
      await this.doEmphasisText('3...');
      await this.doEmphasisText('2...');
      await this.doEmphasisText('1...');
      await this.doEmphasisText('GO!');
      resolve();
    });
  }

  doEmphasisText(text, screenDuration = 750) {
    return new Promise((resolve, reject) => {
      const element = document.createElement('h2');
      element.innerText = text;
      this.gameContainer.appendChild(element);
      element.classList.add('intro-text');
      setTimeout(() => {
        element.classList.add('fade-out');
        setTimeout(() => {
          element.remove();
          resolve();
        }, 250);
      }, screenDuration);
    });
  }

  createContainer() {
    const container = document.createElement('div');
    container.classList.add('game-container');
    document.body.appendChild(container);
    return container;
  }

  createCountdown() {
    const countdown = document.createElement('div');
    countdown.innerHTML = this.gameDurationRemaining;
    countdown.classList.add('game-countdown');
    return countdown;
  }

  end() {
    return new Promise(resolve => {
      clearInterval(this.gameInterval);
      clearInterval(this.countdownInterval);
      this.gameDurationRemaining = this.gameDurationSeconds;
      this.bugs.forEach(bug => this.bugFactory.animateSquash(bug));
      setTimeout(async () => {
        const highScore = localStorage.getItem('highScore');
        if (this.squashCount > highScore) {
          localStorage.setItem('highScore', this.squashCount);
          await this.doEmphasisText(
            `Thanks for your help! You squashed ${
              this.squashCount
            } bugs - your new high score!`,
            5000
          );
        } else {
          await this.doEmphasisText(
            `Thanks for your help! You squashed ${
              this.squashCount
            } bugs! Your current high score is ${highScore}`,
            5000
          );
        }
        this.gameContainer.remove();
        resolve();
      }, 1500);
    });
  }

  squashCallback = () => {
    this.squashCount++;
  };
}

export default Game;
