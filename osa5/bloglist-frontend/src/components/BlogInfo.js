import React from 'react'

const BlogInfo = ({ blog, handleLike, handleDelete, username }) => {
    if (!blog) {
        return null
    }

    const removeButton = blog.user.username === username ? (<button id={blog.id} onClick={handleDelete}>Remove</button>) : null

    return (
        <div>
            <h2>{blog.title} By {blog.author}</h2>
            <div>
                <a href="">{blog.url}</a> <br />
                {blog.likes} likes <button id={blog.id} onClick={handleLike}>Like</button> <br />
                Added by {blog.user.name} <br />
                {removeButton}
            </div>
        </div>
    )
}

export default BlogInfo