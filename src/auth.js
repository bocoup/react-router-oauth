import bindMethods from './bind-methods';

export default class Auth {
  constructor({
    browserHistory,
    key = 'credentials',
    loginRoute = '/login',
    loggedInRoute = '/',
    authUrl,
    parseCredentials,
  }) {
    this.browserHistory = browserHistory;
    this.key = key;
    this.loginRoute = loginRoute;
    this.loggedInRoute = loggedInRoute;
    this.authUrl = authUrl;
    this.parseCredentials = parseCredentials;
    // Simplify passing methods around.
    bindMethods(this);
  }

  // Store credentials for later retrieval.
  login(credentials) {
    if (!credentials) {
      throw new TypeError('Missing login credentials.');
    }
    const json = JSON.stringify(credentials);
    localStorage.setItem(this.key, json);
  }

  // Remove stored credentials. If `redirectBack` is true, logging in will
  // redirect back to the current route instead of the default `loggedInRoute`.
  // (use in cases where the user gets automatically logged out)
  logout({redirectBack} = {}) {
    localStorage.removeItem(this.key);
    // Redirect to the login page.
    if (this.browserHistory) {
      const nextPathname = redirectBack ? this.getRoutePath() : this.loggedInRoute;
      this.redirectToLogin({nextPathname});
    }
  }

  // Get stored credentials. If none are found, attempt to parse them from
  // the current environment, and then store them if found. If "exists" is
  // true, return a Boolean value based on whether or not they are stored.
  getCredentials({exists} = {}) {
    let json = localStorage.getItem(this.key);
    if (!json) {
      const credentials = this.parseCredentials();
      if (credentials) {
        this.login(credentials);
      }
      json = localStorage.getItem(this.key);
    }
    return exists ? Boolean(json) : json ? JSON.parse(json) : {};
  }

  // Do stored credentials exist? If none are found, attempt to parse them
  // from the current environment, and then store them if found.
  isLoggedIn() {
    return this.getCredentials({exists: true});
  }

  // Pass in a location object, and get back path + querystring as a string.
  // Don't pass in anything to use the current page's location object.
  getRoutePath({pathname, search = ''} = location) {
    return `${pathname}${search}`;
  }

  // Redirect to the login page. If `replace` is specified, that replace
  // function will be used, otherwise the specified `browserHistory` will be,
  // otherwise nothing will happen. `nextPathname` is the URL to redirect to
  // after successful login.
  redirectToLogin({replace, nextPathname}) {
    if (!replace) {
      replace = this.browserHistory && this.browserHistory.replace;
    }
    if (replace) {
      replace({
        pathname: this.loginRoute,
        state: {nextPathname},
      });
    }
  }

  // React-router onEnter handler. If the given route (or any child route) is
  // not authed, redirect to the specified `loginRoute`
  requireAuth(nextState, replace) {
      if (!this.isLoggedIn()) {
        const nextPathname = this.getRoutePath(nextState.location);
        this.redirectToLogin({replace, nextPathname});
      }
  }

  // React-router onEnter handler. If the given route (or any child route) is
  // authed, redirect to the specified `loggedInRoute`
  requireNoAuth(nextState, replace) {
      if (this.isLoggedIn()) {
        replace(this.loggedInRoute);
      }
  }
}
