export const setVoteNotification = (content) => {
    return {
        type: 'SET_VOTE_NOTIFICATION',
        data: {
            message: `You voted '${content}'`
        }
    }
}

export const setCreationNotification = (content) => {
    return {
        type: 'SET_CREATION_NOTIFICATION',
        data: {
            message: `New anecdote '${content}' added`
        }
    }
}

export const removeNotification = () => {
    return { type: 'REMOVE_NOTIFICATION' }
}

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_VOTE_NOTIFICATION':
            return action.data.message
        case 'SET_CREATION_NOTIFICATION':
            return action.data.message
        case 'REMOVE_NOTIFICATION':
            return null
        default: 
            return state
    }
}

export default reducer