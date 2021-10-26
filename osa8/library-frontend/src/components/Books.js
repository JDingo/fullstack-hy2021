import React, { useState } from 'react'

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState(null)

  if (!show) {
    return null
  }

  if (!books) {
    return null
  }

  const bookList = !genre ? books.allBooks : books.allBooks.filter(book => book.genres.includes(genre))

  const genreButtons = () => {
    const genreList = []

    books.allBooks.forEach(book => {
      book.genres.forEach(genre => {
        if (!genreList.includes(genre)) {
          genreList.push(genre)
        }
      })
    })

    return (
      <div>
        {genreList.map(genre => 
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        )}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <div>{ !genre ? "in all genres" : `in genre ${genre}` }</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {bookList.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genreButtons()}
    </div>
  )
}

export default Books