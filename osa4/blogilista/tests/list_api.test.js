const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

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
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialList.length)
    })

    test('every blog with an id field', async () => {
        const response = await api.get('/api/blogs')

        response.body.forEach(blog => expect(blog.id).toBeDefined())
    })
})

describe('post', () => {
    test('new blog, check length and correctness of added blog', async () => {
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

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialList.length + 1)

        delete response.body[response.body.length - 1].id
        expect(response.body).toContainEqual(newBlog)
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

        const response = await api.get('/api/blogs')
        const addedBlog = response.body[response.body.length - 1]
        expect(addedBlog.likes).toBe(0)  
    })
})

afterAll(() => {
    mongoose.connection.close()
})