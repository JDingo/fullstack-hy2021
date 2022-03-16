const { ReadingList, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
  try {
    const reading = await ReadingList.create(req.body)
    res.json(reading)
  } catch (error) {
    next(error)
    res.status(400).json({ error: error.errors[0].message })
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)

    const readBlog = await ReadingList.findOne({
      where: {
        userId: user.id, blogId: req.params.id
      }
    })

    readBlog.readStatus = req.body.read
    readBlog.save()
    res.json(readBlog)
  } catch (error) { next(error) }
})

module.exports = router