import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title,
            author,
            url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    Title:
                    <input
                        id="title"
                        type="text"
                        value={title}
                        name="Title"
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    Author:
                    <input
                        id="author"
                        type="author"
                        value={author}
                        name="Author"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    Url:
                    <input
                        id="url"
                        type="text"
                        value={url}
                        name="Url"
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm