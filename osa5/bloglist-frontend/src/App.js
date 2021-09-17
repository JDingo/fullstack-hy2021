import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    Switch, Route, Link, useRouteMatch
} from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Users from './components/Users'
import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, newBlog, updateBlog, deleteBlog } from './reducers/blogReducer'
import { checkLocalLogin, login, logout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import User from './components/User'


const App = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const blogs = useSelector(store => store.blogs)
    const user = useSelector(store => store.login)
    const users = useSelector(store => store.users)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(checkLocalLogin())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    const match = useRouteMatch('/users/:id')
    const inspectedUser = match
        ? users.find(user => user.id === match.params.id)
        : null

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

    const padding = {
        padding: 5
    }

    return (
        <div>
            <div>
                <Link style={padding} to="/">Home</Link>
                <Link style={padding} to="/users">Users</Link>
            </div>

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

                        <Switch>
                            <Route path="/users/:id">
                                <User user={inspectedUser} />
                            </Route>
                            <Route path="/users">
                                <Users users={users} />
                            </Route>
                            <Route path="/">
                                <div>
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
                            </Route>
                        </Switch>
                    </div>
                }
            </div >
        </div>

    )
}

export default App