const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password.length < 3) {
        return response.status(400).json({ 
            error: 'minimum length for password is 3'
        })
    } else if (body.username.length < 3) {
        return response.status(400).json({ 
            error: 'minimum length for username is 3'
        })
    }

    const saltRounds = 10
    const passwordHash = bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (exception) {
        response.status(400).json({ 
            error: 'username already exists'
        })
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter