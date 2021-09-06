import React from 'react'

const Persons = ({ persons, deleteOnClick }) => {
  
  const askDelete = (person) => {
    if(window.confirm(`Delete ${person.name}`)){
      deleteOnClick(person.id)
    }
  }

  return (
    persons.map(person => 
      <p key={person.name}>{person.name} {person.number}
        <button onClick={() => askDelete(person)}>delete</button>
      </p>)
  )
}

export default Persons