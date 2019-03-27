import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from './logo';
import AuthButtons from './authButtons';
import Widgets from './widgets';
import './styles.scss';
import { addProfile } from '../../redux/actions/auth';


export class Header extends Component {
  state = {};

  componentDidMount () {
    const { token } = localStorage;
    if (token) {
      const user = JSON.parse(window.atob(token.split('.')[1]));
      this.props.dispatch(addProfile(user));
      this.setState({ isLoggedIn: true })
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div className="header">
        <Logo />
        {
          !user
            ? <AuthButtons />
            : <Widgets user={user}/>
        }
      </div>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object
}

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps)(Header);
