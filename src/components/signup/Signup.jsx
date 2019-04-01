import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { isAlphanumeric, isAlpha, isEmail } from 'validator';
import '@babel/polyfill';
import PropTypes from 'prop-types';
import { signup } from '../../redux/actions/auth';
import axios from '../../utils/axiosConfig';

export class Signup extends Component {
  state = {
    firstnameErrorMessage: '',
    lastNameErrorMessage: '',
    emailErrorMessage: '',
    usernameErrorMessage: '',
    passwordErrorMessage: '',
    confirmPasswordErrorMessage: '',
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  }

  onUsernameChange = ({ target: { value: username } }) => {
    this.setState({
      username,
      usernameErrorMessage: ''
    });
  }

  onUsernameBlur = async () => {
    const { username } = this.state;
    if (!username) {
      return this.setState({ usernameErrorMessage: 'cannot be empty.' });
    }
    if (!isAlphanumeric(this.state.username)) {
      return this.setState({ usernameErrorMessage: 'must include only numbers and letters.' });
    }

    try {
      await axios.get(`${process.env.API_ROOT_URL}/users/checkUsername/${username}`);
    } catch ({ response: { status } }) {
      return this.setState({ usernameErrorMessage: 'already taken.' });
    }
  }

  onFirstnameChange = ({ target: { value: firstname } }) => {
    this.setState({
      firstname,
      firstnameErrorMessage: ''
    });
  }

  onFirstnameBlur = () => {
    const { firstname } = this.state;
    if (!firstname) {
      return this.setState({ firstnameErrorMessage: 'cannot be empty.' });
    }
    if (!isAlpha(firstname)) {
      return this.setState({ firstnameErrorMessage: 'must be alphabets only.' });
    }
  }

  onLastnameChange = ({ target: { value: lastname } }) => {
    this.setState({
      lastname,
      lastnameErrorMessage: ''
    });
  }

  onLastnameBlur = () => {
    const { lastname } = this.state;
    if (!lastname) {
      return this.setState({ lastnameErrorMessage: 'cannot be empty.' });
    }
    if (!isAlpha(lastname)) {
      return this.setState({ lastnameErrorMessage: 'must be alphabets only.' });
    }
  }

  onEmailChange = ({ target: { value: email } }) => {
    this.setState({
      email,
      emailErrorMessage: ''
    });
  }

  onEmailBlur = async () => {
    const { email } = this.state;
    if (!email) {
      return this.setState({ emailErrorMessage: 'cannot be empty.' });
    }
    if (!isEmail(email)) {
      return this.setState({ emailErrorMessage: 'is not valid, Please crosscheck' });
    }

    try {
      await axios.get(`${process.env.API_ROOT_URL}/users/checkEmail/${email}`);
    } catch ({ response: { status } }) {
      return this.setState({ emailErrorMessage: 'already taken.' });
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

  onConfirmPasswordChange = ({ target: { value: confirmPassword } }) => {
    this.setState({
      confirmPassword,
      confirmPasswordErrorMessage: ''
    });
  }
  
  onConfirmPasswordBlur = () => {
    const { confirmPassword, password } = this.state
    if (!confirmPassword) {
      return this.setState({ confirmPasswordErrorMessage: 'please confirm password.' })
    }

    if (password !== confirmPassword) {
      return this.setState({ confirmPasswordErrorMessage: 'Passwords do not match.' })
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, firstname, lastname, email, confirmPassword } = this.state;
    if (!username) {
      return this.setState({ usernameErrorMessage: 'cannot be empty.' });
    }

    if (!firstname) {
      return this.setState({ firstnameErrorMessage: 'cannot be empty.' });
    }

    if (!lastname) {
      return this.setState({ lastnameErrorMessage: 'cannot be empty.' });
    }

    if (!email) {
      return this.setState({ emailErrorMessage: 'cannot be empty.' });
    }

    if (!password) {
      return this.setState({ passwordErrorMessage: 'cannot be empty.' })
    }

    if (!confirmPassword) {
      return this.setState({ passwordErrorMessage: 'cannot be empty.' })
    }

    this.setState({ buttonDisabled: true });

    const serverErrorMessage = await this.props.handleSignup({
      username,
      password,
      firstName: firstname,
      lastName: lastname,
      email
    });

    if (serverErrorMessage) {
      this.setState({ buttonDisabled: false });
      toast.error(serverErrorMessage, { className: 'toast--error' });
    }
  }

  render() {
    if (this.props.user && this.props.history.location.pathname === '/signup') {
      return <Redirect to="/dashboard" />;
    }

    const {
      state: {
        buttonDisabled,
        firstname,
        firstnameErrorMessage,
        lastnameErrorMessage,
        emailErrorMessage,
        confirmPasswordErrorMessage,
        lastname,
        email,
        username,
        usernameErrorMessage,
        password,
        confirmPassword,
        passwordErrorMessage,
      },
      onUsernameBlur,
      onUsernameChange,
      onFirstnameChange,
      onFirstnameBlur,
      onLastnameBlur,
      onLastnameChange,
      onConfirmPasswordBlur,
      onConfirmPasswordChange,
      onEmailBlur,
      onEmailChange,
      onPasswordBlur,
      onPasswordChange,
      handleSubmit
    } = this;

    const message = firstnameErrorMessage
      || lastnameErrorMessage
      || emailErrorMessage
      || usernameErrorMessage
      || passwordErrorMessage
      || confirmPasswordErrorMessage
      || false;


    const disableButton = buttonDisabled || message; // We don't want to disable the button if the toast is a message from the server

    return (
      <div className='form__page signup'>
        <div className='form__container'>
          <form className='form signup__form'>
            <div className='form__input-top'>
              <p>
                <span className='form__input-top__label'>Firstname</span>
                <span className='form__input-top__error'>{firstnameErrorMessage}</span>
              </p>
            </div>
            <input
              className={firstnameErrorMessage ? 'red-border' : ''}
              name='firstname'
              value={firstname}
              onChange={onFirstnameChange}
              onBlur={onFirstnameBlur}
              required
            />
            <div className='form__input-top'>
              <p>
                <span className='form__input-top__label'>Lastname</span>
                <span className='form__input-top__error'>{lastnameErrorMessage}</span>
              </p>
            </div>
            <input
              className={lastnameErrorMessage ? 'red-border' : ''}
              name='lastname'
              value={lastname}
              onChange={onLastnameChange}
              onBlur={onLastnameBlur}
              required
            />
            <div className='form__input-top'>
              <p>
                <span className='form__input-top__label'>Email</span>
                <span className='form__input-top__error'>{emailErrorMessage}</span>
              </p>
            </div>
            <input
              className={emailErrorMessage ? 'red-border' : ''}
              type='email'
              name='email'
              value={email}
              onChange={onEmailChange}
              onBlur={onEmailBlur}
              required
            />
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
            <div className='form__input-top'>
              <p>
                <span className='form__input-top__label'> Confirm Password</span>
                <span className='form__input-top__error'>{confirmPasswordErrorMessage}</span>
              </p>
            </div>
            <input
              className={confirmPasswordErrorMessage ? 'red-border' : ''}
              type='password'
              name='confirm-password'
              onBlur={onConfirmPasswordBlur}
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              required
            />
            <button
              disabled={disableButton}
              className='button signup__form__button'
              onClick={handleSubmit}
            >
              <span className={`button__text--signup ${buttonDisabled ? 'hidden' : undefined}`}>
                Signup
              </span>
              <span className={buttonDisabled ? 'spinner spinner--button' : undefined}></span>
            </button>
          </form>
          <div className='signup__text-below'>
            Already have an account? <Link to='/login'>Login</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  handleSignup: (payload) => dispatch(signup(payload)),
});

Signup.propTypes = {
  handleSignup: PropTypes.func,
  history: PropTypes.object,
  user: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));
