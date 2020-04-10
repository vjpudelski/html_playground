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
        .container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        .col {
          border: 1px solid #000000;
          height: 100px;
          max-width: 500px;
          position: relative;
        }

        .col-2 {
          grid-column: span 2;
          max-width: 1000px;
        }

        .row-2 {
          grid-row: span 2;
          height: 202px;
        }
        
      </style>
      <h1>Responsive Grid Page</h1>
      <div class="container">
        <div class="col">One</div>
        <div class="col">Two</div>
        <div class="col">Three</div>
        <div class="col row-2">Four</div>
        <div class="col">Five</div>
        <div class="col col-2">Six</div>
        <div class="col">Seven</div>
        <div class="col">Eight</div>
      </div>
      <div class="container">
        <div class="col">Nine</div>
        <div class="col">Ten</div>
        <div class="col">Eleven</div>
        <div class="col">Twelve</div>
      </div>
    `;
  }
}