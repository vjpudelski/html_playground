import Token from "../classes/token.js";

const html = () => /*html*/`
  <canvas id="game" width="400" height="400"></canvas>
`;

export default class HomePage {
  constructor() {
    this.map = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
      0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
      0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
      0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];

    this.tileW = 40;
    this.tileH = 40;
    this.mapW = 10;
    this.mapH = 10;

    this.player = new Token();
  }

  init () {
    this.keysDown = {
      37 : false,
      38 : false,
      39 : false,
      40 : false
    };

    this.drawMap();

    document.addEventListener("keydown", (e) => this.keyDown(e));
    document.addEventListener("keyup", (e) => this.keyUp(e));  
  }

  render () {
    return html();
  }

  keyDown(e) {
    if(e.keyCode>=37 && e.keyCode<=40) { 
      this.keysDown[e.keyCode] = true; 
    }
  }

  keyUp(e) {
    if(e.keyCode>=37 && e.keyCode<=40) { 
      this.keysDown[e.keyCode] = false; 
    }
  }

  drawMap() {
    let ctx = document.querySelector('#game').getContext('2d');

    let currentFrameTime = Date.now();

    if(!this.player.processMovement(currentFrameTime))
    {
      if(this.keysDown[38] && this.player.tileFrom[1]>0 && this.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)]==1) { this.player.tileTo[1]-= 1; }
      else if(this.keysDown[40] && this.player.tileFrom[1]<(400-1) && this.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)]==1) { this.player.tileTo[1]+= 1; }
      else if(this.keysDown[37] && this.player.tileFrom[0]>0 && this.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])]==1) { this.player.tileTo[0]-= 1; }
      else if(this.keysDown[39] && this.player.tileFrom[0]<(400-1) && this.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])]==1) { this.player.tileTo[0]+= 1; }
  
      if(this.player.tileFrom[0]!=this.player.tileTo[0] || this.player.tileFrom[1]!=this.player.tileTo[1])
      { this.player.timeMoved = currentFrameTime; }
    }  

    for(var y = 0; y < this.mapH; ++y)
    {
      for(var x = 0; x < this.mapW; ++x)
      {
        switch(this.map[((y*this.mapW)+x)])
        {
          case 0:
            ctx.fillStyle = "#685b48";
            break;
          default:
            ctx.fillStyle = "#5aa457";
        }
  
        ctx.fillRect( x*this.tileW, y*this.tileH, this.tileW, this.tileH);
      }
    }
    
    for (var x = 0; x <= 400; x += 40) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 400);
    }

    for (var x = 0; x <= 400; x += 40) {
      ctx.moveTo(0, x);
      ctx.lineTo(400, x);
    }

    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    ctx.fillStyle = "#0000ff";
    ctx.fillRect(this.player.position[0], this.player.position[1],
    this.player.dimensions[0], this.player.dimensions[1]);

    requestAnimationFrame(this.drawMap.bind(this));
  }
  
  toIndex(x, y) {
    return((y * this.mapW) + x);
  }
}