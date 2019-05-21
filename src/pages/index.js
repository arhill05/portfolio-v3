import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"

const onGetInTouchClick = () => {
  document.location.href = "mailto:me@andrewhill.io"
}

class BugFactory {
  height = 0
  width = 0
  clickCallback = null
  bugCount = 0
  constructor(height, width, clickCallback) {
    this.height = height
    this.width = width
    this.clickCallback = clickCallback
  }
  createBugElement() {
    const randomX = Math.floor(Math.random() * this.width) + 1
    const randomY = Math.floor(Math.random() * this.height) + 1
    const el = document.createElement("i")
    el.classList.add("bug", "animate", "fas", "fa-bug")
    el.style.top = randomY + "px"
    el.style.left = randomX + "px"
    el.id = `enemy-${this.bugCount}`
    el.onclick = e => {
      this.clickCallback()
      this.animateSquash(el)
    }
    this.bugCount++
    return el
  }

  animateSquash(element) {
    element.classList.add("squash-shake")
    setTimeout(() => {
      element.classList.remove("squash-shake")
      element.classList.add("fade-out")
      setTimeout(() => {
        element.remove()
      }, 300)
    }, 1000)
  }
}

class Game {
  squashCount = 0
  bugs = []
  gameDurationSeconds = 30
  gameDurationRemaining = this.gameDurationSeconds;
  gameContainer = null
  gameCountdown = null;
  gameInterval = null
  countdownInterval = null;
  bugFactory = null

  async start() {
    const height = document.body.clientHeight
    const width = document.body.clientWidth

    this.gameContainer = this.createContainer()
    this.bugFactory = new BugFactory(height, width, this.squashCallback)
    await this.showIntro()
    this.gameCountdown = this.createCountdown();
    this.gameContainer.appendChild(this.gameCountdown);

    this.countdownInterval = setInterval(() => {
      this.gameDurationRemaining--;
      this.gameCountdown.innerText = this.gameDurationRemaining;
    }, 1000)

    this.gameInterval = setInterval(() => {
      const bugElement = this.bugFactory.createBugElement()
      this.bugs.push(bugElement)
      this.gameContainer.appendChild(bugElement)
    }, 400)

    setTimeout(() => {
      this.end()
    }, this.gameDurationSeconds * 1000)
  }

  async showIntro() {
    return new Promise(async resolve => {
      await this.doIntroText("You found a bug! Squash as many more as you can!", 3000)
      await this.doIntroText("3...")
      await this.doIntroText("2...")
      await this.doIntroText("1...")
      await this.doIntroText("GO!")
      resolve()
    })
  }

  doIntroText(text, screenDuration = 750) {
    return new Promise((resolve, reject) => {
      const element = document.createElement("h2")
      element.innerText = text
      this.gameContainer.appendChild(element)
      element.classList.add("intro-text")
      setTimeout(() => {
        element.classList.add("fade-out")
        setTimeout(() => {
          element.remove()
          resolve()
        }, 250)
      }, screenDuration)
    })
  }

  createContainer() {
    const container = document.createElement("div")
    container.classList.add("game-container")
    document.body.appendChild(container);
    return container
  }

  createCountdown() {
    const countdown = document.createElement("div");
    countdown.innerHTML = this.gameDurationRemaining;
    countdown.classList.add("game-countdown");
    return countdown;
  }

  end() {
    clearInterval(this.gameInterval)
    clearInterval(this.countdownInterval);
    this.gameDurationRemaining = this.gameDurationSeconds;
    this.bugs.forEach(bug => this.bugFactory.animateSquash(bug))
    console.log(`you squashed ${this.squashCount} bugs!`)
    setTimeout(() => {
      this.gameContainer.remove()
    }, 1500)
  }

  squashCallback = () => {
    this.squashCount++
  }
}

const onStartGameClick = () => {
  const game = new Game()
  game.start()
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <section className="hero">
      <div className="hero__content">
        <div>
          <h1>Hello, I'm Drew Hill</h1>
          <div className="tag-lines">
            <p>{"// Full Stack Developer"}</p>
            <p>{"// JavaScript Lover"}</p>
            <p>{"// Mechanical Keyboard Enthusiast"}</p>
          </div>
          <div className="love-to-work">
            <div>
              I'm currently available for work. I'd love to work with you to
              build something extraordinary.
            </div>
            <button onClick={onGetInTouchClick}>GET IN TOUCH</button>
          </div>
        </div>
      </div>
      <div className="hero__image-container">
        <img
          src="https://res.cloudinary.com/df3ikytgy/image/upload/q_auto:best/v1557449085/portfolio/IMG_1398.jpg"
          alt="Drew and his significant other"
        />
        <i
          id="game-start"
          className="bug fas fa-bug"
          onClick={onStartGameClick}
        />
      </div>
      <div className="hero__icons">
        <a href="https://twitter.com/drewhilldev">
          <i className="fab fa-twitter" />
        </a>
        <a href="mailto:me@andrewhill.io">
          <i className="fas fa-envelope" />
        </a>
        <a href="https://github.com/arhill05">
          <i className="fab fa-github" />
        </a>
        <a href="https://www.linkedin.com/in/drew-hill-7b328b81">
          <i className="fab fa-linkedin-in" />
        </a>
      </div>
    </section>
  </Layout>
)

export default IndexPage
