import React from 'react'
import DisplayWeather from './DisplayWeather'

const DisplayTemplate = (props) => {
    const {country, index, handleClick, weatherInfo} = props
    const {name, capital, population, languages, flag, showDetails} = country
    const langList = languages.map((lang, i) => <li key={i}>{lang.name}</li>)

    return (
        <div key={index}>
            <h2>{name}</h2>
            <button data-key={name} 
                    onClick={handleClick}>
                {showDetails ? 'Hide' : 'Show'}
            </button>

            <div style={{display: showDetails ? 'block' : 'none'}}>
                {/* Render Country Data */}
                <p>capital: {capital}</p>
                <p>population: {population}</p>
                <h3>Languages</h3>
                <ul>{langList}</ul>
                <img src={`${flag}`} 
                     style={{width: 100 + 'px', height: 100 + 'px'}}
                     alt={`flag of ${name}`}/>
                {/* Render Weather Data when there's only 1 match */}
                <DisplayWeather weatherInfo={weatherInfo}
                                    country={country.name}/>
            </div>
            
        </div>
        )
    }

export default DisplayTemplate