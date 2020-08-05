import Ship from './Ship';


export default (shipsData) => {
    let shipSet = [];
    for(let ship of shipsData){
        for(let j=0; j<ship[0]; j++){
            shipSet.push(
                new Ship({
                    shipname: ship[2] + String(j+1),
                    decks: ship[1],
                })
            );
        }
    }
    return shipSet;
}