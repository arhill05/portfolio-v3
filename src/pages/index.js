import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import './index.css';

const onGetInTouchClick = () => {
  document.location.href="mailto:me@andrewhill.io";
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <section className="hero">
      <div className="hero__content">
        <div>
          <h1>Hello, I'm Drew Hill</h1>
          <div className="tag-lines">
            <p>// Full Stack Developer</p>
            <p>// JavaScript Lover</p>
            <p>// Mechanical Keyboard Enthusiast</p>
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
