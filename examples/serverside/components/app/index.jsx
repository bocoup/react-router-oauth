import React from 'react';
import AuthStatus from '../auth-status';

const App = ({children}) => (
  <div>
    <h1>Bocoup API Auth Example</h1>
    <AuthStatus />
    <h2>Content</h2>
    {children}
  </div>
);

export default App;
