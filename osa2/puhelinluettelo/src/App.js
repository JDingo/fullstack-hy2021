import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      Filter: <input
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const Form = (props) => {
  return (
    <div>
      <form onSubmit={props.submit}>
        <div>
          Name: <input
            value={props.nameValue}
            onChange={props.nameChange}
          />
        </div>
        <div>
          Number: <input
            value={props.numberValue}
            onChange={props.numberChage}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({ searchFilter, currentList }) => {
  const entriesToShow = searchFilter.trim() === ''
    ? currentList
    : currentList.filter(person =>
      person.name.toLowerCase().includes(searchFilter.toLowerCase()))

  return (
    entriesToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
        console.log(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const checkExistingPerson = persons.find(person => person.name === newName)

    if (checkExistingPerson !== undefined) {
      window.alert(`${newName} is already added to phonebook.`)

    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then(response => {
          setNewName('')
          setNewNumber('')
          setPersons(persons.concat(response.data))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Search</h3>
      <Filter value={searchFilter} onChange={handleSearchChange} />

      <h3>Add new entry</h3>
      <Form 
        nameValue={newName} nameChange={handleNameChange}
        numberValue={newNumber} numberChage={handleNumberChange}
        submit={addPerson}
      />

      <h3>Numbers</h3>
      <Persons searchFilter={searchFilter} currentList={persons}/>
    </div>
  )
}

export default App