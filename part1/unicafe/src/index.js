import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>
const Feedback = ({ good, setGood, neutral, setNeutral, bad, setBad }) => (
  <>
    <h1>give feedback</h1>
    <Button text="good" onClick={() => setGood(good + 1)}></Button>
    <Button text="neutral" onClick={() => setNeutral(neutral + 1)}></Button>
    <Button text="bad" onClick={() => setBad(bad + 1)}></Button>
  </>
)
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const total = good - bad
  if (!all) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good}></Statistic>
          <Statistic text="neutral" value={neutral}></Statistic>
          <Statistic text="bad" value={bad}></Statistic>
          <Statistic text="all" value={all}></Statistic>
          <Statistic text="average" value={total / all}></Statistic>
          <Statistic text="positive" value={good / all * 100 + '%'}></Statistic>
        </tbody>
      </table>
    </>
  )
}
const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad}></Feedback>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)