import React from 'react'

const BlogForm = ({ displayName, blogValueAndHandlers, handleLogout, addBlog }) => {
    return (
        <div>
            <h2>Blogs</h2>
            <p>{displayName} logged in <button onClick={handleLogout}>Log out</button></p>

            <form onSubmit={addBlog}>
                <div>
                    Title:
                    <input
                        type="text"
                        value={blogValueAndHandlers.title}
                        name="Title"
                        onChange={blogValueAndHandlers.handleTitleChange}
                    />
                </div>
                <div>
                    Author:
                    <input
                        type="author"
                        value={blogValueAndHandlers.author}
                        name="Author"
                        onChange={blogValueAndHandlers.handleAuthorChange}
                    />
                </div>
                <div>
                    Url:
                    <input
                        type="text"
                        value={blogValueAndHandlers.url}
                        name="Url"
                        onChange={blogValueAndHandlers.handleUrlChange}
                    />
                </div>
            </form>

            <button onClick={addBlog}>Create</button>
        </div>
    )
}

export default BlogForm