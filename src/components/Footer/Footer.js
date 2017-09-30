/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setDoorsLockState } from '../../actions/smart';
import lockedIcon from './icon-locked-180.svg';
import unlockedIcon from './icon-unlocked-180.svg';
import lightIcon from './icon-light-180.svg';

import s from './Footer.css';

class Footer extends React.Component {
  onDoorsClicked = () => {
    fetch(`/api/${this.props.doorsLocked ? 'unlock' : 'lock'}`, {
      headers: {
        accept: 'application/json',
      },
    }).then(() => {
      this.props.onSetDoorsLocked(!this.props.doorsLocked);
    });
  };

  onBlinkClicked = () => {
    fetch(`/api/blink`, {
      headers: {
        accept: 'application/json',
      },
    }).then(() => {
      // okidoki
    });
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <img
            src={this.props.doorsLocked ? unlockedIcon : lockedIcon}
            alt="Lock/Unlock"
            onClick={this.onDoorsClicked}
          />
          <img src={lightIcon} alt="Blink" onClick={this.onBlinkClicked} />
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  doorsLocked: PropTypes.bool.isRequired,
  onSetDoorsLocked: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  doorsLocked: state.smart.doors.locked,
});

const mapActionsToProps = {
  onSetDoorsLocked: setDoorsLockState,
};

export default compose(
  withStyles(s),
  connect(mapStateToProps, mapActionsToProps),
)(Footer);
