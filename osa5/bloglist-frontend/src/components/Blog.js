import React, { useState } from 'react'
import '../index.css'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, username }) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const buttonText = visible ? 'Hide' : 'Show'

    const blogStyle = {
        borderStyle: 'solid',
        borderRadius: '3px',
        padding: '5px',
        margin: '5px'
    }

    const removeButton = blog.user.username === username ? (<button id={blog.id} onClick={handleDelete}>Remove</button>) : null

    Blog.propTypes = {
        blog: PropTypes.object.isRequired,
        handleLike: PropTypes.func.isRequired,
        handleDelete: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired
    }

    if (visible) {
        return (
            <div style={blogStyle} className="blog">
                {blog.title} <button onClick={() => toggleVisibility()}>{buttonText}</button> <br />
                {blog.url} <br />
                {blog.likes} <button className='likeButton' id={blog.id} onClick={handleLike}>Like</button> <br />
                {blog.author} <br />
                {removeButton}
            </div>
        )
    } else {
        return (
            <div style={blogStyle} className="blog">
                {blog.title} By {blog.author}
                <button className='showButton' onClick={() => toggleVisibility()}>{buttonText}</button>
            </div>
        )
    }
}

export default Blog