export const initializeBlogs = (blogs) => {
    return {
        type: 'INIT_BLOGS',
        data: blogs
    }
}

export const sortBlogs = () => {
    return {
        type: 'SORT_BLOGS'
    }
}

export const newBlog = (blog) => {
    return {
        type: 'NEW_BLOG',
        data: blog
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'INIT_BLOGS':
            return action.data
        case 'SORT_BLOGS': {
            const sortedBlogs = state.sort(function (a, b) {
                return b.likes - a.likes
            })

            return sortedBlogs
        }
        default:
            return state
    }

}

export default reducer