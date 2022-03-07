const router = require('express').Router()
const bcrypt = require('bcrypt')

const { User } = require('../models')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['passwordHash'] }
    })
    res.json(users)
  } catch (error) { next(error) }
})

router.post('/', async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    const user = User.build({ ...req.body, passwordHash: passwordHash })
    user.save()
    res.json(user)
  } catch (error) { next(error) }
})

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })

    console.log(req.body)
    user.username = req.body.username
    await user.save()
    res.json(user)
  } catch (error) { next(error) }
})

module.exports = router