import React from 'react';
import {Link} from 'react-router';
import auth from '../../auth';

const SubPage = () => {
  function simulateApiError(event) {
    event.preventDefault();
    // This would normally be done in the error callback of an API Ajax request:
    auth.logout({redirectBack: true});
  }
  return (
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
};

export default SubPage;
