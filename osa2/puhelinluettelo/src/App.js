import React, { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

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
      const copy = [...persons]
      copy.push(newPerson)
      setPersons(copy)
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