import  React from "react";
const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <b>total of {total} exercises</b>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {
        parts.map(part => (
          <Part key={part.id} part={part} />
        ))
      }
    </div>
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