import React from 'react';

const onGetInTouchClick = () => {
  document.location.href = 'mailto:me@andrewhill.io';
};

const HeroContent = () => (
  <div className="hero__content">
    <div>
      <h1>Hello, I'm Drew Hill</h1>
      <div className="tag-lines">
        <p>{'// Full Stack Developer'}</p>
        <p>{'// JavaScript Lover'}</p>
        <p>{'// Mechanical Keyboard Enthusiast'}</p>
      </div>
      <div className="love-to-work">
        <div>
          I'm currently available for work. I'd love to work with you to build
          something extraordinary.
        </div>
        <button onClick={onGetInTouchClick}>GET IN TOUCH</button>
      </div>
    </div>
  </div>
);

export default HeroContent;
