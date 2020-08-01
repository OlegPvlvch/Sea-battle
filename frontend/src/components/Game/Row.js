import React from 'react';
import Square from './Square'


function Row(props) {
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
                    onClick={() => props.onClick(square.y, square.x)} 
                    />
                )
            })}
        </div>
        )
}

export default Row;