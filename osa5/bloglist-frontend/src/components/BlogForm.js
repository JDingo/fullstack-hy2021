import React from 'react'
import Blog from './Blog'

const BlogForm = ({ displayName, blogs, handleLogout }) => {
    const logoutButton = (handleLogout) => (
        <button onClick={handleLogout}>Log out</button>
    )

    return (
        <div>
            <h2>Blogs</h2>
            <p>{displayName} logged in {logoutButton(handleLogout)}</p>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default BlogForm