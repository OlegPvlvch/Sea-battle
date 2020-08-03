export default class Ship{
    constructor(fc){
        this.shipname 	= fc.shipname;
        this.decks		= fc.decks;
        this.horizontal = -1;
        this.x0			= 0;
        this.y0			= 0;
        // массив с координатами палуб корабля
        this.matrix		= [];
    }

    setHead(x, y){
        this.x0 = x;
        this.y0 = y;
    }
    setHorizontal(num){
        this.horizontal=num;
    }
}