import { useState } from 'react'

const Header = ({text}) => { return (<div><h1>{text}</h1></div>) }

const Button = ({handleClick, text}) => {
  return (
      <button onClick={handleClick}>{text}</button>
  )
}
const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <p>no feedback given</p>
    )
  }
  else {
      let total = good + neutral + bad
      let average = (good - bad) / total
      let positive = ((good / total) * 100) + '%'
      return (
        <table>
            <StatisticLine stat={good} text='good' />
            <StatisticLine stat={neutral} text='neutral' />
            <StatisticLine stat={bad} text='bad' />
            <StatisticLine stat={total} text='all' />
            <StatisticLine stat={average} text='average' />
            <StatisticLine stat={positive} text='positive' />
        </table>
    )
  }
}

const StatisticLine = ({stat, text}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  )
}

function App() {
// save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  
  
  return (
    <div>
      <Header text='give feedback'/>
      <Button handleClick={handleGoodClick} text={'good'} />
      <Button handleClick={handleNeutralClick} text={'neutral'} />
      <Button handleClick={handleBadClick} text={'bad'} />
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
  
}

export default App
