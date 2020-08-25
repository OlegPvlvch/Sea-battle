import React from 'react';


export default function Square(props){
    const {x, y, containsShip, isVisible, isOccupied, shot} = props;
  
    let marker;

    if(shot){
      if(containsShip){
        marker = 'X';
      }
      else marker = '•';
    }
    else{
      if(isVisible && containsShip) marker = '☐';
      else if(isOccupied) marker = '#';
      else marker = '';
    }

    return (
      <button id={`${x}-${y}`} className={"square"} onClick={props.onClick}>
        {marker}
      </button>
    );
  }