import React, { Component } from 'react';
import { Map, Marker, Polyline, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    const { initialCenter, destination, pickupLocation, google } = this.props;
    return (
      <Map
        zoom={14}
        style={mapStyles}
        initialCenter={initialCenter}
        google={google}
      >
        <Marker
          animation= {google.maps.Animation.BOUNCE}
          name={'Current Location'}
          position={initialCenter} />
        <Marker
          name={'Pickup Location'}
          position={pickupLocation} />
        <Marker />
        <Marker
          name={'Destination'}
          position={destination} />
        <Marker />
        <Polyline
          path={[pickupLocation, initialCenter]}
          strokeColor='hsl(120, 50%, 75%)'
          strokeOpacity={0.8}
          strokeWeight={2} />
        <Polyline
          path={[initialCenter, destination]}
          strokeColor='hsl(0, 50%, 60%)'
          strokeOpacity={0.8}
          strokeWeight={2} />
      </Map>
    );
  }
}

MapContainer.propTypes = {
  google: PropTypes.object,
  initialCenter: PropTypes.object,
  pickupLocation: PropTypes.object,
  destination: PropTypes.object,
}

export default GoogleApiWrapper(({ initialCenter }) => ({
  apiKey: process.env.GOOGLE_API_KEY,
  initialCenter
}))(MapContainer);
