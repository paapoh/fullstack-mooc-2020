import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response))
  }, []);


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
    if(persons.map(person => person.name).includes(newName) && 
      window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`))
      {
      const foundPerson = persons.find(person => person.name === newName)
      const changedPerson = {...foundPerson, number: newNumber}
      personService
        .put(foundPerson.id, changedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== foundPerson.id ? person : response))
          setNewNumber('')
          setNewName('')
        })
    }
    else{
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deleteOnClick = (id) => {
    personService
      .remove(id)
      .then( response => {
        setPersons(persons.filter(person => person.id !== id))
        console.log(response)
      })
  }

  const numbersToShow = persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handle={handleFilterChange} />
      <h2>add new person</h2>
      <PersonForm 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} 
        addName={addName}/>
      <h2>Numbers</h2>
      <Persons persons={numbersToShow} deleteOnClick={deleteOnClick} />
    </div>
  )

}

export default App