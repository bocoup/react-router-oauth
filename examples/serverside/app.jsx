import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory, match} from 'react-router';
import routes from './routes/root';
const {pathname, search, hash} = window.location;
const location = `${pathname}${search}${hash}`;

match({routes, location}, () => {
  ReactDOM.render(
    <Router routes={routes} history={browserHistory} />,
    document.querySelector('#root')
  );
});
