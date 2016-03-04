import App from '../components/app';
import IndexPage from '../components/index-page';
import auth from '../auth';
import LoginRoute from './login';
import loadSubpageRoute from 'bundle-loader?lazy!./sub-page';

export default [
  LoginRoute,
  {
    path: '/',
    onEnter: auth.requireAuth,
    component: App,
    getChildRoutes(location, cb) {
      // when this child route is called, the './sub-page' route is loaded
      loadSubpageRoute(file => {
        cb(null, [file]);
      });
    },
    indexRoute: {
      component: IndexPage,
    },
  },
] ;
