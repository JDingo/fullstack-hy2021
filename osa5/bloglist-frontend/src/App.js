import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'

import LoginForm from './components/LoginForm'
import loginService from './services/login'

import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'

import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, sortBlogs, newBlog } from './reducers/blogReducer'


const App = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const blogs = useSelector(store => store.blogs)

    useEffect(() => {
        blogService.getAll().then(
            blogs => {
                dispatch(initializeBlogs(blogs))
                dispatch(sortBlogs())
            })
    }, [dispatch])

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
            dispatch(setNotification({ message: 'Wrong credentials', type: 'error' }))
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

    const addBlog = async (blogObject) => {
        try {
            const newBlogObject = await blogService.create(blogObject)
            dispatch(newBlog(newBlogObject))

            blogFormRef.current.toggleVisibility()

            dispatch(setNotification({ message: `A new blog ${blogObject.title} by ${blogObject.author} added.`, type: 'success' }))

        } catch (exception) {
            dispatch(setNotification({ message: 'Adding blog failed', type: 'error' }))
        }
    }

    const blogFormRef = useRef()

    const updateLike = async (event) => {
        event.preventDefault()

        const blogId = event.target.id

        try {
            const likedBlog = blogs.find(blog => blog.id === blogId)

            const updateBlog = {
                title: likedBlog.title,
                author: likedBlog.author,
                url: likedBlog.url,
                likes: likedBlog.likes + 1,
            }

            await blogService.update(updateBlog, blogId)

            dispatch(sortBlogs())

        } catch (exception) {
            dispatch(setNotification({ message: 'Couldn\'t update blog', type: 'error' }))
        }
    }

    const deleteBlog = async (event) => {
        event.preventDefault()

        const blogId = event.target.id

        try {
            const blogToBeDeleted = blogs.find(blog => blog.id === blogId)
            if (window.confirm(`Remove blog '${blogToBeDeleted.title}' by '${blogToBeDeleted.author}?`)) {

                await blogService.deleteBlog(blogId)

                dispatch(sortBlogs())

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
                            <Blog key={blog.id} blog={blog} handleLike={updateLike} handleDelete={deleteBlog} username={user.username} />
                        )}
                    </div>
                </div>
            }
        </div >
    )
}

export default App