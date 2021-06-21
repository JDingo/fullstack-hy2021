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

const CountryList = ({ countryList, searchword }) => {
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
          {matching.map(country => <li key={country.name}>{country.name}</li>)}
        </ul>
      </div>
    )
  }
}

const CountryInfoPanel = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} height={'128px'} alt={'Flag'}></img>
    </div>
  )
}

const App = () => {
  const [searchword, setSearchword] = useState('')
  const [countries, setCountries] = useState([])
  const [loadingIndicator, setLoadingIndicator] = useState('')

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
      <Filter value={searchword} onChange={handleSearchwordChange} />
      <CountryList countryList={countries} searchword={searchword} />
      <p>{loadingIndicator}</p>
    </div>
  );
}

export default App;