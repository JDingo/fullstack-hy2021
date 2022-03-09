const router = require('express').Router()

const { Op } = require('sequelize')
const { Blog, User } = require('../models')

const { tokenExtractor } = require('../util/middleware')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res, next) => {
  const where = {}

  if ( req.query.search ) {
    where.title = {
      [Op.iLike]: req.query.search ? `%${req.query.search}%` : ''
    }
  }

  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: { exclude: ['id', 'passwordHash', 'createdAt', 'updatedAt'] }
      },
      where
    })
    res.json(blogs)
  } catch (error) { next(error) }
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
    res.json(blog)
  } catch (error) { next(error) }
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, res, next) => {
  try {
    if (req.blog.userId === req.decodedToken.id) {
      await req.blog.destroy()
    } else {
      res.status(401).json({ "error": "Unauthorized" })
    }
    
    res.sendStatus(200)
  } catch (error) { next(error) }
})

router.put('/:id', blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } catch (error) { next(error) }
})

module.exports = router