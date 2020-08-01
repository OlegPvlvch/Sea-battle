import React from 'react';
import Row from './Row';


function Field(props) {
    const { fieldMap } = props;
    return (
        <div className={""}>
          <h3>{props.whose}</h3>
            {fieldMap.map((row, index) => {
                return (
                    <Row 
                    key={index}
                    row={row} 
                    onClick={(y, x) => props.onClick(y, x)} 
                    />
                )
            })}
        </div>
    )
}

export default Field;