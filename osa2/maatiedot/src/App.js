import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      <h2>Find countries:</h2>
      <input value={value}
        onChange={onChange}
      />
    </div>
  )
}

const CountryList = ({ countryList, searchword, searchwordFunction }) => {
  const matching = countryList.filter(country => country.name.toLowerCase().includes(searchword.toLowerCase()))

  if (matching.length > 10) {
    return (
      <p>Too many matches, specify another filter.</p>
    )
  } 
  else if (matching.length === 1) {
    return (
      <CountryInfoPanel country={matching[0]} />
    )
  }
  else {
    return (
      <div>
        <ul>
          {matching.map(country =>
              <li key={country.alpha3Code}>
                {country.name} <button key={country.name} data-country={country.name} onClick={searchwordFunction}>show</button>
              </li>
          )}
        </ul>
      </div>
    )
  }
}

const CountryInfoPanel = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [loadingState, setLoadingState] = useState(false)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        setWeatherData(response)
        setLoadingState(true)
      })
  }, [country])

  if (loadingState) {
    return (
      <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => 
          <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} height={'128px'} alt={'Flag'}></img>
      <h2>Weather in {country.name}</h2>
      <div>
        <b>Temperature: </b> <span>{weatherData.data.main.temp} °C</span>
      </div>
      <div>
        <b>Humidity: </b> <span>{weatherData.data.main.humidity} %</span>
      </div>
      <div>
        <b>Weather: </b> <span>{weatherData.data.weather[0].description}</span>
      </div>
      <div>
        <b>Wind: </b> <span>{weatherData.data.wind.speed} m/s {weatherData.data.wind.deg}°</span>
      </div>
    </div> 
    )
  }
  else {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {country.languages.map(language => 
            <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} height={'128px'} alt={'Flag'}></img>
      </div>
    )
  }
}

const App = () => {
  const [searchword, setSearchword] = useState('')
  const [countries, setCountries] = useState([])
  const [loadingIndicator, setLoadingIndicator] = useState('')

  const showCountry = (event) => {
    setSearchword(event.target.dataset.country)
  }

  const handleSearchwordChange = (event) => {
    setSearchword(event.target.value)
  }

  useEffect(() => {
    setLoadingIndicator('Loading...')
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
      setLoadingIndicator('')
    })
  }, [])

  return (
    <div className="App">
      <Filter value={searchword} onChange={handleSearchwordChange}/>
      <CountryList countryList={countries} searchword={searchword} searchwordFunction={showCountry}/>
      <p>{loadingIndicator}</p>
    </div>
  );
}

export default App;
