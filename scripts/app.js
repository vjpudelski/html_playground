import Router from './router/router.js';

import home from '../views/home.js';
import about from '../views/about.js';
import user from '../views/user.js';
import usersdb from '../views/usersdb.js';

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
  },
  {
    name: '/usersdb',
    component: new usersdb()
  }
], 'app');

sessionStorage.setItem('apiURL', 'https://localhost:5001');