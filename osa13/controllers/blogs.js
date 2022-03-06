const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    await blog.destroy()
    res.sendStatus(200)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    blog.likes = req.body.likes
    await blog.save()
    res.json(blog)
  } catch (error) {
      res.status(400).send({ error })
  }
})

module.exports = router