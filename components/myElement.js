class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = /*html*/`
      <style>
        .myUser {
          color: #ff0000;
          list-style-type: circle;
        }
      </style>
      <div>
        <li class="myUser"><slot>this is some default text</slot></li>
      </div>
    `;
  }
  connectedCallback() {  }
  disconnectedCallback() {  }

  attributeChangeCallback() {  }
}
customElements.define('my-user', MyElement);