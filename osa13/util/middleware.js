const jwt = require('jsonwebtoken')
const { User, Session } = require('../models')
const { SECRET } = require('./config')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
}

const tokenValidator = async (req, res, next) => {
  const authorization = req.get('authorization').substring(7)
  const user = await User.findByPk(req.decodedToken.id)

  const sessions = await Session.findOne({ where: {user_id: user.id, session_token: authorization }})

  if (!sessions) {
    return res.status(401).json({ error: 'token invalid' })
  }

  next()
}

const userStatusValidator = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)

  if (user.disabled) {
    return res.status(401).json({ error: 'disabled user' })
  }

  next()
}

module.exports = {
  errorHandler, tokenExtractor, tokenValidator, userStatusValidator
}