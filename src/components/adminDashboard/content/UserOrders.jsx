import React, { Component } from 'react';
import '@babel/polyfill';
import { toast } from 'react-toastify';
import axios from '../../../utils/axiosConfig';
import Loader from '../../loader';
import AllParcels from './allParcels';

export class CancelOrder extends Component {
  state = {
    userId: '',
    ParcelIdErrorMessage: ''
  };

  onParcelIdChange = ({ target: { value: userId } }) => {
    this.setState({
      userId,
      userIdErrorMessage: ''
    });
  };

  onParcelIdBlur = async () => {
    const { userId } = this.state;
    if (!Number(userId)) {
      return this.setState({ userIdErrorMessage: 'must be a number.' });
    }
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    const { userId } = this.state;

    if (!Number(userId)) {
      return this.setState({ userIdErrorMessage: 'must be a number.' });
    }

    this.setState({ buttonDisabled: true, loading: true });

    try {
      const { data: { orders: parcels } } = await axios.get(`${process.env.API_ROOT_URL}/users/${userId}/parcels`);
      this.setState({ parcels });
    } catch ({ response: { data: { error } } }) {
      toast.error(error);
    } 

    this.setState({ buttonDisabled: false, loading: false });
  }

  render() {
    const {
      state: {
        buttonDisabled,
        loading,
        userId,
        parcels = [],
        userIdErrorMessage,
      },
      onParcelIdBlur,
      onParcelIdChange,
      handleSubmit,
    } = this;

    const message = userIdErrorMessage || false;


    const disableButton = buttonDisabled || message;


    return (
      <div className='form__page create-order user-orders'>
        <div className='form__container'>
          <form className='form create-order__form'>
            <div className='form__input-top'>
              <p>
                <span className='form__input-top__label'>User ID</span>
                <span className='form__input-top__error'>{userIdErrorMessage}</span>
              </p>
            </div>
            <input
              className={userIdErrorMessage ? 'red-border' : ''}
              type='number'
              name='userId'
              value={userId}
              onChange={onParcelIdChange}
              onBlur={onParcelIdBlur}
              required
            />
            <button
              disabled={disableButton}
              className='button create-order__form__button'
              onClick={handleSubmit}
            >
              <span className={`button__text--create-order ${buttonDisabled ? 'hidden' : undefined}`}>
                Get Orders
              </span>
              <span className={buttonDisabled ? 'spinner spinner--button' : undefined}></span>
            </button>
          </form>
            {
              loading
                ? <Loader />
                : <AllParcels parcels={parcels} />
            }
          </div>
      </div>
    );
  }
}

export default CancelOrder;
