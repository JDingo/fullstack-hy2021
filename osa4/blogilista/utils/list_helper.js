const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (likesAccumulator, currentBlog) => likesAccumulator + currentBlog.likes

    if (blogs.length === 0) {
        return 0
    } else {
        return blogs.reduce(reducer, 0)
    }
}

const favouriteBlog = (blogs) => {
    const reducer = (currentFavourite, currentBlog) => {
        if (currentBlog.likes > currentFavourite.likes) {
            return currentBlog
        } else {
            return currentFavourite
        }
    }

    return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
    const blogsByAuthor = lodash.countBy(blogs, 'author')

    let currentAuthor = ''
    let currentAmount = 0;

    for (const author in blogsByAuthor) {
        if (blogsByAuthor[author] > currentAmount) {
            currentAuthor = author
            currentAmount = blogsByAuthor[author]
        }
    }

    return { author: currentAuthor, blogs: currentAmount }
}

const mostLikes = (blogs) => {
    const blogsByAuthor = lodash.groupBy(blogs, 'author')

    const reducer = (likesAccumulator, currentBlog) => {
        return likesAccumulator + currentBlog.likes
    }

    for (const author in blogsByAuthor) {
        blogsByAuthor[author] = blogsByAuthor[author].reduce(reducer, 0)
    }

    const list = []
    for (const author in blogsByAuthor) {
        blogsByAuthor[author] = list.push(({ 'author': author, 'likes': blogsByAuthor[author] }))
    }

    const sorted = lodash.orderBy(list, 'likes', 'desc')

    return sorted[0]
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}