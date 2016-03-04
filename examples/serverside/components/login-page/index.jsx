import React from 'react';
import auth from '../../auth';

const LoginPage = ({location: {state}}) => {
  const redirectTo = state && state.nextPathname;
  return (
    <div>
      <p>You must log in to use this app!</p>
      <a href={auth.authUrl(redirectTo)}>Log In</a>
    </div>
  );
};

export default LoginPage;
