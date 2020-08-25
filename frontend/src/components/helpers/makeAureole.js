export default function makeAureole(field, ship){
    let new_field = field.slice();
    for(let cell of ship.matrix){
        let x = cell[0], y = cell[1];
        let top = new_field[x-1], right = new_field[x][y+1],
            bottom = new_field[x+1], left = new_field[x][y-1];
        if(top){
            top[y].isOccupied = true;
            if(top[y-1]) top[y-1].isOccupied = true;
            if(top[y+1]) top[y+1].isOccupied = true;
        }
        if(right){
            right.isOccupied = true;
        }
        if(bottom){
            bottom[y].isOccupied = true;
            if(bottom[y-1]) bottom[y-1].isOccupied = true;
            if(bottom[y+1]) bottom[y+1].isOccupied = true;
        }
        if(left){
            left.isOccupied = true;
        }
    }
    return new_field;
}