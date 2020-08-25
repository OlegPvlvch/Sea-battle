export default class Ship{
  constructor(fc){
    this.shipname 	= fc.shipname;
    this.decks		= fc.decks;
    this.horizontal = -1;
    this.matrix		= [];
  }
  setHorizontal(num){
    this.horizontal=num;
  }
}