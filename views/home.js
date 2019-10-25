export default class HomePage {
  init () {
    document.getElementById('sayhi')
      .addEventListener('click', () => {
        console.log('hi');
      });
  }

  render () {
    return /*html*/`
      <h1>THIS IS HOME PAGE</h1>
      <button id="sayhi">Alert</button>
    `;
  }
}