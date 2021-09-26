import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../query'
import Select from 'react-select'

const Authors = ({ show, authors }) => {
  if (!show) {
    return null
  }

  if (!authors) {
    return null
  }

  const authorList = authors.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authorList.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <AuthorForm authors={authorList} />
    </div>
  )
}

const AuthorForm = ({ authors }) => {
  const [name, setName] = useState(null)
  const [birthyear, setBirthyear] = useState('')

  const [createPerson] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    createPerson({ variables: { name: name.value, setBornTo: Number(birthyear) } })

    setBirthyear('')
  }

  const options = authors.map(author => {
    return { value: author.name, label: author.name }
  })

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          Birthyear <input value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Authors