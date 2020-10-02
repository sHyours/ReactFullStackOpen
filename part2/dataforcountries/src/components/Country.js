import Axios from 'axios';
import React, { useEffect, useState } from 'react';
export default function Country({ country }) {
    const [weather, setWeather] = useState({})
    useEffect(() => {
        Axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`).then(({ data }) => {
            setWeather(data.current)
        })
    }, [])
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>populaton {country.population}</p>
            <h2>languages</h2>
            <ul>
                {
                    country.languages.map(l => (
                        <li key={l.name}>{l.name}</li>
                    ))
                }
            </ul>
            <img style={{ height: '100px' }} src={country.flag} />
            <h1>Weather in {country.capital}</h1>
            <h3>temperature:{weather.temperature} Celcius</h3>
            <img src={weather.weather_icons} alt="" />
            <h3>wind:{weather.wind_degree} mph direction {weather.wind_dir}</h3>
        </div>

    )
};
