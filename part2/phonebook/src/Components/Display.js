import React from 'react'
import Button from './Button'

const Display = ({searchPhrase, persons, handleDelete}) => {

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
                <p>
                    {Object.values(person)
                        .slice(0, Object.values(person).length - 1)
                        .join(' ')} 
                </p>
                <Button dataKey={person.id} 
                        label="delete" 
                        handleClick={handleDelete}/>
            </li>
        )
    )
}

export default Display