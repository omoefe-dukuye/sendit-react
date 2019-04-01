import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-links'>
        <ul>
          <li className='sidebar-links__link'>
            <NavLink to='/admin-dashboard/status' activeClassName='sidebar-links__link--active'>Status</NavLink>
          </li>
          <li className='sidebar-links__link'>
            <NavLink to='/admin-dashboard/location' activeClassName='sidebar-links__link--active'>Location</NavLink>
          </li>
          <li className='sidebar-links__link'>
            <NavLink to='/admin-dashboard/details' activeClassName='sidebar-links__link--active'>Details</NavLink>
          </li>
          <li className='sidebar-links__link'>
            <NavLink to='/admin-dashboard/user' activeClassName='sidebar-links__link--active'>User</NavLink>
          </li>
          <li className='sidebar-links__link'>
            <NavLink to='/admin-dashboard/all' activeClassName='sidebar-links__link--active'>All</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  authUserEmail: PropTypes.string
};

export default SideBar;
