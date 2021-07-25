import React, { useState } from 'react'
import '../index.css'

const Blog = ({ blog }) => {
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

  if (visible) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={() => toggleVisibility()}>{buttonText}</button> <br/>
        {blog.url} <br/>
        {blog.likes} <button>Like</button> <br/>
        {blog.author} <br/>
      </div >
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} By {blog.author}
        <button onClick={() => toggleVisibility()}>{buttonText}</button>
      </div>
    )
  }
}

export default Blog