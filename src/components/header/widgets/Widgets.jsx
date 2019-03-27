import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { removeProfile } from '../../../redux/actions/auth';
import './styles.scss';


export const Widgets = ({ user: { userFirstName: firstname, isAdmin }, dispatch }) => {
  const handleLogout = () => {
    dispatch(removeProfile());
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="header__widgets">
      <Link to={`/${isAdmin ? 'admin' : 'user' }`}>
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
  user: PropTypes.object
}

const mapStateToProps = ({ auth: { isLoggedIn } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(withRouter(Widgets));
