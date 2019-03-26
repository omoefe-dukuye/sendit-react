import React from 'react';
import { Link } from 'react-router-dom';


export default () => (
  <div className="header__auth-buttons">
    <Link to="/login">Login</Link>
    <Link to="/signup">Signup</Link>
  </div>
);
