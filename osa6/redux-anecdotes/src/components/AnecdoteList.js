import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const vote = ({ content, id, votes }) => {
        console.log('vote', id)
        props.voteAnecdote(content, id, votes)

        props.setNotification(`You voted '${content}'.`, 5)
    }

    return (
        <div>
            {
                props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
    if (state.filter === '') {
        return {
            anecdotes: state.anecdotes
        }
    }

    return {
        anecdotes: state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes