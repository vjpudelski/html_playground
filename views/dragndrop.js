export default class DragNDropPage {
  init () {
    let players = document.querySelectorAll('.player');
    players.forEach(p => {
      this.addPlayerListeners(p);
    });

    let teams = document.querySelectorAll('.team');
    teams.forEach(t => {
      t.addEventListener('dragover', (e) => this.DragOver(e));
      t.addEventListener('dragleave', (e) => this.DragLeave(e));
      t.addEventListener('dragenter', (e) => console.log('ENTER'));
      t.addEventListener('drop', (e) => this.Drop(e));
    });
  }

  render () {
    return /*html*/`
      <style>
        .grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
        }
        .team {
          border: 1px solid #000000;
          border-radius: 5px;
          text-align: center;
          padding: 50px;
          margin: 10px;
          display: grid;
          grid-template-columns: 1fr;
          grid-wrap: wrap;
        }
        .player {
          border: 1px solid #0000ff;
          border-radius: 5px;
          margin: 10px;
          max-height: 1em;
        }
      </style>
      <h1>Drag N Drop</h1>
      <div class="grid">
        <div>
          <div class="player" draggable="true" data-id="1">1</div>
          <div class="player" draggable="true" data-id="2">2</div>
          <div class="player" draggable="true" data-id="3">3</div>
          <div class="player" draggable="true" data-id="4">4</div>
        </div>
        <div class="team" data-color="#ff0000"><div>Team 1</div></div>
        <div class="team" data-color="#00ff00"><div>Team 2</div></div>
        <div class="team" data-color="#0000ff"><div>Team 3</div></div>
      </div>
    `;
  }
  
  addPlayerListeners(player) {
    player.addEventListener('dragstart', (e) => this.startDrag(e));
    player.addEventListener('dragend', (e) => this.endDrag(e));
}

  startDrag(event) {
    let player = event.currentTarget;
    player.style.opacity = '0.4';

    event.dataTransfer.setData('text/plain', event.currentTarget.dataset.id);
  }

  endDrag(event) {
    let player = event.currentTarget;
    player.style.opacity = '';
  }

  DragOver(event) {
    event.preventDefault();
    let team = event.currentTarget;
    team.style.opacity = '0.4';
  }

  DragLeave(event) {
    let team = event.currentTarget;
    team.style.opacity = '';
  }

  Drop(event) {
    console.log("DROP");
    let id = event.dataTransfer.getData('text');

    let player = document.querySelector(`.player[data-id="${id}"]`);

    let playerCopy = document.querySelector(`.player[data-id="${id}"][data-clone="true"]`);
    if (!playerCopy){
      playerCopy = player.cloneNode(true);
      playerCopy.style.backgroundColor = '';
      playerCopy.style.opacity = '';
      playerCopy.dataset.clone = 'true';
    }

    this.addPlayerListeners(playerCopy);

    let team = event.currentTarget;

    team.appendChild(playerCopy);

    event.dataTransfer.clearData();
    
    team.style.opacity = '';
    player.style.backgroundColor = team.dataset.color;
    player.draggable = false;
  }
}