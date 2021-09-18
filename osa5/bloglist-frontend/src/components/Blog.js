import React from 'react'
import '../index.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, className }) => {
    Blog.propTypes = {
        blog: PropTypes.object.isRequired,
    }

    return (
        <div className={className}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} By {blog.author}</Link>
        </div>
    )
}

export default Blog