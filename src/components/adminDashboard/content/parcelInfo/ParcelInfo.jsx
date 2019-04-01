import React from 'react';
import PropTypes from 'prop-types';
import Map from '../../../map';
import './styles.scss';

const ParcelInfo = ({ parcel }) => {
  const {
    id,
    pickup_location: from,
    destination: to,
    current_location: location,
    weight,
    distance,
    price,
    sent_on: createdOn,
    coords: [pickupLocation, initialCenter, destination]
  } = parcel;

  return (
    <div className='parcel-info--wrapper'>
      <div className='parcel-info--info--wrapper'>
        <div className='parcel-info--info'>
          <ul>
            <li>ID: {id}</li>
            <li>From: {from}</li>
            <li>To: {to}</li>
            <li>Location: {location}</li>
            <li>Weight: {weight}</li>
            <li>Total Distance: {distance}</li>
            <li>Price: {price}</li>
            <li>Created On: {createdOn}</li>
          </ul>
        </div>
      </div>
      <div className='parcel-info--map'>
        <Map initialCenter={initialCenter} pickupLocation={pickupLocation} destination={destination} />
      </div>
    </div>
  );
};

ParcelInfo.propTypes = {
  coords: PropTypes.array,
  parcel: PropTypes.object
};

export default ParcelInfo;
