import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';


export const Logo = () => (
  <div className="header__logo">
      <Link to="/" className="header__logo__link" href="index.html">
        <h1>SendIT</h1>
        <FontAwesomeIcon
          className="header__logo__icon"
          icon={faPlaneDeparture}
        />
      </Link>

      <p className="header__logo__slogan">
        ...delivering on time, all the time.
      </p>
  </div>
);

export default Logo;
