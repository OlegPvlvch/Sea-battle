export default (field, x, y, ship) => {
    let cells = [];
    // for(let i=0; i<field.length; i++){
    //     for(let j=0; j<field[0].length; j++){

    //     }
    // }
    let rows = [];
    for(let i=0;i<4;i++) rows.push([]);

    for(let i=1; i<ship.decks; i++){

        if(field[x-i] && !field[x-i][y].containsShip){
            rows[0].push(field[x-i][y]);
        }
        if(field[x+i] && !field[x+i][y].containsShip){
            rows[1].push(field[x+i][y]);
        }
        if(field[x][y-i] && !field[x][y-i].containsShip){
            rows[2].push(field[x][y-i]);
        }
        if(field[x][y+i] && !field[x][y+i].containsShip){
            rows[3].push(field[x][y+i]);
        }
    }
    // for(row of rows){
    //     if(row.length === ship.decks-1){
    //         cells.push(row);
    //     }
    // }
    if(ship.matrix.length === 2){
        ship.matrix[0][0] === ship.matrix[1][0] ? 
        ship.setHorizontal(1) : ship.setHorizontal(0);
    }

    if(ship.horizontal === 1){
        cells.push(rows[2].concat(rows[3]));
    }
    else if(ship.horizontal === 0){
        cells.push(rows[0].concat(rows[1]));
    }
    else{
        for(let row of rows){
            row = row.slice(0, row.length - ship.matrix.length+1)
            if(row.length === ship.decks - ship.matrix.length){
                cells = cells.concat(row);
            }
        }
    }
    return cells;
}