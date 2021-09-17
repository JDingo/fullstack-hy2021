import React, { useState } from 'react'

const BlogInfo = ({ blog, handleLike, handleDelete, username, handleComment }) => {
    const [comment, setComment] = useState('')

    if (!blog) {
        return null
    }

    const removeButton = blog.user.username === username ? (<button id={blog.id} onClick={handleDelete}>Remove</button>) : null

    const commentHelper = (event) => {
        handleComment(event, comment)
    }

    return (
        <div>
            <h2>{blog.title} By {blog.author}</h2>
            <div>
                <a href="">{blog.url}</a> <br />
                {blog.likes} likes <button id={blog.id} onClick={handleLike}>Like</button> <br />
                Added by {blog.user.name} <br />
                {removeButton}
            </div>

            <h3>Comments</h3>
            <div>
                <input
                    id="comment"
                    type="text"
                    value={comment}
                    name="Comment"
                    onChange={(event) => setComment(event.target.value)}
                />
                <button id={blog.id} onClick={commentHelper}>Add comment</button>
            </div>
            <ul>
                {blog.comments.map(comment =>
                    <li key={comment}>{comment}</li>
                )}
            </ul>
        </div>
    )
}

export default BlogInfo