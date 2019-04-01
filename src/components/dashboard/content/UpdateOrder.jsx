import React, { Component } from 'react';
import '@babel/polyfill';
import { toast } from 'react-toastify';
import Modal from '../../modal';
import UpdatedParcel from './updatedParcel';
import axios from '../../../utils/axiosConfig';

export class UpdateOrder extends Component {
  state = {
    parcelId: '',
    ParcelIdErrorMessage: '',
    destinationErrorMessage: '',
    destination: ''
  };

  onDestinationChange = ({ target: { value: destination } }) => {
    this.setState({
      destination,
      destinationErrorMessage: ''
    });
  };

  onDestinationBlur = async () => {
    const { destination } = this.state;
    if (!destination) {
      return this.setState({ destinationErrorMessage: 'cannot be empty.' });
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
    const { destination, parcelId } = this.state;

    if (!destination) {
      return this.setState({ destinationErrorMessage: 'cannot be empty.' });
    }

    if (!Number(parcelId)) {
      return this.setState({ parcelId: 'must be a number greater than zero.' });
    }

    this.setState({ buttonDisabled: true });

    try {
      const { data } = await axios.patch(`${process.env.API_ROOT_URL}/parcels/${parcelId}/destination`, { destination });
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
        destination,
        parcelId,
        destinationErrorMessage,
        parcelIdErrorMessage,
        newParcel
      },
      onDestinationChange,
      onDestinationBlur,
      onParcelIdBlur,
      onParcelIdChange,
      handleSubmit,
      removeNewParcel
    } = this;

    const message = destinationErrorMessage
      || parcelIdErrorMessage
      || false;


    const disableButton = buttonDisabled || message;


    return (
      <div className='form__page create-order'>
        <div className='form__container'>
          <form className='form create-order__form'>
            <div className='form__input-top'>
              <p>
                <span className='form__input-top__label'>New Destination</span>
                <span className='form__input-top__error'>{destinationErrorMessage}</span>
              </p>
            </div>
            <input
              className={destinationErrorMessage ? 'red-border' : ''}
              name='destination'
              value={destination}
              onChange={onDestinationChange}
              onBlur={onDestinationBlur}
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
              content={<UpdatedParcel parcel={newParcel} />}
              />
        }
      </div>
    );
  }
}

export default UpdateOrder;
