import React from 'react'

//Header component
const Header = ({name}) => <h1>{name}</h1>

//Part component
const Part = (props) => <p>{props.name} {props.exercises}</p>

//Content component
const Content = ({content}) => {
  
    //mapping over each part in props.parts to generate individual Part
  const parts = content.map(({name, exercises}, i) => 
    <Part key={i} name={name} exercises={exercises}/>)

  return (<>{parts}</>)}

//Total component
const Total = ({content}) => {
  
    //using reduce() and object destructuring to calculate the total value
  const total = content.reduce((a,{exercises}) => exercises + a, 0)
  
  return (
    <p>
        <b>total of {total} exercises</b>
    </p>
  )
}

//Course component
const Course = (props) => {

  const {name, parts} = props.course
  
  return (
    <div>
      <Header name={name}/>
      <Content content={parts}/>
      <Total content={parts}/>
    </div>
  )
}

export default Course