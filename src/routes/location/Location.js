import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import { setGeo } from '../../actions/smart';
import s from './Location.css';
import car from './car.svg';

class Location extends React.Component {
  componentDidMount() {
    this.fetchLocation();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  timeoutId = undefined;

  fetchLocation = () => {
    fetch('/api/localize', {
      headers: {
        accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        this.props.onSetGeo(res);
        this.timeoutId = setTimeout(this.fetchLocation, 1000);
      });
  };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={{ lat: this.props.latitude, lng: this.props.longitude }}
        defaultZoom={16}
        bootstrapURLKeys={{ key: 'AIzaSyCp5S1x6L2f7dmH54SiAhoDupZlT1e1YI0' }}
      >
        <img
          className={s.icon}
          width={80}
          src={car}
          alt="car"
          lat={this.props.latitude}
          lng={this.props.longitude}
          text={'mysmart'}
        />
      </GoogleMapReact>
    );
  }
}

Location.propTypes = {
  onSetGeo: PropTypes.func.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  ...state.smart.geo,
});

const mapActionsToProps = {
  onSetGeo: setGeo,
};

export default compose(
  withStyles(s),
  connect(mapStateToProps, mapActionsToProps),
)(Location);
