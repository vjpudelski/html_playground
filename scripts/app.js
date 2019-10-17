import Router from './router/router.js';

import home from '../views/home.js';
import about from '../views/about.js';
import user from '../views/user.js';

let router = new Router('history', [
  {
    name: '/',
    component: new home(),
    default: true
  },
  {
    name: '/about',
    component: new about()
  },
  {
    name: '/user/:id',
    component: new user()
  }
], 'app');

window.addEventListener('hashchange', (e) => {
  router.goToRoute(e.target.location.hash.substr(1));
});