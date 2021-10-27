import { useApolloClient, useQuery, useLazyQuery, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendedBooks from './components/RecommendedBooks'

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, ME } from './query'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [getUser, user] = useLazyQuery(ME)
  const [getRecommended, recommendedBooks] = useLazyQuery(ALL_BOOKS)
  const [getBooks, bookData] = useLazyQuery(ALL_BOOKS)

  const authorData = useQuery(ALL_AUTHORS)

  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(p => p.title).includes(object.title)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`New book '${subscriptionData.data.bookAdded.title}'' added!`)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  useEffect(() => {
    getBooks()
  }, [])

  useEffect(() => {
    if (user.data !== undefined) {
      getRecommended({ variables: { genre: user.data.me.favoriteGenre } })
    }
  }, [user.data, bookData.data])

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
        getUser={getUser}
      />

      <RecommendedBooks
        show={page === 'recommended'}
        books={recommendedBooks.data}
        user={!user.data ? null : user.data.me}
      />

    </div>
  )
}

export default App