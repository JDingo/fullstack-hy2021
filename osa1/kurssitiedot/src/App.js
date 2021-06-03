import React from 'react'

const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.numofexercises}
    </p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}


const App = () => {
  const course = 'Half Stack application development'

  const part1 = {
    name: 'Fundementals of React',
    exercises: 10
  }
  const part3 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part2 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1}
        part2={part2} exercises2={exercises2}
        part3={part3} exercises3={exercises3}
        />
      <Total numofexercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App;
