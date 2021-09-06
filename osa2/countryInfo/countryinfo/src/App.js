import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ShowCountries from './components/Countries';

const Filter = ({ newFilter, handleFilterChange }) => (
  <>
    find countries <input
      value={newFilter}
      onChange={handleFilterChange}
    />
  </>
)


function App() {

  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })

  }, []);

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase()
    .includes(newFilter.toLowerCase()))

  return (
    <div>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      
      <ShowCountries countries={filteredCountries} setFilter={setFilter} />

    </div>
  );
}

export default App;
