import React, { Component } from 'react';
import { connect } from 'react-redux';
import '@babel/polyfill';
import PropTypes from 'prop-types';
import Modal from '../../modal';
import { createOrder } from '../../../redux/actions/parcels';
import NewParcel from './newParcel';

export class CreateOrder extends Component {
  state = {
    pickupLocationErrorMessage: '',
    pickupLocation: '',
    destinationErrorMessage: '',
    destination: '',
    weightErrorMessage: '',
    weight: ''
  };

  onPickupLocationChange = ({ target: { value: pickupLocation } }) => {
    this.setState({
      pickupLocation,
      pickupLocationErrorMessage: ''
    });
  };

  onPickupLocationBlur = async () => {
    const { pickupLocation } = this.state;
    if (!pickupLocation) {
      return this.setState({ pickupLocationErrorMessage: 'cannot be empty.' });
    }
  }

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

  onWeightChange = ({ target: { value: weight } }) => {
    this.setState({
      weight,
      weightErrorMessage: ''
    });
  };

  onWeightBlur = async () => {
    const { weight } = this.state;
    if (!Number(weight)) {
      return this.setState({ weightErrorMessage: 'must be a number greater than zero.' });
    }
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    const { pickupLocation, destination, weight } = this.state;
    if (!pickupLocation) {
      return this.setState({ pickupLocationErrorMessage: 'cannot be empty.' });
    }

    if (!destination) {
      return this.setState({ destinationErrorMessage: 'cannot be empty.' });
    }

    if (!Number(weight)) {
      return this.setState({ weight: 'must be a number greater than zero.' });
    }

    this.setState({ buttonDisabled: true });

    const parcel = await this.props.handleCreateOrder({
      location: pickupLocation, destination, weight
    });

    this.setState({ buttonDisabled: false });

    if (parcel) {
      this.setState({ newParcel: parcel });
    }
  }

  removeNewParcel = () => {
    this.setState({ newParcel: false });
  }

  render() {
    const {
      state: {
        buttonDisabled,
        pickupLocation,
        destination,
        weight,
        pickupLocationErrorMessage,
        destinationErrorMessage,
        weightErrorMessage,
        newParcel
      },
      onPickupLocationBlur,
      onPickupLocationChange,
      onDestinationChange,
      onDestinationBlur,
      onWeightBlur,
      onWeightChange,
      handleSubmit,
      removeNewParcel
    } = this;

    const message = destinationErrorMessage
      || pickupLocationErrorMessage
      || weightErrorMessage
      || false;


    const disableButton = buttonDisabled || message;


    return (
      <div className='form__page create-order'>
        <div className='form__container'>
          <form className='form create-order__form'>
            <div className='form__input-top'>
              <p>
                <span className='form__input-top__label'>Pickup Location</span>
                <span className='form__input-top__error'>{pickupLocationErrorMessage}</span>
              </p>
            </div>
            <input
              className={pickupLocationErrorMessage ? 'red-border' : ''}
              name='location'
              value={pickupLocation}
              onChange={onPickupLocationChange}
              onBlur={onPickupLocationBlur}
              required
            />
            <div className='form__input-top'>
              <p>
                <span className='form__input-top__label'>Destination</span>
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
                <span className='form__input-top__label'>Weight</span>
                <span className='form__input-top__error'>{weightErrorMessage}</span>
              </p>
            </div>
            <input
              className={weightErrorMessage ? 'red-border' : ''}
              type='number'
              name='weight'
              value={weight}
              onChange={onWeightChange}
              onBlur={onWeightBlur}
              required
            />
            <button
              disabled={disableButton}
              className='button create-order__form__button'
              onClick={handleSubmit}
            >
              <span className={`button__text--create-order ${buttonDisabled ? 'hidden' : undefined}`}>
                Create Order
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
              content={<NewParcel parcel={newParcel} />}
              />
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleCreateOrder: (payload) => dispatch(createOrder(payload)),
});

CreateOrder.propTypes = {
  handleCreateOrder: PropTypes.func
};

export default connect(undefined, mapDispatchToProps)(CreateOrder);
