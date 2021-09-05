import React, { useState } from 'react'

const ShowPersons = ({ persons }) => (
  persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ newFilter, setNewFilter ] = useState('')


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if(persons.map(person => person.name).includes(newName)){
      window.alert(`${newName} already exists`)
    }
    else setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const personsToShow = showAll
    ? <ShowPersons persons={persons} />
    : 

  return (
    <div>
      <h2>Phonebook</h2>
      filter: <input 
        value={newFilter}
        onChange={handleFilterChange}
      />
      <h2>add new person</h2>
      <form>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowPersons persons={persons} />
    </div>
  )

}

export default App