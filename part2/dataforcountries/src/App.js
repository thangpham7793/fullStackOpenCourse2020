import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './Components/Display'

const App = () => {
    const [searchPhrase, setSearchPhrase] = useState('')
    const [countries, setCountries] = useState([])
    const [weatherInfo, setWeatherInfo] = useState({})
    const [fetchedWeatherInfo, setFetchedWeatherInfo] = useState(true)
    const fields = ['name', 'capital', 'population', 'languages', 'flag']

    const handleChange = (e) => setSearchPhrase(e.target.value)

//LOGIC FOR GETTING AND FILTER COUNTRIES DATA

    //helper func that takes an object and an arr of props and returns a new object containing the props and their values
    //the container object already has the field showDetails to control display 
    const propExtractor = propArr => targetObject => {
        return propArr.reduce((extractedObject, prop) => {
                return {...extractedObject, [prop]: targetObject[prop]}
            }, {showDetails: false})
    }

    const eventHandler = res => {
        //update countries if there're 10 or less matches
        if (res.data.length <= 10 && res.data.length > 1) {
            const data = res.data
        //only keeps countries whose names begin with searchPhrase
                .filter(country => 
                    country.name
                        .toLowerCase()
                        .startsWith(searchPhrase.toLowerCase()))
                        .map(country => propExtractor(fields)(country))
            setCountries(data)
        //no need to search for countries that begin with searchPhrase when there's 1 only
        } else if (res.data.length === 1) {
            const data = res.data
                        .map(country => propExtractor(fields)(country))
            setCountries(data)

        //reset FetchedWeatherInfo to trigger a new get weather info API call
            setFetchedWeatherInfo(false)
        } else {
        //set countries to empty if there're more than 10 matches or there's no searchPhrase
            setCountries([])
        }
    }
        
    const getCountryData = () => {
        if (searchPhrase === '') return;
        const url = 'https://restcountries.eu/rest/v2/name/'
        axios.get(`${url}${searchPhrase}`)
             .then(res => eventHandler(res))
    }

    useEffect(getCountryData, [searchPhrase])

    const handleClick = (e) => {
        const newCountries = countries.map((country) => {
            if (country.name === e.target.getAttribute('data-key'))
                return {...country, showDetails: !country.showDetails}
            return country
        })
        setCountries(newCountries)
    }

//LOGIC FOR DISPLAY WEATHER INFO WHEN THERE'S ONLY ONE MATCH

    function fetchWeatherData (countries) {
        const api_key = process.env.REACT_APP_API_KEY
        if (countries.length > 0) {
            let url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${countries[0].name}`
            return axios.get(url)
                        .then(res => {
                        setWeatherInfo(res.data.current)
                        setFetchedWeatherInfo('true')})
                        .catch(err => console.log(err))
        }   
    }

    const weather_hook = () => {
        if (countries.length === 1 && fetchedWeatherInfo === false) 
            fetchWeatherData(countries)
    }

    useEffect(weather_hook, [fetchedWeatherInfo])

    return (
        <div>
            <div>
                <label>
                    Find Countries: 
                </label>
                <input value={searchPhrase}
                    onChange={handleChange}
                />
            </div>

            <div>
                <h2>Matches</h2>
                <Display countries={countries} 
                         handleClick={handleClick}
                         searchPhrase={searchPhrase}
                         weatherInfo={weatherInfo}
                />
            </div>
        </div>
    )
}

export default App