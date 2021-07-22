const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


describe('when there are some intial blogs', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialList)

        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('test', 10)

        const testUser = new User({
            username: 'testuser',
            name: 'tester',
            passwordHash
        })

        await testUser.save()
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

    const getAuthAndUserId = async () => {
        const response = await api
            .post('/api/login')
            .send({ username: 'testuser', password: 'test' })

        const user = jwt.verify(response.body.token, process.env.SECRET)
        const userId = user.id
        const auth = `Bearer ${response.body.token}`

        return ({ auth, userId })
    }

    describe('posting a new blog', () => {
        test('new blog and check length and correctness of added blog', async () => {
            const newBlog = {
                title: 'Test Blog',
                author: 'Tester',
                url: 'test.test',
                likes: 1
            }

            const authAndId = await getAuthAndUserId()

            await api
                .post('/api/blogs')
                .send(newBlog)
                .set('Authorization', authAndId.auth)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const response = await helper.blogsInDb()
            expect(response).toHaveLength(helper.initialList.length + 1)

            const expectedNewBlog = {
                title: 'Test Blog',
                author: 'Tester',
                url: 'test.test',
                likes: 1,
                user: authAndId.userId
            }

            delete response[response.length - 1].id
            response[response.length - 1].user = response[response.length - 1].user.toString()
            expect(response).toContainEqual(expectedNewBlog)
        })

        test('blog with undefined likes defaults to zero', async () => {
            const newBlog = {
                title: 'Test Blog',
                author: 'Tester',
                url: 'test.test',
            }

            const authAndId = await getAuthAndUserId()

            await api
                .post('/api/blogs')
                .send(newBlog)
                .set('Authorization', authAndId.auth)
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

            const authAndId = await getAuthAndUserId()

            await api
                .post('/api/blogs')
                .send(invalidBlog)
                .set('Authorization', authAndId.auth)
                .expect(400)
        })

        test('valid blog without token and return status code 401', async () => {
            const newBlog = {
                title: 'Test Blog',
                author: 'Tester',
                url: 'test.test',
                likes: 1
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/)
        })
    })

    describe('deleting a blog', () => {
        test('delete a blog with corresponding token', async () => {
            const newBlog = {
                title: 'Test Blog',
                author: 'Tester',
                url: 'test.test',
                likes: 1
            }

            const authAndId = await getAuthAndUserId()

            await api
                .post('/api/blogs')
                .send(newBlog)
                .set('Authorization', authAndId.auth)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const response = await helper.blogsInDb()

            const blogToDelete = response[response.length - 1]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', authAndId.auth)
                .expect(204)

            const blogsAfterDelete = await helper.blogsInDb()

            expect(blogsAfterDelete).toHaveLength(helper.initialList.length)

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

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const existingUser = {
            username: 'testuser',
            name: 'tester',
            password: 'test'
        }

        const result = await api
            .post('/api/users')
            .send(existingUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username already exists')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const invalidUser = {
            username: 'asda',
            name: 'asda',
            password: 'a'
        }

        const result = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('minimum length for password is 3')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const invalidUser = {
            username: 'a',
            name: 'asda',
            password: 'asda'
        }

        const result = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('minimum length for username is 3')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

})

afterAll(() => {
    mongoose.connection.close()
})