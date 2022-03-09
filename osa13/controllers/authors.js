const router = require('express').Router()

const sequelize = require('sequelize')
const { Blog, User } = require('../models')

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      attributes: [
        'author',
        [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
      ],
      group: 'author',
      order: [
        [sequelize.fn('SUM', sequelize.col('likes')), 'DESC']
      ]
    })
    res.json(blogs)
  } catch (error) { next(error) }
})

module.exports = router