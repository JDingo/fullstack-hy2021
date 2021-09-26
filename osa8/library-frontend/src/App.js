import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { ALL_AUTHORS, ALL_BOOKS } from './query'

const App = () => {
  const [page, setPage] = useState('authors')
  const authorData = useQuery(ALL_AUTHORS)
  const bookData = useQuery(ALL_BOOKS)
  
  useEffect(() => {
    console.log(authorData)
    console.log(bookData)
  }, [authorData, bookData])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authorData.data}
      />

      <Books
        show={page === 'books'}
        books={bookData.data}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App