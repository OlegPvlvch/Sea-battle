import React from 'react';


export default function Square(props){
    const {x, y, containsShip, isVisible, isOccupied, shot} = props;
  
    let marker;
    let containsShipClass = '';

    if(shot){
      if(containsShip){
        marker = 'X';
        containsShipClass = 'square-ship-alive';
      }
      else marker = '•';
    }
    else{
      if(isVisible && containsShip){
        containsShipClass = 'square-ship-alive';
      }
      else if(isOccupied) marker = '#';//containsShipClass = 'square-occupied';
      else marker = '';
    }

    return (
      <button id={`${x}-${y}`} className={`square ${containsShipClass}`} onClick={props.onClick}>
        {marker}
      </button>
    );
  }