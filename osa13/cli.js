require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    const formattedBlogs = formatBlogs(blogs)

    formattedBlogs.forEach(blog => console.log(blog));

    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

const formatBlogs = ( blogList ) => {
  const formattedBlogStrings = blogList.map(blog => `${blog.author}: ${blog.title}, ${blog.likes} likes`)
  return formattedBlogStrings
}

main()