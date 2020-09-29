import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
)
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([])
  const [max, setMax] = useState({n:0,i:0})
  const next = () => setSelected(parseInt(Math.random() * 6, 10))
  const vote = () => {
    const copy = [...points]
    if (!copy[selected]) copy[selected] = 1
    else copy[selected] += 1
    setPoints(copy)
    if(copy[selected] > max.n) {
      setMax({n:copy[selected],i:selected})
    }
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected] || 0} votes</p>
      <br />
      <Button onClick={() => vote()} text="vote" />
      <Button onClick={() => next()} text="next anecdotes" />
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[max.i]}</p>
      <p>has {max.n || 0} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)