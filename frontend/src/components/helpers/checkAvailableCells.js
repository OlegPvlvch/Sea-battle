export default (field, x, y, ship) => {
    let cells = [];
    
    let rows = [];
    for(let i=0;i<4;i++) rows.push([]);

    for(let i=1; i<ship.decks; i++){

        if(field[x-i] && !field[x-i][y].containsShip){
            rows[0].push([x-i, y]);//push(field[x-i][y]);
        }
        if(field[x][y+i] && !field[x][y+i].containsShip){
            rows[1].push([x, y+i]);//push(field[x][y+i]);
        }
        if(field[x+i] && !field[x+i][y].containsShip){
            rows[2].push([x+i, y]);//push(field[x+i][y]);
        }
        if(field[x][y-i] && !field[x][y-i].containsShip){
            rows[3].push([x, y-i]);//push(field[x][y-i]);
        }
        
    }
    console.log(rows);
    
    // if(ship.matrix !== []){
    //     if(ship.decks > 1 && ship.matrix.length === 2){
    //         ship.matrix[0][0] === ship.matrix[1][0] ? 
    //         ship.setHorizontal(1) : ship.setHorizontal(0);
    //     }
    // }

    if(ship.horizontal === 1){
        cells.push(rows[1][0]);
        cells.push(rows[3][0]);
    }
    else if(ship.horizontal === 0){
        cells.push(rows[0][0]);
        cells.push(rows[2][0]);
    }
    else{
        for(let row of rows){
            if(row.length - 1 === ship.decks - ship.matrix.length){
                cells.push(row);
           }
        }
    }

    return cells;
}