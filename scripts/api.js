const url = 'https://localhost:5001';

let getUsers = () => fetch(url + '/api/users/');

let addUser = (user) => fetch(url + '/api/users/', {
  headers: {'Content-Type': 'application/json; charset=utf-8'},
  method: 'POST',
  body: user
});

export default {getUsers, addUser};