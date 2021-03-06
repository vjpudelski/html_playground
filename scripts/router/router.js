export default class Router {
  constructor (mode, routes, rootElem) {
    this.mode = mode && mode == 'history' && !!(history.pushState) ? 'history' : 'hash';
    this.routes = routes;
    this.rootElem = document.getElementById(rootElem);

    for(var i = 0, length = routes.length; i < length; i++){
      let route = routes[i];
      if (route.default){
        this.defaultRoute = route;
      }
    }

    this.goToRoute(window.location.hash);
    this.addEventListeners();
  }

  addEventListeners () {
    window.addEventListener('hashchange', (e) => {
      this.goToRoute(e.target.location.hash);
    });
  }

  getRouteFromPath (path) {
    let route = undefined;

    let paramsNames = [];
    let params = {};

    console.log(paramsNames);
    for(var i = 0, length = this.routes.length; i < length; i++){
      paramsNames = [];

      let regexPath = this.routes[i].name.replace(/([:*])(\w+)/g, 
        (full, colon, name) => {
          paramsNames.push(name);
          return '([^\/]+)';  // eslint-disable-line no-useless-escape
        }) + '(?:\/|$)';      // eslint-disable-line no-useless-escape

      let matchPath = path.match(new RegExp(regexPath));

      if (matchPath !== null){
        params = matchPath
          .splice(1)
          .reduce((params, value, index) => {
            if (params === null) params = {};
            params[paramsNames[index]] = value;
            return params;
          }, null);

        route = this.routes[i];
        break;
      }
    }

    route = route ? route : this.defaultRoute;
    return {route, params};
  }

  goToRoute (path) {
    let nav = this.getRouteFromPath(path);
    this.rootElem.innerHTML = nav.route.component.render(nav.params);
    nav.route.component.init();
  }
}
