export default class LoginPage {
  constructor() {
  }

  init() {
    document.getElementById('submit')
      .addEventListener('click', () => this.login());
  }

  render(props) {
    return /*html*/`
      <h1>Login</h1>
      <label>company id</label><br />
      <input type="text" id="company" value="1" /><br />
      <label>username</label><br />
      <input type="text" id="username" value="bob" /><br />
      <label>password</label><br />
      <input type="password" id="password" value="Password3" /><br />
      <button id="submit">Login</button>
    `;
  }

  login() {
    var company = document.getElementById('company').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log(`${company} | ${username} | ${password}`);

    var user = `{
      "UserName": "${username}",
      "Password": "${password}",
      "CompanyId": "${parseInt(company)}"
    }`;

    console.log(user);

    fetch('https://localhost:5001/api/users/login/buyer', {
      headers: {
        'Content-Type':'application/json;',
      },
      method: 'POST',
      body: user
    })
    .then( resp => resp.json())
    .then( (data) => {
      console.log(data);
    })
    .catch(error => {
      console.log(`Error: ${error.status} - ${error.statusText}`);
    });

  }
}
