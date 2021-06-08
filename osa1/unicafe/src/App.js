import React, { useState } from 'react'

const Header = ({ text }) => ( <h1>{text}</h1> )

const Button = ({ feedbackType, feedbackFunction, text }) => {
  return (
    <button onClick={() => incrementByOne(feedbackType, feedbackFunction)}>
      {text}
    </button>
  )
}

const Total = ({ total, text }) => ( <p>{text} {total}</p> )

const incrementByOne = (feedbackType, feedbackFunction) => feedbackFunction(feedbackType + 1)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100

  return (
    <>
      <p>All {total}</p>
      <p>Average {average}</p>
      <p>positive {positive} %</p>
    </>
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
      <div>
        <Total total={good} text='Good' />
        <Total total={neutral} text='Neutral' />
        <Total total={bad} text='Bad' />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App