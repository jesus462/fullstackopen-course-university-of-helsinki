import { useEffect, useState } from 'react'
import Country from './Country'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')
  const [showSingleView, setShowSingleView] = useState({
    show: false,
    country: null
  })

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
    setShowSingleView({
      show: false,
      country: null,
    })
  }

  const handleShowView = (country) => {
    setShowSingleView({
      show: true,
      country: country,
    })
  }

  const queryCountry = countries.filter(
    country => 
      country.name.common.toLowerCase().includes(filterName.toLowerCase())
  )
  const singleCountry = showSingleView.show ? showSingleView.country : queryCountry[0]

  return (
    <div>
      <div>
        find countries <input value={filterName} onChange={handleFilterNameChange} />
      </div>
      {filterName.length ? (queryCountry.length > 10 ?
        <div>Too many matches, specify another filter</div>
        : queryCountry.length === 1 || showSingleView.show ?
          <Country country={singleCountry} />
        : queryCountry.map(country => (
            <div key={country.name.common}>
              {country.name.common} 
              <button onClick={() => handleShowView(country)}>show</button>
            </div>
          ))) : null}
    </div>
  )
}

export default App