const html_element = (data) => /*html*/`
  <tr><td>${data}</td></tr>
`;

export default class TablesPage {
  elements = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"];

  init() {
    document.querySelector("tbody").innerHTML += `
      ${this.elements.map(e => html_element(e)).join('')}
    `;
  }

  render() {
    return /*html*/`
      <style>
        table {
          border: .1em solid #000000;
        }
        thead {
          background-color: #ffff00;
        }
        td {
          border: .1em solid #000000;
          width: 40%;
        }
      </style>
      <h1>THIS IS Tables PAGE</h1>
      <table>
        <thead>
          <tr>
            <td rowspan="2">2 Row Header</td>
            <td>Another Header</td>
          </tr>
          <tr>
            <td>Bottom Header</td>
          <tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="5">This <br /><br /><br /><br /><br /></td>
        </tbody>
      </table>
    `;
  }
}