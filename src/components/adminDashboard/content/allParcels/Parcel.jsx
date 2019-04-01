import React from 'react';
import PropTypes from 'prop-types';

const Parcel = ({ parcel: {
  id,
  pickup_location: from,
  destination: to,
  weight,
  distance,
  price,
  status,
  sent_on: created,
  delivered_on: delivered
}}) => (
  <li>
    <table>
      <tbody>
        <tr>
          <th>ID</th><td>{id}</td>
        </tr><tr>
          <th>Weight</th><td>{weight} kg</td>
        </tr><tr>
          <th>From</th><td>{from}</td>
        </tr><tr>
          <th>To</th><td>{to}</td>
        </tr><tr>
          <th>Distance</th><td>{distance} km</td>
        </tr><tr>
          <th>Price</th><td>{price}</td>
        </tr><tr>
          <th>Status</th><td>{status}</td>
        </tr><tr>
          <th>Created</th><td>{created}</td>
        </tr><tr>
          <th>Delivered</th><td>{delivered}</td>
        </tr>
      </tbody>
    </table>
  </li>
);

Parcel.propTypes = {
  parcel: PropTypes.object
};

export default Parcel;
