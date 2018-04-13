import React, { Component } from 'react';
import { Link } from 'react-router';

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
    </Link>
  );
}
