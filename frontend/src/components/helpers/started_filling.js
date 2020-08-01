export default(field = []) => {
    for (let i = 0; i < 10; i++) {
        field.push([]);
    }
    for(let i=0;i<10;i++){
      for(let j=0;j<10;j++){
        field[i].push({
            x: j,
            y: i,
            containsShip: true,
            isVisible: false,
        });
      }
    }
    //return field;
}