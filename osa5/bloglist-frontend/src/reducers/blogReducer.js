import blogService from '../services/blogs'

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
        dispatch(sortBlogs())
    }
}

export const sortBlogs = () => {
    return {
        type: 'SORT_BLOGS'
    }
}

export const newBlog = (blog) => {
    return async dispatch => {
        const createdBlog = await blogService.create(blog)
        console.log(createdBlog)
        dispatch({
            type: 'NEW_BLOG',
            data: createdBlog
        })
    }
}

export const updateBlog = (blog, id) => {
    return async dispatch => {
        const updatedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
        }

        const currentBlog = await blogService.update(updatedBlog, id)

        dispatch({
            type: 'UPDATE_BLOG',
            data: currentBlog
        })

        dispatch(sortBlogs())
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETE_BLOG',
            id
        })
        dispatch(sortBlogs)
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'INIT_BLOGS':
            return action.data
        case 'SORT_BLOGS': {
            const sortableBlogs = [...state]
            const sortedBlogs = sortableBlogs.sort(function (a, b) {
                return b.likes - a.likes
            })

            return sortedBlogs
        }
        case 'DELETE_BLOG': {
            const filteredBlogs = state.filter(blog => blog.id !== action.id)

            return filteredBlogs
        }
        case 'UPDATE_BLOG': {
            const targetBlogIndex = state.findIndex(blog => blog.id === action.data.id)

            const newState = [...state]
            newState[targetBlogIndex] = action.data

            return newState
        }
        default:
            return state
    }

}

export default reducer