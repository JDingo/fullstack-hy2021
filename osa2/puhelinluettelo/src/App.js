import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Form from './components/Form'

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
      })
  }, [])

  const updateEntries = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }

  const addPerson = (event) => {
    event.preventDefault()

    const checkExistingPerson = persons.find(person => person.name === newName)

    if (checkExistingPerson !== undefined) {
      console.log(checkExistingPerson)
      changePerson(checkExistingPerson)
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

  const changePerson = (person) => {
    if (window.confirm(`${person.name} is already added to phonebook. Replace the old number with the new one?`)) {
      personService
        .change(person, newNumber)
        .then(() => {
          updateEntries()
        })
    }
  }

  const deletePerson = (event) => {
    if (window.confirm(`Delete ${event.target.name}?`)) {
      personService
        .deleteEntry(event.target.id)
        .then(() => {
          updateEntries()
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
      <Persons searchFilter={searchFilter} currentList={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App