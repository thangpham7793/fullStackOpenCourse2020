import React from 'react'
import ReactDOM from 'react-dom'
import Course from './Component/Course'

const App = () => {
  const courses = [
    {
        name: 'Half Stack application development',
        id: 1,
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
            },
            {
                name: 'Redux',
                exercises: 11
            }
        ]
    },

    {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
    }
  ]
        
  const coursesOutlines = courses.map((course,i) => <Course key={i} course={course}/>)
  return (
    <div>
      {coursesOutlines}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))