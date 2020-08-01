class Ship{
    constructor(size, head={y:null, x:null}){
        this.size = size;
        this.head = head;
        this.hp = this.size;
        this.is_alive = true;
    }
}