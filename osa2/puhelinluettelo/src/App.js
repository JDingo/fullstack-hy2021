import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchFilter, setSearchFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const checkExistingPerson = persons.find(person => person.name === newName)

    if(checkExistingPerson !== undefined) {
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

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchFilter(event.target.value)
  }

  const entriesToShow = searchFilter.trim() === '' 
  ? persons 
  : persons.filter(person => 
    person.name.toLowerCase().includes(searchFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search</h3>
        <div>
          Filter: <input
            value={searchFilter}
            onChange={handleSearchChange}
            />
        </div>
      <h3>Add new entry</h3>
      <form onSubmit={addPerson}>
        <div>
          Name: <input 
              value={newName}
              onChange={handlePersonChange}  
            />
        </div>
        <div>
          Number: <input 
              value={newNumber}
              onChange={handleNumberChange}  
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <div>
        {entriesToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )

}

export default App