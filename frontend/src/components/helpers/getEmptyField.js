export default(size = 10) => {
    let field = [];
    for(let i=0;i<size;i++){
      field.push([]);
      for(let j=0;j<size;j++){
        field[i].push({
            x: i,
            y: j,
            containsShip: false,
            isVisible: false,
            shot: false,
        });
      }
    }
    return field;
}