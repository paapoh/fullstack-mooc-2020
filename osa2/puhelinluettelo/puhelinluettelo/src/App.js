import React, {useState, useEffect} from 'react'
import personService from './services/persons'

const Filter = ({newFilter, handleFilterChange}) => (
  <div>
      filter shown with: <input
          value={newFilter}
          onChange={handleFilterChange}
  />
  </div>
)

const Persons = ({persons, newFilter, setPersons, handleAddedTime}) => {
  const personsToShow = 
  persons.filter(person => person.name.toLowerCase()
  .includes(newFilter.
    toLowerCase()
    )
  )

  const handleDelete = (person) => {
    if(window.confirm(`Poistetaanko käyttäjä ${person.name}`)){
      personService
        .del(person.id)
        .then(response => {
          setPersons(persons.filter(person2 => person2.id !== person.id))
          handleAddedTime(`Removed ${person.name}`)
        })
    }
  }

  return(
      <div>
          {personsToShow.map(person => 
            <p key={person.name}> {person.name} {person.number} 
              <button onClick={() => handleDelete(person)}>delete</button>
            </p>
          )}
      </div>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => (
  <form onSubmit={addPerson}>
      <div>
          name: <input 
              value={newName}
              onChange={handleNameChange}
          />
      </div>
      <div>
          number: <input 
              value={newNumber}
              onChange={handleNumberChange}
          />
      </div>
      <div>
          <button type="submit" onClick={addPerson}>add</button>
      </div>
  </form>
)

const Notification = ({ message, style}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={style}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ addedMessage, setAddedMessage] = useState(null)
  const [ alertColor, setAlertColor ] = useState('alertGreen')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleAddedTime = (message) => {
    setAddedMessage(message)
    setTimeout(() => {
      setAddedMessage(null)
      setAlertColor('alertGreen')
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if(persons.map(person => person.name).includes(newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
          .update(persons.find(person => person.name === newName).id, personObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== response.data.id ? person : personObject))
            handleAddedTime(`Changed ${response.data.name} number`)
          })
          .catch(reason => {
            setAlertColor('alertRed')
            handleAddedTime(`Information of ${newName} has already been removed from server`)
          })
      }
    }
    else{
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        handleAddedTime(`Added ${response.data.name}`)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMessage} style={alertColor}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} setPersons={setPersons} handleAddedTime={handleAddedTime}/>
    </div>
  )

}

export default App