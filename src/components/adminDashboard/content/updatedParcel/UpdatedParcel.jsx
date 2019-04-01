import React from 'react';
import PropTypes from 'prop-types';

const NewParcel = ({ parcel: {
  newDestination,
  newDistance,
  additionalPrice
} }) => (
  <div className='create-order__new-order'>
    <h3>Parcel Updated</h3>
    <ul>
      <li>New Destination: {newDestination}</li>
      <li>New Distance: {newDistance}</li>
      <li>Addtional Price: {additionalPrice}</li>
    </ul>
  </div>
);

NewParcel.propTypes = {
  parcel: PropTypes.object
};

export default NewParcel;
