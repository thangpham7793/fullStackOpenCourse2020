import React from 'react'

const Filter = ({newSearchPhrase, handleSearchPhrase}) => {
    return (
        <div>
            filter shown with:
            <input 
                value={newSearchPhrase}
                onChange={handleSearchPhrase}
            />
        </div>
    )
}

export default Filter