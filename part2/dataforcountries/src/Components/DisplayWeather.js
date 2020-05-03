import React from 'react'

const DisplayWeather = ({weatherInfo, country}) => {
    const {temperature, weather_icons, wind_dir, wind_speed} = weatherInfo
    //does not render if weatherInfo is empty
    if (JSON.stringify(weatherInfo) === '{}') return null;
    return (
        <div>
            <h2>Weather in {country}</h2>
            <p><b>temperature:</b> {temperature} celsius</p>
            <br/>
            <img src={weather_icons} alt='the current weather'/>
            <p><b>wind:</b> {wind_speed} mph direction {wind_dir}</p>
        </div>
    )
}

export default DisplayWeather