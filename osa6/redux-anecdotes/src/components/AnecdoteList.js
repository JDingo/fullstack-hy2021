import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setVoteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = ({ content, id }) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        dispatch({ type: 'SORT' })
        dispatch(setVoteNotification(content))

        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }


    return (
        <div>
        {
            anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )
        }
        </div>
    )
}

export default AnecdoteList