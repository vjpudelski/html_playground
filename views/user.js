import {users} from '../data/users.js';

export default class UserPage {
  constructor() {
    this.users = users;
  }

  render (props) {
    let user = this.users.find(x => x.id == props.id);
    
    return /*html*/`
      <h1>User Page</h1>
      <h3>User (${ user.username }) with the id of ${ user.id }</h3>
    `;
  }
}
