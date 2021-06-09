import React, { useState } from 'react'

const getRandomInt = () => {
  return Math.floor(Math.random() * 6)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const anecdoteVotes = new Array(6).fill(0)
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdoteVotes)

  const voteAnecdote = (index) => {
    const copy = [...votes]
    copy[index] += 1

    setVotes(copy)
  }

  return (
    <div>
      <div>
        <p>{anecdotes[selected]}</p>
        <p>This anecdote has {votes[selected]} votes.</p>
      </div>
      <div>
        <button onClick={() => setSelected(getRandomInt)}>Next anecdote</button>
        <button onClick={() => voteAnecdote(selected)}>Vote anecdote</button>
      </div>
    </div>
  )
}

export default App