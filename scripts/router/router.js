'use strict';

function Router(routes, rootElem){
  try{
    if (!routes) {
      throw 'eror: need to know where to go and how to get there';
    }

    this.constructor ('history', routes, rootElem);
    this.init();
  } catch(e) {
    console.error(e);
  }
}

Router.prototype = {
  mode: undefined,
  routes: undefined, 
  rootElem: undefined,
  defaultRoute: undefined,
  constructor: function (mode, routes, rootElem) {
    this.mode = mode && mode == 'history' && !!(history.pushState) ? 'history' : 'hash';
    this.routes = routes;
    this.rootElem = document.getElementById(rootElem);

    for(var i = 0, length = routes.length; i < length; i++){
      var route = routes[i];
      if (route.default){
        this.defaultRoute = route;
      }
    }   
  },
  init: function () {
    var r = this.routes;
    (function (scope, r) {
      window.addEventListener('hashchange', (e) => {
        scope.hasChanged(scope, r);
      });

      // history mode code... 
      // window.addEventListener('popstate', (e) => {
      //   console.log(window.location.pathname);
      //   console.log(e.state);
      //   goToRoute(e.state.htmlName);
      // });
      // history.pushState({}, route.name, window.location.origin + route.name);

    })(this, r);
    this.hasChanged(this, r);
  },
  hasChanged: function (scope, r) {
    var route = undefined;
    for(var i = 0, length = r.length; i < length; i++){
      if (r[i].isActiveRoute(window.location.hash.substr(1))) {
        route = r[i];
        break;
      }
    }

    route = route ? route : this.defaultRoute;

    scope.goToRoute(route);
  },
  goToRoute: function (route) {
    (function(scope) {
      route.renderView(scope.rootElem)
    })(this);
  }
}