import React from 'react'

const Field = ({name, value, handleValueChange}) => {
    return (
        <div>
          <label>{name}: </label>
            <input 
                name={name}
                value={value} 
                onChange={handleValueChange} 
            />
        </div>
    )
}

export default Field