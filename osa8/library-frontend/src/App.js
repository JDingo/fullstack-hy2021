import { useApolloClient, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendedBooks from './components/RecommendedBooks'

import { ALL_AUTHORS, ALL_BOOKS, ME } from './query'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authorData = useQuery(ALL_AUTHORS)
  const bookData = useQuery(ALL_BOOKS)
  const userData = useQuery(ME)

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? <button onClick={() => setPage('login')}>login</button> :
                  <>
                    <button onClick={() => setPage('add')}>add book</button> 
                    <button onClick={() => setPage('recommended')}>recommended</button>
                    <button onClick={() => logout()}>logout</button>
                  </>}
      </div>

      <Authors
        show={page === 'authors'}
        authors={authorData.data}
        token={token}
      />

      <Books
        show={page === 'books'}
        books={bookData.data}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
      />

      <RecommendedBooks
        show={page === 'recommended'}
        books={bookData.data}
        favoriteGenre={!userData.data.me ? null : userData.data.me.favoriteGenre}
      />

    </div>
  )
}

export default App