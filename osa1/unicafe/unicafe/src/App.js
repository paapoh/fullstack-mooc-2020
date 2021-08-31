import React, { useState } from 'react'

const Header = ({ text }) => <h2>{text}</h2>
const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value, endfix }) => (
  <tr>
    <td>{text}</td>
    <td>{value}{endfix}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) =>{
  if(good+neutral+bad === 0){
    return(
      <p>No feedback given</p>
    )
  }

  return(
    <table>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={good+neutral+bad}/>
      <StatisticLine text="average" value={(good-bad)/(good + neutral + bad)}/>
      <StatisticLine text="positive" value={good / (good + neutral + bad) * 100} endfix="%"/>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text="Give feedback" />
      
      <Button
        text="good"
        handleClick={incrementGood}
      />
      <Button
        text="neutral"
        handleClick={incrementNeutral}
      />
      <Button
        text="bad"
        handleClick={incrementBad}
      />

      <Header text="Statistics" />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />

    </div>
  )
}

export default App