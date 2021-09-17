import React from 'react'
import '../index.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
    const blogStyle = {
        borderStyle: 'solid',
        borderRadius: '3px',
        padding: '5px',
        margin: '5px'
    }

    Blog.propTypes = {
        blog: PropTypes.object.isRequired,
    }

    return (
        <div style={blogStyle} className="blog">
            <Link to={`/blogs/${blog.id}`}>{blog.title} By {blog.author}</Link>
        </div>
    )
}

export default Blog