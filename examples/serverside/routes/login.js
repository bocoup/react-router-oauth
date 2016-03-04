import LoginPage from '../components/login-page';
import auth from '../auth';

module.exports = {
  path: 'login',
  component: LoginPage,
  onEnter: auth.requireNoAuth,
};
