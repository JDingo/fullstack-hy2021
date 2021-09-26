import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../query'

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

      <AuthorForm />
    </div>
  )
}

const AuthorForm = () => {
  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const [createPerson] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    createPerson({ variables: { name, setBornTo: Number(birthyear) } })

    setName('')
    setBirthyear('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={submit}>
        <div>
          Name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Birthyear <input value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type='submit'>Add!</button>
      </form>
    </div>
  )
}

export default Authors