import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="home__about">
    <p className="home__about__text">
      The sendIT team is always available to offer lightning fast, top notch courier services that help users deliver parcels to different destinations. Our courier quotes are provided based on weight categories. Please <Link to="/signup">create an account</Link> to get started. <br /> At SendIT, We are committed to delivering on time all the time!
    </p>
  </div>
);
