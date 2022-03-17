const router = require('express').Router()

const { User, Session } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const destroyToken = async (token) => {
  await token.destroy()
}

router.delete('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const tokens = await Session.findAll({ where: { user_id: user.id }})
    tokens.forEach(token => destroyToken(token))
    res.status(200).send()
  } catch (error) {
    next(error)
    res.status(400).json(error)
  }
})

module.exports = router