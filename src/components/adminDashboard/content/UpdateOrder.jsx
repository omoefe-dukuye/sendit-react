import React, { Component } from 'react';
import '@babel/polyfill';
import { toast } from 'react-toastify';
import Modal from '../../modal';
import UpdatedParcelLocation from './updatedParcelLocation';
import axios from '../../../utils/axiosConfig';

export class UpdateOrder extends Component {
  state = {
    parcelId: '',
    ParcelIdErrorMessage: '',
    locationErrorMessage: '',
    location: ''
  };

  onLocationChange = ({ target: { value: location } }) => {
    this.setState({
      location,
      locationErrorMessage: ''
    });
  };

  onLocationBlur = async () => {
    const { location } = this.state;
    if (!location) {
      return this.setState({ locationErrorMessage: 'cannot be empty.' });
    }
  }

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
    const { location, parcelId } = this.state;

    if (!location) {
      return this.setState({ locationErrorMessage: 'cannot be empty.' });
    }

    if (!Number(parcelId)) {
      return this.setState({ parcelIdErrorMessage: 'must be a number.' });
    }

    this.setState({ buttonDisabled: true });

    try {
      const { data } = await axios.patch(`${process.env.API_ROOT_URL}/parcels/${parcelId}/currentlocation`, { location });
      this.setState({ newParcel: data });
    } catch ({ response: { data: { error } } }) {
      toast.error(error);
    } 

    this.setState({ buttonDisabled: false });
  }

  removeNewParcel = () => {
    this.setState({ newParcel: false });
  }

  render() {
    const {
      state: {
        buttonDisabled,
        location,
        parcelId,
        locationErrorMessage,
        parcelIdErrorMessage,
        newParcel
      },
      onLocationChange,
      onLocationBlur,
      onParcelIdBlur,
      onParcelIdChange,
      handleSubmit,
      removeNewParcel
    } = this;

    const message = locationErrorMessage
      || parcelIdErrorMessage
      || false;


    const disableButton = buttonDisabled || message;


    return (
      <div className='form__page create-order'>
        <div className='form__container'>
          <form className='form create-order__form'>
            <div className='form__input-top'>
              <p>
                <span className='form__input-top__label'>Current Location</span>
                <span className='form__input-top__error'>{locationErrorMessage}</span>
              </p>
            </div>
            <input
              className={locationErrorMessage ? 'red-border' : ''}
              name='location'
              value={location}
              onChange={onLocationChange}
              onBlur={onLocationBlur}
              required
            />
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
                Update Order
              </span>
              <span className={buttonDisabled ? 'spinner spinner--button' : undefined}></span>
            </button>
          </form>
        </div>
        {
          !!newParcel
            &&
              <Modal
              isOpen={!!newParcel}
              hideModal={removeNewParcel}
              content={<UpdatedParcelLocation parcel={newParcel} />}
              />
        }
      </div>
    );
  }
}

export default UpdateOrder;
