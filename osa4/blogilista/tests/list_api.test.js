const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const blog = require('../models/blog')
const { ServerResponse } = require('http')

describe('when there are some intial blogs', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialList)
    })

    describe('get', () => {
        test('all blogs as JSON', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('correct amount of blogs', async () => {
            const response = await helper.blogsInDb()

            expect(response).toHaveLength(helper.initialList.length)
        })

        test('and check id field for every blog', async () => {
            const response = await helper.blogsInDb()

            response.forEach(blog => expect(blog.id).toBeDefined())
        })
    })

    describe('posting a new blog', () => {
        test('new blog and check length and correctness of added blog', async () => {
            const newBlog = {
                title: 'Test Blog',
                author: 'Tester',
                url: 'test.test',
                likes: 1
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const response = await helper.blogsInDb()
            expect(response).toHaveLength(helper.initialList.length + 1)

            delete response[response.length - 1].id
            expect(response).toContainEqual(newBlog)
        })

        test('blog with undefined likes defaults to zero', async () => {
            const newBlog = {
                title: 'Test Blog',
                author: 'Tester',
                url: 'test.test',
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const response = await helper.blogsInDb()
            const addedBlog = response[response.length - 1]
            expect(addedBlog.likes).toBe(0)  
        })

        test('invalid blog and return status code 400', async () => {
            const invalidBlog = {
                url: 'test.test',
                likes: 0
            }

            await api
                .post('/api/blogs')
                .send(invalidBlog)
                .expect(400)
        })
    })

    describe('deleting a blog', () => {
        test('delete a blog', async () => {
            const response = await helper.blogsInDb()

            const blogToDelete = response[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAfterDelete = await helper.blogsInDb()

            expect(blogsAfterDelete).toHaveLength(helper.initialList.length - 1)

            const blogs = blogsAfterDelete.map(blog => delete blog.id)
            delete blogToDelete.id

            expect(blogs).not.toContainEqual(blogToDelete)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})