import React from 'react';
import Game from '../utils/Game';

const onStartGameClick = () => {
  const game = new Game();
  game.start();
};

const HeroImage = () => (
  <div className="hero__image-container">
    <img
      src="https://res.cloudinary.com/df3ikytgy/image/upload/q_auto,f_auto/v1557449085/portfolio/IMG_1398-min"
      alt="Drew and his significant other"
    />
    <i id="game-start" className="bug fas fa-bug" onClick={onStartGameClick} />
  </div>
);

export default HeroImage;
