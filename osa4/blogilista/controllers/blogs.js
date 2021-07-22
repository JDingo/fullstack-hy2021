const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 })

    response.json(blogs.map(note => note.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const userId = request.user
    if (!request.token || !userId) {
        return response.status(401).json({ error: 'token missing or invalid '})
    }
    const user = await User.findById(userId)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user._id
    })

    try {
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(savedBlog.toJSON())
    } catch (exception) {
        response.status(400).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const blogToBeDeleted = await Blog.findById(request.params.id)
    const userId = request.user

    if (blogToBeDeleted.user.toString() === userId) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter