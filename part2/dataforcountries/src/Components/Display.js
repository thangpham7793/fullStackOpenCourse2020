import React from 'react'
import DisplayTemplate from './DisplayTemplate'

const Display = ({countries , handleClick, searchPhrase, weatherInfo}) => {
    
    if (searchPhrase.length === 0) {
        return (
            <div>Enter First Letters</div>
        )
    } else if (countries.length === 0) {
        return (
            <div>Too many matches, enter another filter</div>
        )
    }
    
    const countriesInfo = countries.map((country, i) => {
            return (
                <DisplayTemplate key={i}
                                 country={country} 
                                 index={i} 
                                 handleClick={handleClick}
                                 weatherInfo={weatherInfo}
                                 />
            )
        }
    )
    return countriesInfo
}

export default Display