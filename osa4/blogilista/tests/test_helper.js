const Blog = require('../models/blog')

const initialList = [
    {
        title: 'Koirablogi',
        author: 'Koira Keksi',
        url: 'koire.fi',
        likes: 1,
    },
    {
        title: 'Kissablogi',
        author: 'Kissa Kallu',
        url: 'kassi.fi',
        likes: 1000,
    },
    {
        title: 'Lisko',
        author: 'Lisko Liimatta',
        url: 'sisisliskot.fi',
        likes: 5,
    },
    {
        title: 'Alpakka',
        author: 'Alpakka Allu',
        url: 'Alpakat.io',
        likes: 5123,
    },
    {
        title: 'Kissablogi 2',
        author: 'Kissa Kallu',
        url: 'kassi2.fi',
        likes: 5000,
    },
    {
        title: 'Kissablogi 3',
        author: 'Kissa Kallu',
        url: 'kassi3.fi',
        likes: 0,
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialList, blogsInDb
}