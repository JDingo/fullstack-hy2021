const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const { Session } = require('../models')
const { errorHandler } = require('../util/middleware')

router.post('/', errorHandler, async (request, response, next) => {
  try {
    const body = request.body

    const user = await User.findOne({
      where: {
        username: body.username
      }
    })
    const passwordCorrect = user == null
      ? false
      : bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET)

    await Session.create({ user_id: user.id, session_token: token })

    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  } catch (error) {
    next(error)
  }
})


module.exports = router