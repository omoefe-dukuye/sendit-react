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
            <NavLink to='/dashboard/create' activeClassName='sidebar-links__link--active'>Create</NavLink>
          </li>
          <li className='sidebar-links__link'>
            <NavLink to='/dashboard/update' activeClassName='sidebar-links__link--active'>Update</NavLink>
          </li>
          <li className='sidebar-links__link'>
            <NavLink to='/dashboard/details' activeClassName='sidebar-links__link--active'>Details</NavLink>
          </li>
          <li className='sidebar-links__link'>
            <NavLink to='/dashboard/cancel' activeClassName='sidebar-links__link--active'>Cancel</NavLink>
          </li>
          <li className='sidebar-links__link'>
            <NavLink to='/dashboard/all' activeClassName='sidebar-links__link--active'>All</NavLink>
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
