const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')


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

            blogsAfterDelete.forEach(blog => delete blog.id)
            delete blogToDelete.id

            expect(blogsAfterDelete).not.toContainEqual(blogToDelete)
        })
    })

    describe('updating a blog', () => {
        test('update every property of a blog', async () => {
            const blogsBeforeUpdate = await helper.blogsInDb()
            const blogToUpdate = blogsBeforeUpdate[0]

            const updatedBlog = {
                title: 'Test Blog',
                author: 'Tester',
                url: 'test.test',
                likes: 1
            }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updatedBlog)
                .expect(200)

            const blogsAfterUpdate = await helper.blogsInDb()

            blogsAfterUpdate.forEach(blog => delete blog.id)

            expect(blogsAfterUpdate).toContainEqual(updatedBlog)
        })
    })
})

describe('when there are some initial users', () => {

    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('test', 10)

        const testUser = new User({
            username: 'testuser',
            name: 'tester',
            passwordHash
        })

        await testUser.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'newUser',
            name: 'New',
            password: 'new'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

})

afterAll(() => {
    mongoose.connection.close()
})