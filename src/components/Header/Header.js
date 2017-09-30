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
import s from './Header.css';
import Link from '../Link';
import logoUrl from './logo.svg';
import gps from './gps.svg';
import security from './security.svg';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Link to="/">
            <img src={logoUrl} alt="mysmart status" />
          </Link>
          <Link to="/location">
            <img src={gps} alt="mysmart location" />
          </Link>
          <Link to="/parking">
            <img src={security} alt="mysmart security" />
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
