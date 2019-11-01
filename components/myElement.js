class MyElement extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({mode: 'open'});
    let listStyle = this.getAttribute('listStyle') ? this.getAttribute('listStyle') : 'cicle';

    this.shadowRoot.innerHTML = /*html*/`
      <style>
        .myUser {
          color: #ff0000;
          list-style-type: ${listStyle};
        }
      </style>
      <div>
        <li class="myUser"><slot>this is some default text</slot></li>
      </div>
    `;
  }
  connectedCallback () {  }
  disconnectedCallback () {  }

  attributeChangeCallback () {  }

  adoptedCallback () { }
}
customElements.define('my-user', MyElement);