import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => 
        <Part part={part} key={part.id} />
      )}
    </div>
  )
}

const Total = (props) => {
  const numofexercises = props.course.parts.reduce(function(accumulator, object) {return accumulator + object.exercises}, 0)

  return (
    <p>
      Number of exercises {numofexercises}
    </p>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;
