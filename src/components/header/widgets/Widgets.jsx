import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';


export const Widgets = ({ profile: { first_name: firstname, is_admin: isAdmin } }) => (
  <div className="header__widgets">
    <Link to={`/${isAdmin ? 'admin' : 'user' }`}>
      {firstname}
      <FontAwesomeIcon
        className="header__widgets__icon"
        icon={isAdmin ? faUserTie : faUser}
        size="2x"
      />
    </Link>
  </div>
);

Widgets.propTypes = {
  profile: PropTypes.object
}

const mapStateToProps = ({ auth: { isLoggedIn } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(Widgets);
