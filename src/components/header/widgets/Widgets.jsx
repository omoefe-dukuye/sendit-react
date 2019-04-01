import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { removeProfile } from '../../../redux/actions/auth';
import './styles.scss';


export const Widgets = ({ user, dispatch, history, location: { pathname } }) => {
  const { userFirstName: firstname, isAdmin } = user || {};
  const handleLogout = () => {
    dispatch(removeProfile());
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="header__widgets">
      <Link to={`/${isAdmin && !pathname.includes('/admin-dashboard') ? 'admin-' : ''}dashboard`}>
        {firstname}&nbsp;
        <FontAwesomeIcon
          className="header__widgets__icon"
          icon={isAdmin ? faUserTie : faUser}
        />
      </Link>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

Widgets.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
}

const mapStateToProps = ({ auth: { isLoggedIn } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(withRouter(Widgets));
