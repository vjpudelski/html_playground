import Router from './router/router.js';

import home from '../views/home.js';
import about from '../views/about.js';
import user from '../views/user.js';
import usersdb from '../views/usersdb.js';
import login from '../views/login.js';
import tables from '../views/tables.js';
import grid from '../views/grid.js';
import dragndrop from '../views/dragndrop.js';

let router = new Router('history', [  // eslint-disable-line no-unused-vars
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
  },
  {
    name: '/person/:id/this/:name',
    component: new user()
  },
  {
    name: '/login',
    component: new login()
  },
  {
    name: '/tables',
    component: new tables()
  },
  {
    name: '/grid',
    component: new grid()
  },
  {
    name: '/dragndrop',
    component: new dragndrop()
  }
], 'app');
