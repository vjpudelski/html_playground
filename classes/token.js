export default class Token {
  constructor() {
    this.tileFrom	= [1,1];
    this.tileTo		= [1,1];
    this.timeMoved	= 0;
    this.dimensions	= [30,30];
    this.position	= [45,45];
    this.delayMove	= 700;
    this.cell = 40;
  }

  placeAt(x, y) {
    this.tileFrom	= [x,y];
    this.tileTo		= [x,y];
    this.position	= [((this.cell*x)+((this.cell-this.dimensions[0])/2)),
    ((this.cell*y)+((this.cell-this.dimensions[1])/2))];
  }

  processMovement(t) {
    if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }

    if((t-this.timeMoved)>=this.delayMove)
    {
      this.placeAt(this.tileTo[0], this.tileTo[1]);
    }
    else
    {
      this.position[0] = (this.tileFrom[0] * this.cell) + ((this.cell-this.dimensions[0])/2);
      this.position[1] = (this.tileFrom[1] * this.cell) + ((this.cell-this.dimensions[1])/2);

      if(this.tileTo[0] != this.tileFrom[0])
      {
        var diff = (this.cell / this.delayMove) * (t-this.timeMoved);
        this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
      }
      if(this.tileTo[1] != this.tileFrom[1])
      {
        var diff = (this.cell / this.delayMove) * (t-this.timeMoved);
        this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
      }

      this.position[0] = Math.round(this.position[0]);
      this.position[1] = Math.round(this.position[1]);
    }

    return true;
  }
}