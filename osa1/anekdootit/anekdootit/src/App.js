import React, { useState } from 'react'

const Button = ({ text, clickHandler }) => (
  <button onClick={clickHandler}>
    {text}
  </button>
)

const MostVotes = ({ votes, anecdotes }) => {
  let largest = 0
  for(let i=0; i < votes.length; i++){
    if(votes[i] > votes[largest])largest = i
  }

  return(
    <div>
      <h2>anecdote with most votes</h2>
      {anecdotes[largest]}<br/>
      has {votes[largest]} votes
    </div>
  )
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
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const randomAnecdote = () => {
    let randomNumber = selected
    while (randomNumber === selected){
      randomNumber = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(randomNumber)
  }
  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h2>ancdote  of the day</h2>
      {anecdotes[selected]}<br/>
      has {votes[selected]} votes<br/>
      <Button text="vote" clickHandler={addVote} />
      <Button text="next anecdote" clickHandler={randomAnecdote}/>
      <MostVotes votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App