import React from 'react';
import PropTypes from 'prop-types';

const NewParcel = ({ parcel: {
  currentLocation,
  newDistance,
} }) => (
  <div className='create-order__new-order'>
    <h3>Parcel Updated</h3>
    <ul>
      <li>Current Location: {currentLocation}</li>
      <li>New Distance: {newDistance}</li>
    </ul>
  </div>
);

NewParcel.propTypes = {
  parcel: PropTypes.object
};

export default NewParcel;
