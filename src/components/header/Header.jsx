import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from './logo';
import AuthButtons from './authButtons';
import Widgets from './widgets';
import './styles.scss';


export const Header = ({ profile }) => (
  <div className="header">
    <Logo />
    {
      !profile
        ? <AuthButtons />
        : <Widgets user={profile}/>
    }
  </div>
);

Header.propTypes = {
  profile: PropTypes.object
}

const mapStateToProps = ({ auth: { profile } }) => ({ profile });

export default connect(mapStateToProps)(Header);
