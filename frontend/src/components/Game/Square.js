import React from 'react';


function Square(props){
    const {x, y, containsShip, isVisible} = props;
  
    let marker;
    if(isVisible){
      if(containsShip) marker = 'X';
      else marker = '•';
    }
    else marker = '';
  
    return (
      <button id={`${y}-${x}`} className={"square"} onClick={props.onClick}>
        {marker}
      </button>
    );
  }

export default Square;