const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

const emptyList = []

const listWithOneBlog = [
    {
        _id: '60ee9df50d364c3c2814ca79',
        title: 'Koirablogi',
        author: 'Koira Keksi',
        url: 'koire.fi',
        likes: 5,
        __v: 0
    }
]

const listWithManyBlogs = [
    {
        _id: '60ee9df50d364c3c2814ca79',
        title: 'Koirablogi',
        author: 'Koira Keksi',
        url: 'koire.fi',
        likes: 1,
        __v: 0
    },
    {
        _id: '60eb9df50d364c3c2814ca79',
        title: 'Kissablogi',
        author: 'Kissa Kallu',
        url: 'kassi.fi',
        likes: 1000,
        __v: 0
    },
    {
        _id: '60ec9df50d364c3c2814ca79',
        title: 'Lisko',
        author: 'Lisko Liimatta',
        url: 'sisisliskot.fi',
        likes: 5,
        __v: 0
    },
    {
        _id: '60ed9df50d364c3c2814ca79',
        title: 'Alpakka',
        author: 'Alpakka Allu',
        url: 'Alpakat.io',
        likes: 5123,
        __v: 0
    },
    {
        _id: '60eb9df50d364c3c2814ca79',
        title: 'Kissablogi 2',
        author: 'Kissa Kallu',
        url: 'kassi2.fi',
        likes: 5000,
        __v: 0
    },
    {
        _id: '60eb9df50d364c3c2814ca79',
        title: 'Kissablogi 3',
        author: 'Kissa Kallu',
        url: 'kassi3.fi',
        likes: 0,
        __v: 0
    }
]

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes(emptyList)).toBe(0)
    })

    test('when list has only one blog equals to the likes of that blog', () => {
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(listWithManyBlogs)).toBe(11129)
    })
})

describe('favourite blog', () => {
    test('when the most liked count is 5123', () => {
        expect(listHelper.favouriteBlog(listWithManyBlogs)).toEqual(listWithManyBlogs[3])
    })
})

describe('most prolific author', () => {
    test('when the cat has written 3', () => {
        expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual({ author: 'Kissa Kallu', blogs: 3})
    })
 
})

describe('author with most likes', () => {
    test('is Kissa Kallu with 6000 likes', () => {
        expect(listHelper.mostLikes(listWithManyBlogs)).toEqual({ author: 'Kissa Kallu', likes: 6000})
    })
})