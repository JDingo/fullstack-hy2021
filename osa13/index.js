const express = require('express')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const app = express()
app.use(express.json())

const blogsRouter = require('./controllers/blogs')

app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()