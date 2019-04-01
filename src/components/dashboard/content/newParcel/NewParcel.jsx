import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const NewParcel = ({ parcel: {
  id,
  current_location: location,
  destination,
  distance,
  price
} }) => (
  <div className='create-order__new-order'>
    <h3>New Order Created</h3>
    <ul>
      <li>Parcel ID: {id}</li>
      <li>Location: {location}</li>
      <li>Destination: {destination}</li>
      <li>Distance: {distance}</li>
      <li>Price: {price}</li>
    </ul>
  </div>
);

NewParcel.propTypes = {
  parcel: PropTypes.object
};

export default NewParcel;
