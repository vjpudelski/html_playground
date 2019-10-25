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

    this.getRouteFromWindow();
    this.addEventListeners();
  }

  addEventListeners () {
    window.addEventListener('hashchange', (e) => {
      console.log(e.target.location);
      this.goToRoute(e.target.location.hash.substr(1));
    });
  }

  getRouteFromWindow () {
    let path = window.location.hash.substr(1);
    if (path != '')
    {
      this.goToRoute(path);
    }
    else{
      this.goToRoute(this.defaultRoute.name);
    }
  }

  getRouteFromPath (path) {
    console.log('Path: ' + path);
    let route = undefined;

    let paramsNames = [];
    let params = {};

    for(var i = 0, length = this.routes.length; i < length; i++){
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

    console.log(route);
    route = route ? route : this.defaultRoute;
    return {route, params};
  }

  goToRoute (path) {
    let nav = this.getRouteFromPath(path);
    this.rootElem.innerHTML = nav.route.component.render(nav.params);
    nav.route.component.init();
  }
}
