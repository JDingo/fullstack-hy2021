const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs.map(note => note.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0
    })

    try {
        const savedBlog = await blog.save()
        response.json(savedBlog.toJSON())
    } catch (exception) {
        response.status(400).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter