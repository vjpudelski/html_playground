'use strict';

(function () {
  function init() {
    var router = new Router([
      new Route('/', 'home.html', true),
      new Route('/about', 'about.html'),
      new Route('/user/:id', 'user.html') // not working
    ], 'app');
  }
  init();
}());
