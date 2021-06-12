import React from 'react'

const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part part={part} key={part.id} />
            )}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((acc, part) => acc + part.exercises, 0)

    return (
        <h3>
            Total of {total} exercises
        </h3>
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
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course