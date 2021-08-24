import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (id) => {
    return {
        type: 'VOTE_ANECDOTE',
        data: { id }
    }
}

export const createAnecdote = (data) => {
    return {
        type: 'NEW_ANECDOTE',
        data
    }
}

const compareLikes = (a, b) => {
    if (a.votes - b.votes < 0) {
        return 1
    }
    if (a.votes - b.votes > 0) {
        return -1
    }

    return 0
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

const reducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'VOTE_ANECDOTE':
            const id = action.data.id
            const votedAnecdote = state.find(anecdote => anecdote.id === id)
            const updatedAnecdote = {
                ...votedAnecdote,
                votes: votedAnecdote.votes + 1
            }

            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : updatedAnecdote
            )
        case 'NEW_ANECDOTE':
            return [...state, action.data]
        case 'SORT':
            const sortedAnecdotes = [...state].sort(compareLikes)
            return sortedAnecdotes
        case 'INIT_ANECDOTES':
            return action.data
        default:
            return state
    }
}

export default reducer