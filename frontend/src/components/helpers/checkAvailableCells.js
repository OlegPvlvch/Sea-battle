export default (field, x, y, ship) => {
  let cells = [];
  let rows = [];
  for(let i=0;i<4;i++) rows.push([]);

  let top_cells = rows[0], right_cells = rows[1], bottom_cells = rows[2], left_cells = rows[3];
  for(let i=1; i<ship.decks; i++){
    let top = field[x-i], 
        right = field[x][y+i], 
        bottom = field[x+i], 
        left = field[x][y-i];
    if(top && !top[y].containsShip && !top[y].isOccupied){
      top_cells.push([x-i, y]);
    }
    if(right && !right.containsShip && !right.isOccupied){
      right_cells.push([x, y+i]);
    }
    if(bottom && !bottom[y].containsShip && !bottom[y].isOccupied){
      bottom_cells.push([x+i, y]);
    }
    if(left && !left.containsShip && !left.isOccupied){
      left_cells.push([x, y-i]);
    }
  }

  if(ship.decks > 1 && ship.matrix.length > 1){
    ship.matrix[0][0] === ship.matrix[1][0] ? 
    ship.setHorizontal(1) : ship.setHorizontal(0);
  }

  if(ship.horizontal === 1){
    cells.push(right_cells[0]);
    cells.push(left_cells[0]);
  }
  else if(ship.horizontal === 0){
    cells.push(top_cells[0]);
    cells.push(bottom_cells[0]);
  }
  else{
    if(right_cells.length+left_cells.length >= ship.decks - 1){
      cells.push(right_cells[0]);
      cells.push(left_cells[0]);
    }
    if(top_cells.length+bottom_cells.length >= ship.decks - 1){
      cells.push(top_cells[0]);
      cells.push(bottom_cells[0]);
    }
  }

  return cells;
}