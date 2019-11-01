import api from '../scripts/api.js';

const html = () => /*html*/`
  <h1>Users Page</h1>
  <input id="usersdb.userToAdd" />
  <button id="usersdb.add">Add</button>
  <ul id="usersdb.users">
  </ul>
`;

const html_user = (user) => /*html*/`
  <my-user listStyle='square'>${user.userName}</my-user>
`;

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
    return html();
  }

  renderUsers () {
    document.getElementById('usersdb.users').innerHTML = `
      ${this.users ? 
        this.users.map(user => html_user(user))
          .join('')
        : ''
      }`; 
  }

  getUsers () {
    api.getUsers()
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText
          });
        }
      })
      .then(data => {
        console.log(data);
        this.users = data;
        this.renderUsers();
      })
      .catch(error => {
        console.log(`Error: ${error.status} - ${error.statusText}`);
      });
  }

  addUser () {
    let user = document.getElementById('usersdb.userToAdd');

    api.addUser(`{"username": "${user.value}"}`)
      .then(() => {
        user.value = '';
        this.getUsers();
      })
      .catch(error => {
        console.log(`Error: ${error.status} - ${error.statusText}`);
      });
  }
}
