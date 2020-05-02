import React, { useState, useEffect } from 'react'
import Display from './Components/Display'
import Filter from './Components/Filter'
import Form from './Components/Form'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])

  //Store all fields inside object newValues, so the form will be updated if a new input field is specified as a key:value pair inside the object newValues
  const [ newSearchPhrase, setSearchPhrase ] = useState('')
  const [ newValues, setNewValues ] = useState(
    {name: '', number: '', address: '', "marital status": ''})

  const hook = () => {
    axios.get('http://localhost:3001/persons')
          .then(res => {setPersons(res.data)})
  }

  useEffect(hook, [])
  
  const handleValueChange = (e) => { 
    setNewValues({
      ...newValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      const submittedValues = {...newValues}

      //check for name duplicates
      if (persons.findIndex(person => person.name === submittedValues.name) === -1) {
          
          //update persons
          setPersons([...persons, submittedValues]);
          
          //reset the value of all fields to ''
          setNewValues(newValues => {
              Object.keys(newValues).forEach(key => newValues[key] = '')
              return newValues
            }
          );     
      } else {
          alert(`${submittedValues.name} has already been added!`);
      }      
  }

  const handleSearchPhrase = (e) => setSearchPhrase(e.target.value)


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearchPhrase={newSearchPhrase}
              handleSearchPhrase={handleSearchPhrase}
      />
      <h3>New Entry</h3>
      <Form newValues={newValues} handleSubmit={handleSubmit} handleValueChange={handleValueChange}/>
      
      {/* Display added persons */}
      <h3>Added</h3>
      <ul>

          { persons.length === 0 
            ? <h4>Fetching Data</h4>
            : <Display persons={persons} searchPhrase={newSearchPhrase} />
          }
          
      </ul>
    </div>
  )
}

export default App