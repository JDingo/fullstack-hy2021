import React from 'react'

const RecommendedBooks = ({ show, books, favoriteGenre }) => {
  if (!show) {
    return null
  }

  const bookList = books.allBooks.filter(book => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favourite genre <strong>{favoriteGenre}</strong></div>
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
    </div>
  )
}

export default RecommendedBooks