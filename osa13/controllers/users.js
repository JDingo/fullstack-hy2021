const router = require('express').Router()
const bcrypt = require('bcrypt')

const { User, Blog, ReadingList } = require('../models')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['passwordHash'] },
      include: [{
        model: Blog,
        attributes: { exclude: ['createdAt, updatedAt', 'userId'] },
      }
      ]
    })
    res.json(users)
  } catch (error) { next(error) }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      },
      attributes: { exclude: ['passwordHash'] },
      include: [{
        model: Blog,
        attributes: { exclude: ['createdAt, updatedAt', 'userId'] },
      },
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['createdAt, updatedAt', 'userId'] },
        through: {
          attributes: ['readStatus', 'id']
        }
      }]
    })

    res.json(user)
  } catch (error) { next(error) }
})

router.post('/', async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    const user = User.build({ ...req.body, passwordHash: passwordHash })
    await user.save()
    res.json(user)
  } catch (error) {
    next(error)
    res.status(400).json({ error: error.errors[0].message })
  }
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