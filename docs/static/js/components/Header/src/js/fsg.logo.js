import React, { Component } from 'react';
import {Link} from 'react-router';

import fsgLogo from '../img/fsg.logo.jpg';

import Logo from '@js-common-components/Logo';

export default () => {
  return (
    <Link
      to="/"
      className="header-logo"
    >
      <Logo
        ico={true}
        width={28}
      />

      <img
        src={fsgLogo}
        height={28}
        className="fsg-logo"
      />
    </Link>
  );
}
