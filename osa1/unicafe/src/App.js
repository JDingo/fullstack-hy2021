import React, { useState } from 'react'

const Header = ({ text }) => ( <h1>{text}</h1> )

const Button = ({ feedbackType, feedbackFunction, text }) => {
  return (
    <button onClick={() => incrementByOne(feedbackType, feedbackFunction)}>
      {text}
    </button>
  )
}

const incrementByOne = (feedbackType, feedbackFunction) => feedbackFunction(feedbackType + 1)

const StatisticLine = ({ text, value }) => <p>{text} {value}</p>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100

  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <StatisticLine text='Good' value={good} />
      <StatisticLine text='Neutral' value={neutral} />
      <StatisticLine text='Bad' value={bad} />

      <StatisticLine text='All' value={total} />
      <StatisticLine text='Average' value={average} />
      <StatisticLine text='Positive' value={positive} />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='Give feedback' />
      <div>
        <Button text='Good' feedbackType={good} feedbackFunction={setGood} />
        <Button text='Neutral' feedbackType={neutral} feedbackFunction={setNeutral} />
        <Button text='Bad' feedbackType={bad} feedbackFunction={setBad} />
      </div>
      <Header text='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App