import { useState } from 'react'
import Anecdote from './Anecdote'
import Button from './Button'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  })
  
  const handleRandomAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const handleVoteAnecdote = () => setPoints({...points, [selected]: points[selected] + 1})
  const mostVotedAnecdote = () => {
    let higherVotes = 0
    for (const anecdote in points) {
      if (points[anecdote] > higherVotes) {
        higherVotes = points[anecdote]
      }
    }
    return Object.values(points).indexOf(higherVotes)
  }

  return (
    <div>
      <Anecdote header={'Anecdote of the day'} anecdote={anecdotes[selected]} points={points[selected]} />
      <Button handleClick={handleVoteAnecdote} text={'vote'} />
      <Button handleClick={handleRandomAnecdote} text={'next anecdote'} />
      <Anecdote header={'Anecdote with most votes'} anecdote={anecdotes[mostVotedAnecdote()]} points={points[mostVotedAnecdote()]} />
    </div>
  )
}

export default App