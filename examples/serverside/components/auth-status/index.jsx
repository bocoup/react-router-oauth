import React from 'react';
import {Link} from 'react-router';
import auth from '../../auth';

const AuthStatus = () => (
  <span>
    You are currently logged in. <Link to="/" onClick={auth.logout}>Log out</Link>
  </span>
);

export default AuthStatus;
