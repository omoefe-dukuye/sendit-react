import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import Logo from './logo';
import AuthButtons from './authButtons';
import Widgets from './widgets';
import './styles.scss';
import { addProfile } from '../../redux/actions/auth';
import "react-toastify/dist/ReactToastify.css";


export class Header extends Component {
  state = {};

  componentDidMount () {
    const { token } = localStorage;
    if (token) {
      try {
        const user = JSON.parse(window.atob(token.split('.')[1]));
        this.props.dispatch(addProfile(user));
        this.setState({ isLoggedIn: true })
      } catch (error) {
        this.setState({ isLoggedIn: false })
      }
      
    }
  }

  componentDidUpdate() {
    if(!this.state.isLoggedIn && this.props.user) {
      this.setState({ isLoggedIn: true });
    } else if (this.state.isLoggedIn && !this.props.user) {
      this.setState({ isLoggedIn: false });
    }
  }

  render() {
    const { user } = this.props;
    const { isLoggedIn } = this.state;

    return (
      <div className="header">
      <Logo />
      <ToastContainer />
        {
          !isLoggedIn
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
