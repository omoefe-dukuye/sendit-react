import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import Parcel from './Parcel';
import './styles.scss';

const AllParcels = ({ parcels }) => (
  <ol>
    {parcels.map(parcel => <Parcel key={uuid()} parcel={parcel} />)}
  </ol>
);

AllParcels.propTypes = {
  parcels: PropTypes.array
};

export default AllParcels;
