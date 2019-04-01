import React, { Component } from 'react';
import '@babel/polyfill';
import { toast } from 'react-toastify';
import axios from '../../../utils/axiosConfig';

export class StatusChange extends Component {
  state = {
    status: '',
    parcelId: '',
    ParcelIdErrorMessage: ''
  };

  onParcelIdChange = ({ target: { value: parcelId } }) => {
    this.setState({
      parcelId,
      parcelIdErrorMessage: ''
    });
  };

  onParcelIdBlur = () => {
    const { parcelId } = this.state;
    if (!Number(parcelId)) {
      return this.setState({ parcelIdErrorMessage: 'must be a number.' });
    }
  }

  onStatusChange = ({ target: { value: status } }) => {
    this.setState({ status });
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    const { parcelId, status } = this.state;

    if (!Number(parcelId)) {
      return this.setState({ parcelId: 'must be a number greater than zero.' });
    }

    this.setState({ buttonDisabled: true });

    try {
      await axios.patch(`${process.env.API_ROOT_URL}/parcels/${parcelId}/status`, { status });
      toast.success('Status updated');
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
      onStatusChange,
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
            <div className='form__input-top'>
              <p>
                <span className='form__input-top__label'>Status</span>
              </p>
            </div>
            <select name="status" onBlur={onStatusChange} required>
              <option value="created">Created</option>
              <option value="in-transit">In transit</option>
              <option value="cancelled">Cancelled</option>
              <option value="delivered">Delivered</option>
            </select>
            <button
              disabled={disableButton}
              className='button create-order__form__button'
              onClick={handleSubmit}
            >
              <span className={`button__text--create-order ${buttonDisabled ? 'hidden' : undefined}`}>
                Change Status
              </span>
              <span className={buttonDisabled ? 'spinner spinner--button' : undefined}></span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default StatusChange;
