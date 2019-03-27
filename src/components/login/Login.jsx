import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAlphanumeric } from 'validator';
import '@babel/polyfill';
import PropTypes from 'prop-types';
import { login } from '../../redux/actions/auth';

export class Login extends Component {
  state = {
    usernameErrorMessage: '',
    passwordErrorMessage: '',
    username: '',
    password: '',
  }

  onUsernameChange = ({ target: { value: username } }) => {
    this.setState({
      username,
      usernameErrorMessage: ''
    });
  }

  onUsernameBlur = () => {
    const { username } = this.state;
    if (!username) {
      return this.setState({ usernameErrorMessage: 'cannot be empty.' });
    }
    if (!isAlphanumeric(this.state.username)) {
      return this.setState({ usernameErrorMessage: 'must include only numbers and letters.' });
    }
  }

  onPasswordChange = ({ target: { value: password } }) => {
    this.setState({
      password,
      passwordErrorMessage: ''
    });
  }

  onPasswordBlur = () => {
    const { password } = this.state
    if (!password) {
      return this.setState({ passwordErrorMessage: 'cannot be empty.' })
    }

    if (!isAlphanumeric(password)) {
      return this.setState({ passwordErrorMessage: 'must include only numbers and letters.' })
    }

    if (password.length < 8) {
      return this.setState({ passwordErrorMessage: 'must be 8 or more characters.' })
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (!username) {
      return this.setState({ usernameErrorMessage: 'cannot be empty.' });
    }
    if (!password) {
      return this.setState({ passwordErrorMessage: 'cannot be empty.' })
    }
    this.setState({ buttonDisabled: true });

    const serverErrorMessage = await this.props.handleLogin({
      username, password
    });

    if (serverErrorMessage) {
      this.setState({ buttonDisabled: false });
      toast.error(serverErrorMessage, { className: 'toast--error' });
    }
  }

  render() {
    if (this.props.user && this.props.history.location.pathname === '/login') {
      return <Redirect to="/user" />;
    }

    const {
      state: {
        buttonDisabled,
        username,
        usernameErrorMessage,
        password,
        passwordErrorMessage,
      },
      onUsernameBlur,
      onUsernameChange,
      onPasswordBlur,
      onPasswordChange,
      handleSubmit
    } = this;

    const message = usernameErrorMessage || passwordErrorMessage || false;


    const disableButton = buttonDisabled || message; // We don't want to disable the button if the toast is a message from the server

    return (
      <div className='form__page login'>
        <div className='form__container'>
          <form className='form login__form'>
            <div className='form__input-top'>
              <p>
                <span className='form__input-top__label'>Username</span>
                <span className='form__input-top__error'>{usernameErrorMessage}</span>
              </p>
            </div>
            <input
              className={usernameErrorMessage ? 'red-border' : ''}
              name='username'
              value={username}
              onChange={onUsernameChange}
              onBlur={onUsernameBlur}
              required
            />
            <div className='form__input-top'>
              <p>
                <span className='form__input-top__label'>Password</span>
                <span className='form__input-top__error'>{passwordErrorMessage}</span>
              </p>
            </div>
            <input
              className={passwordErrorMessage ? 'red-border' : ''}
              type='password'
              name='password'
              onBlur={onPasswordBlur}
              value={password}
              onChange={onPasswordChange}
              required
            />
            <button
              disabled={disableButton}
              className='button login__form__button'
              onClick={handleSubmit}
            >
              <span className={`button__text--login ${buttonDisabled ? 'hidden' : undefined}`}>
                Login
              </span>
              <span className={buttonDisabled ? 'spinner spinner--button' : undefined}></span>
            </button>
          </form>
          <div className='login__text-below'>
            Dont have an account? <Link to='/signup'>Register</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (payload) => dispatch(login(payload)),
});

Login.propTypes = {
  handleLogin: PropTypes.func,
  history: PropTypes.object,
  user: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
