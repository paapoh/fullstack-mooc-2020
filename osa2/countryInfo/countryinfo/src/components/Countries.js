import React from 'react';


const ListedCountries = ({ country, setFilter}) => (
    <>
        {country.name}
        <button onClick={() => setFilter(country.name)}>show</button>
        <br/>
    </>
)

const ShowOneCountry = ({ countries }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const country = countries[0]
    const languages = country.languages.map(lang => <li key={lang.name}>{lang.name}<br/></li>)

    return(
      <div>
        <h1>{country.name}</h1>
        capital {country.capital} <br/>
        population {country.population} <br/>
        <h2>languages</h2>
        <ul>{languages}</ul>
        <img src={country.flag} alt="flag" width={100}/>
      </div>
    )
  }
  
const ShowCountries = ({ countries, setFilter}) => {

const filterinNames = countries.map(country => <ListedCountries key={country.name} country={country} setFilter={setFilter}/>)

const countryAmount = countries.length
const checkcountries = () => {
    if(countryAmount > 10) return("Too many matches")
    if(countryAmount <= 10 && countryAmount > 1) return(filterinNames)
    if(countryAmount === 0) return("")
    return (<ShowOneCountry countries={countries} />)
}

return (
    <div>{checkcountries()}</div>

)
}

export default ShowCountries