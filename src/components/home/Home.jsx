import React from 'react';
import Slider from './slider';
import About from './About';
import './styles.scss';


export const Home = () => (
  <div className="home">
    <div className="home__content__wrapper">
      <Slider />
      <About />
    </div>
  </div>
);

export default Home;
