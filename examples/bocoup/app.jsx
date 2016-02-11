import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';

import auth from './auth';

const Login = ({location: {state}}) => {
  const redirectTo = state && state.nextPathname;
  return (
    <div>
      <p>You must log in to use this app!</p>
      <a href={auth.authUrl(redirectTo)}>Log In</a>
    </div>
  );
};

const App = ({children}) => (
  <div>
    <h1>Bocoup API Auth Example</h1>
    <AuthStatus />
    <h2>Content</h2>
    {children}
  </div>
);

const AuthStatus = () => (
  <span>
    You are currently logged in. <Link to="/" onClick={auth.logout}>Log out</Link>
  </span>
);

const Index = () => (
  <div>
    <p>This is the index page.</p>
    <p>You should be able to log out from this page, and then log back in.</p>
    <p><Link to="/subpage?foo=1&bar=2">Visit the subpage to test deep-link
      redirection and handling API errors.</Link></p>
  </div>
);

function simulateApiError(event) {
  event.preventDefault();
  // This would normally be done in the error callback of an API Ajax request:
  auth.logout({redirectBack: true});
  // const {token} = auth.getCredentials();
  // request
  //   .get('/some-request')
  //   .set('Authorization', `Bearer ${token}`)
  //   .then(({body}) => {
  //     console.log(body);
  //   }, err => {
  //     if (err.status === 401) {
  //       auth.logout({redirectBack: true});
  //     }
  //     throw err;
  //   });
}

const SubPage = () => (
  <div>
    <p>This is the subpage.</p>
    <h3>Deep-link Redirection</h3>
    <ol>
      <li>Note the URL to this page, and copy it to the clipboard.</li>
      <li>Click the "Log out" link.</li>
      <li>Paste the URL you copied into the address bar. You should be redirected to the login page.</li>
      <li>Click the "Log in" link.</li>
      <li>You should be redirected to GitHub*, then back to the original page, with the query string intact.</li>
    </ol>
    <h3>Handling API 401 Errors</h3>
    <ol>
      <li>Note the URL to this page.</li>
      <li>Click <Link to="/" onClick={simulateApiError}>Simulate an API error</Link>.</li>
      <li>You should be redirected to the login page.</li>
      <li>Click the "Log in" link.</li>
      <li>You should be redirected to GitHub*, then back to the original page, with the query string intact.</li>
    </ol>
    <p><i>* Unless the Bocoup API remembers you from a previous login.</i></p>
    <p><Link to="/">Return to the index.</Link></p>
  </div>
);

const routes = (
  <Router history={browserHistory}>
    <Route path="/login" component={Login} onEnter={auth.requireNoAuth} />
    <Route path="/" component={App} onEnter={auth.requireAuth}>
      <IndexRoute component={Index} />
      <Route path="subpage" component={SubPage} />
    </Route>
  </Router>
);

render(routes, document.getElementById('root'));
