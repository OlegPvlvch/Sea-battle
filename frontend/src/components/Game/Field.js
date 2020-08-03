import React from 'react';
import Row from './Row';


export default function Field(props) {
    const { fieldMap } = props;
    return (
        <div>
          <h3>{props.whose}</h3>
            {fieldMap.map((row, index) => {
                return (
                    <Row 
                    key={index}
                    row={row} 
                    onClick={(x, y) => props.onClick(x, y)} 
                    />
                )
            })}
        </div>
    )
}