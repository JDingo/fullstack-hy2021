import React from 'react'

const Persons = ({ searchFilter, currentList, deletePerson }) => {
    const entriesToShow = searchFilter.trim() === ''
        ? currentList
        : currentList.filter(person =>
            person.name.toLowerCase().includes(searchFilter.toLowerCase()))

    return (
        entriesToShow.map(person =>
            <p key={person.name}>{person.name} {person.number} <button name={person.name} id={person.id} key={person.id} onClick={deletePerson}>Delete</button></p>)
    )
}

export default Persons