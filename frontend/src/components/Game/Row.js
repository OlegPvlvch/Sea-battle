import React from 'react';
import Square from './Square'


export default function Row(props) {
  const { row } = props;
  return (
    <div className=".board-row">
      {row.map((square, index) => {
        return (
          <Square 
          key={index}
          x={square.x} 
          y={square.y} 
          containsShip={square.containsShip}
          isVisible={square.isVisible}
          isOccupied={square.isOccupied}
          shot={square.shot} 
          onClick={() => props.onClick(square.x, square.y)} 
          />
        )
      })}
    </div>
    )
}