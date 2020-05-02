import React from 'react'

const Display = ({searchPhrase, persons}) => {

    //display FILTERED persons unless the filter bar is empty 
    const personsToShow = searchPhrase.length  
    ? persons.filter(({name}) => 
        name
        .toLowerCase()
        .startsWith(searchPhrase.toLowerCase()))
    : persons
    
    return (
        personsToShow.map((person, i) => 
            <li key={i}>
                {Object.values(person).join(' ')}
            </li>)
    )
}

export default Display