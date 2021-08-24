import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === '') {
            return anecdotes
        }

        return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })

    const vote = ({ content, id, votes }) => {
        console.log('vote', id)
        dispatch(voteAnecdote(content, id, votes))
        
        dispatch(setNotification(`You voted '${content}'.`, 5))
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