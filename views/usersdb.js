export default class UserPage {
  constructor () {
    this.users = null;
  }

  init () {
    this.getUsers();
    document.getElementById('usersdb.add')
      .addEventListener('click', () => this.addUser());
  }

  render () {
    return /*html*/`
        <h1>Users Page</h1>
        <input id="usersdb.userToAdd" />
        <button id="usersdb.add">Add</button>
        <ul id="usersdb.users">
        </ul>
        `;
  }

  renderUsers () {
    document.getElementById('usersdb.users').innerHTML = `
      ${this.users ? 
        this.users.map(user => /*html*/`<my-user>${user.userName}</my-user>`)
          .join('')
        : ''
      }`; 
  }

  getUsers () {
    var instance = this;
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        instance.users = JSON.parse(xmlhttp.responseText);
        instance.renderUsers();         
      }
    };
        
    xmlhttp.open('GET', sessionStorage.getItem('apiURL') + '/api/users/');
    xmlhttp.send();
  }

  addUser () {
    var instance = this;
    let user = document.getElementById('usersdb.userToAdd');

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        user.value = '';
        instance.getUsers();
      }
    };
        
    xmlhttp.open('POST', sessionStorage.getItem('apiURL') + '/api/users/');
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(`{"username": "${user.value}"}`);
  }
}
