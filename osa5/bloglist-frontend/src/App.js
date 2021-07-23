import React, { useState, useEffect } from 'react'

import Notification from './components/Notification'

import LoginForm from './components/LoginForm'
import loginService from './services/login'

import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title, author, url
      })

      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )

      setTitle('')
      setAuthor('')
      setUrl('')

      setMessage(`A new blog ${title} by ${author} added.`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception) {
      setMessage('Adding blog failed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {user === null ?
      <div>
        <Notification message={message} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        /> 
        </div>
        :
        <div>
          <Notification message={message} />
          <BlogForm
            addBlog={addBlog}
            blogValueAndHandlers={
              { title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange }
            }
            displayName={user.name}
            handleLogout={handleLogout}
          />
          <BlogList
            blogs={blogs}
          />
        </div>
      }
    </div>
  )
}

export default App