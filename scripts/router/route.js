'use strict';

function Route(name, htmlName, defaultRoute){
  try{
    if (!name || !htmlName){
      throw 'eror: need to know where to go';
    }

    this.constructor (name, htmlName, defaultRoute);
  } catch(e) {
    console.error(e);
  }
}

Route.prototype = {
  name: undefined,
  htmlName: undefined,
  default: undefined, 
  constructor: function (name, htmlName, defaultRoute) {
    this.name = name;
    this.htmlName = htmlName;
    this.default = defaultRoute;
  },
  isActiveRoute: function (hashedPath) {
    return hashedPath.replace('#', '') === this.name;
  },
  renderView: function (element) {
    var url = './views/' + this.htmlName, 
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        element.innerHTML = this.responseText;
      }
    };

    xhttp.open('GET', url, true);
    xhttp.send();
  }
}