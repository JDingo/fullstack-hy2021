import React from 'react'
import Blog from './Blog'

const BlogForm = ({ displayName, blogs }) => {
    return (
        <div>
            <h2>Blogs</h2>
            <p>{displayName} logged in</p>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default BlogForm