import React from 'react'

const Button = ({label, handleClick, dataKey}) => {
    return (
        <button data-key={dataKey}
                onClick={handleClick}
        >
            {label}
        </button>
    )
}

export default Button