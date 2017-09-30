import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setFullStatus } from '../../actions/smart';
import s from './Home.css';
import noDoors from './noDoors.svg';
import leftDoor from './leftDoor.svg';
import rightDoor from './rightDoor.svg';
import trunk from './trunk.svg';
import iconBattery from './icon-battery.svg';
import iconFuel from './icon-fuel.svg';

class Home extends React.Component {
  componentDidMount() {
    this.fetchStatus();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '/' })
        .then(reg => {
          // cool
        })
        .catch(error => {
          // oh, poop...
        });
    }

    if ('Notification' in window) {
      if (Notification.permission !== 'denied') {
        Notification.requestPermission(() => {
          // okidoki
        });
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  timeoutId = undefined;

  fetchStatus = () => {
    fetch('/api/status', {
      headers: {
        accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        this.props.onSetFullStatus(res);
        this.timeoutId = setTimeout(this.fetchStatus, 1000);
      });
  };

  render() {
    const cssFuel = s[`level${(this.props.fuelLevel / 10).toFixed(0)}`];
    return (
      <div>
        <div className={s.container}>
          <img
            src={trunk}
            alt="trunk"
            className={
              this.props.doors.trunkOpen ? s.trunkOpened : s.trunkClosed
            }
          />
          <img src={noDoors} alt="no doors" className={s.noDoors} />
          <img
            src={leftDoor}
            alt="left door"
            className={
              this.props.doors.leftOpen ? s.leftDoorOpened : s.leftDoorClosed
            }
          />
          <img
            src={rightDoor}
            alt="right door"
            className={
              this.props.doors.rightOpen ? s.rightDoorOpened : s.rightDoorClosed
            }
          />
          {this.props.batteryLevel < 12.3
            ? <img
                src={iconBattery}
                alt="battery indicator"
                className={s.batteryIndicator}
              />
            : null}
          <div className={s.fuelHolder}>
            <img src={iconFuel} alt="fuel" />
            <div className={`${s.fuelIndicator} ${cssFuel}`} />
          </div>
          <div className={s.mileage}>
            {this.props.mileage
              ? this.props.mileage.toLocaleString('en-US')
              : '---'}{' '}
            KM
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  onSetFullStatus: PropTypes.func.isRequired,
  doors: PropTypes.shape({
    leftOpen: PropTypes.bool.isRequired,
    rightOpen: PropTypes.bool.isRequired,
    trunkOpen: PropTypes.bool.isRequired,
    locked: PropTypes.bool.isRequired,
    allClosed: PropTypes.bool.isRequired,
  }).isRequired,
  batteryLevel: PropTypes.number.isRequired,
  engineOn: PropTypes.bool.isRequired,
  immobilizerEngaged: PropTypes.bool.isRequired,
  fuelLevel: PropTypes.number.isRequired,
  mileage: PropTypes.number.isRequired,
  powerState: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  ...state.smart,
});

const mapActionsToProps = {
  onSetFullStatus: setFullStatus,
};

export default compose(
  withStyles(s),
  connect(mapStateToProps, mapActionsToProps),
)(Home);
