import React, { Component } from 'react';
import '@babel/polyfill';
import { toast } from 'react-toastify';
import axios from '../../../utils/axiosConfig';

export class CancelOrder extends Component {
  state = {
    parcelId: '',
    ParcelIdErrorMessage: ''
  };

  onParcelIdChange = ({ target: { value: parcelId } }) => {
    this.setState({
      parcelId,
      parcelIdErrorMessage: ''
    });
  };

  onParcelIdBlur = async () => {
    const { parcelId } = this.state;
    if (!Number(parcelId)) {
      return this.setState({ parcelIdErrorMessage: 'must be a number.' });
    }
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    const { parcelId } = this.state;

    if (!Number(parcelId)) {
      return this.setState({ parcelId: 'must be a number greater than zero.' });
    }

    this.setState({ buttonDisabled: true });

    try {
      await axios.patch(`${process.env.API_ROOT_URL}/parcels/${parcelId}/cancel`);
      toast.success('Order cancelled');
    } catch ({ response: { data: { error } } }) {
      toast.error(error);
    } 

    this.setState({ buttonDisabled: false });
  }

  render() {
    const {
      state: {
        buttonDisabled,
        parcelId,
        parcelIdErrorMessage,
      },
      onParcelIdBlur,
      onParcelIdChange,
      handleSubmit,
    } = this;

    const message = parcelIdErrorMessage || false;


    const disableButton = buttonDisabled || message;


    return (
      <div className='form__page create-order'>
        <div className='form__container'>
          <form className='form create-order__form'>
            <div className='form__input-top'>
              <p>
                <span className='form__input-top__label'>Parcel ID</span>
                <span className='form__input-top__error'>{parcelIdErrorMessage}</span>
              </p>
            </div>
            <input
              className={parcelIdErrorMessage ? 'red-border' : ''}
              type='number'
              name='parcelId'
              value={parcelId}
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
                Cancel
              </span>
              <span className={buttonDisabled ? 'spinner spinner--button' : undefined}></span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CancelOrder;
