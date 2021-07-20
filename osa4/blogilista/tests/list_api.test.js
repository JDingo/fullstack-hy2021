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

afterAll(() => {
    mongoose.connection.close()
})