import React, { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'

import LoginForm from './components/LoginForm'
import loginService from './services/login'

import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'

import Togglable from './components/Togglable'


const App = () => {
    const [blogs, setBlogs] = useState([])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const [message, setMessage] = useState({ message: null, type: null })

    useEffect(() => {
        updateBlogs()
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
            setMessage({ message: 'Wrong credentials', type: 'error' })
            setTimeout(() => {
                setMessage({ message: null, type: null })
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

    const addBlog = async (blogObject) => {
        try {
            await blogService.create(blogObject)

            updateBlogs()

            blogFormRef.current.toggleVisibility()

            setMessage({ message: `A new blog ${blogObject.title} by ${blogObject.author} added.`, type: 'success' })
            setTimeout(() => {
                setMessage({ message: null, type: null })
            }, 5000)

        } catch (exception) {
            setMessage({ message: 'Adding blog failed', type: 'error' })
            setTimeout(() => {
                setMessage({ message: null, type: null })
            }, 5000)
        }
    }

    const blogFormRef = useRef()

    const updateBlogs = async () => {
        const blogs = await blogService.getAll()
        const sortedBlogs = await blogs.sort(function (a, b) {
            return b.likes - a.likes
        })

        setBlogs(sortedBlogs)
    }

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

            updateBlogs()

        } catch (exception) {
            setMessage({ message: 'Couldn\'t update blog', type: 'error' })
            setTimeout(() => {
                setMessage({ message: null, type: null })
            }, 5000)
        }
    }

    const deleteBlog = async (event) => {
        event.preventDefault()

        const blogId = event.target.id

        try {
            const blogToBeDeleted = blogs.find(blog => blog.id === blogId)
            if (window.confirm(`Remove blog '${blogToBeDeleted.title}' by '${blogToBeDeleted.author}?`)) {

                await blogService.deleteBlog(blogId)

                updateBlogs()

                setMessage({ message: 'Blog deleted', type: 'success' })
                setTimeout(() => {
                    setMessage({ message: null, type: null })
                }, 5000)
            }

        } catch (exception) {
            setMessage({ message: 'Couldn\'t delete blog', type: 'error' })
            setTimeout(() => {
                setMessage({ message: null, type: null })
            }, 5000)
        }
    }

    return (
        <div>
            {user === null ?
                <div>
                    <Notification message={message.message} type={message.type} />
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
                    <Notification message={message.message} type={message.type} />
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