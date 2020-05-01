import React from 'react'
import ReactDOM from 'react-dom'


//Header component
const Header = (props) => <h1>{props.course}</h1>

//Part component
const Part = (props) => <p>{props.name} {props.exercises}</p>

//Content component
const Content = (props) => {
  //mapping over each part in props.parts to generate individual Part
  const parts = props.parts.map(({name, exercises}) => 
  <Part name={name} exercises={exercises}/>)
  
  return (<div>{parts}</div>)}

//Total component
const Total = (props) => {
  //using reduce() and object destructuring to calculate the total value
  const total = props.parts.reduce((a,{exercises}) => exercises + a, 0)

  return (<p>Number of exercises {total}</p>)}

//Putting it all together
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10
            },
            {
              name: 'Using props to pass data',
              exercises: 7
            },
            {
              name: 'State of a component',
              exercises: 14
            }
          ]
  }
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

//Thank you for taking the time to review my work!
ReactDOM.render(<App />, document.getElementById('root'))