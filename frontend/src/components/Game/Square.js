import React from 'react';


function Square(props){
    const {x, y, containsShip, isVisible} = props;
  
    let marker;
    if(isVisible){
      if(containsShip) marker = 'X';
      else marker = 'o';
    }
    else marker = '';
  
    return (
      <button id={x+y} className={"square"} onClick={props.onClick}>
        {marker}
      </button>
    );
  }

export default Square;