/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Parking.css';
import securityOn from './securityOn.svg';
import securityOff from './securityOff.svg';

class Parking extends React.Component {
  state = {
    fenceId: undefined,
  };

  componentDidMount() {
    this.fetchFence();
  }

  onFenceClick = () => {
    const antitheft = `/api/antitheft${this.state.fenceId
      ? `Off?fenceId=${this.state.fenceId}`
      : 'On'}`;

    this.setState({ fenceId: undefined });

    fetch(antitheft, {
      headers: {
        accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ ...res });
      });
  };

  fetchFence = () => {
    fetch('/api/activeFence', {
      headers: {
        accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ ...res });
      });
  };

  render() {
    return (
      <div
        className={s.securityParking}
        data-status={
          this.state.fenceId !== undefined
            ? this.state.fenceId ? 'on' : 'off'
            : ''
        }
      >
        <h1>Secure parking</h1>
        {this.state.fenceId === undefined
          ? <span>Please wait...</span>
          : <div>
              <p>
                Immobilizer is{' '}
                <strong>{this.state.fenceId ? 'On' : 'Off'}</strong>
              </p>
              <p>
                Perimeter alert is{' '}
                <strong>{this.state.fenceId ? 'On' : 'Off'}</strong>
              </p>
              <img
                src={this.state.fenceId ? securityOn : securityOff}
                alt="security"
                onClick={this.onFenceClick}
              />
            </div>}
        <p>
          When secure parking is active, you will be notified if your{' '}
          <b>smart</b> is moved.
        </p>
      </div>
    );
  }
}

export default withStyles(s)(Parking);
