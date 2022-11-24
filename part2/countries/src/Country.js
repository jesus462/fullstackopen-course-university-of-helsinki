import { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
    const weather_api_key = process.env.REACT_APP_API_KEY
    
    const [weatherCountry, setWeatherCountry] = useState(null)

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${weather_api_key}&units=metric`)
            .then(response => {
                setWeatherCountry(response.data)
            })
    }, [country, weather_api_key])

    return (
        <>
            <h1>{country?.name?.common}</h1>
            <div>capital {country?.capital[0]}</div>
            <div>area {country?.area}</div>
            <h2>languages:</h2>
            <ul>
            {Object.values(country?.languages).map(language =>
                <li key={language}>{language}</li>
            )}
            </ul>
            <img src={country?.flags?.png} alt={`Flag of ${country?.name?.common}`} />
            <h2>Weather in {country?.capital[0]}</h2>
            {weatherCountry ?
                (
                    <>
                        <div>temperature {weatherCountry?.main?.temp} Celcius</div>
                        <img src={`http://openweathermap.org/img/wn/${weatherCountry?.weather[0].icon}@2x.png`} alt={`Weather icon`} />
                        <div>wind {weatherCountry?.wind?.speed} m/s</div>
                    </>
                )
                : null
            }
        </>
    )
}

export default Country