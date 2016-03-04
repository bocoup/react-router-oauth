import React from 'react';
import {Link} from 'react-router';

const IndexPage = () => (
  <div>
    <p>This is the index page.</p>
    <p>You should be able to log out from this page, and then log back in.</p>
    <p><Link to="/subpage?foo=1&bar=2">Visit the subpage to test deep-link
      redirection and handling API errors.</Link></p>
  </div>
);

export default IndexPage;
