import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'

import LoginForm from './components/LoginForm'

import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, newBlog, updateBlog, deleteBlog } from './reducers/blogReducer'
import { checkLocalLogin, login, logout } from './reducers/loginReducer'


const App = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const blogs = useSelector(store => store.blogs)
    const user = useSelector(store => store.login)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(checkLocalLogin())
    }, [])

    const handleLogin = (event) => {
        event.preventDefault()

        dispatch(login(username, password))
        setUsername('')
        setPassword('')
    }

    const handleLogout = () => {
        dispatch(logout())
        setUsername('')
        setPassword('')
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const addBlog = (blogObject) => {
        try {
            dispatch(newBlog(blogObject))
            blogFormRef.current.toggleVisibility()
            dispatch(setNotification({ message: `A new blog ${blogObject.title} by ${blogObject.author} added.`, type: 'success' }))
        } catch (exception) {
            dispatch(setNotification({ message: 'Adding blog failed', type: 'error' }))
        }
    }

    const blogFormRef = useRef()

    const updateLike = (event) => {
        event.preventDefault()
        const blogId = event.target.id

        try {
            const likedBlog = blogs.find(blog => blog.id === blogId)
            dispatch(updateBlog(likedBlog, blogId))
        } catch (exception) {
            dispatch(setNotification({ message: 'Couldn\'t update blog', type: 'error' }))
        }
    }

    const handleDelete = (event) => {
        event.preventDefault()
        const blogId = event.target.id

        try {
            const blogToBeDeleted = blogs.find(blog => blog.id === blogId)
            if (window.confirm(`Remove blog '${blogToBeDeleted.title}' by '${blogToBeDeleted.author}?`)) {
                dispatch(deleteBlog(blogId))
                dispatch(setNotification({ message: 'Blog deleted', type: 'success' }))
            }
        } catch (exception) {
            dispatch(setNotification({ message: 'Couldn\'t delete blog', type: 'error' }))
        }
    }

    return (
        <div>
            {user === null ?
                <div>
                    <Notification />
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
                    <Notification />
                    <h2>Blogs</h2>
                    <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
                    <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
                        <BlogForm
                            createBlog={addBlog}
                        />
                    </Togglable>
                    <div>
                        {blogs.map(blog =>
                            <Blog key={blog.id} blog={blog} handleLike={updateLike} handleDelete={handleDelete} username={user.username} />
                        )}
                    </div>
                </div>
            }
        </div >
    )
}

export default App