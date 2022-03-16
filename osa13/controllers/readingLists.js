const { ReadingList } = require('../models')

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

module.exports = router