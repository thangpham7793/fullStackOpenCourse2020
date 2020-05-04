import React, { useState, useEffect } from 'react'
import Display from './Components/Display'
import Filter from './Components/Filter'
import Form from './Components/Form'
import Notification from './Components/Notification'
import http from './services/http'


const App = () => {
  const [ persons, setPersons ] = useState([])
  
  //Store all fields inside object newValues, so the form will be updated if a new input field is specified as a key:value pair inside the object newValues
  const [ newSearchPhrase, setSearchPhrase ] = useState('')
  const emptyValue = {name: '', number: ''}
  const [ newValues, setNewValues ] = useState(emptyValue)
  const [message, setMessage] = useState('')

  const showThenHideMessage = message => name => {
      setMessage(`${message} ${name}`)
      setTimeout(() => setMessage(''), 2000)
  }
  const addDone = showThenHideMessage('Successfully Added')
  const deleteDone = showThenHideMessage('Successfully Deleted')
  const updateDone = showThenHideMessage('Successfully Updated')
  const addFailed = showThenHideMessage('There was an error adding')
  const deleteFailed = showThenHideMessage('There was an error deleting')
  const updateFailed = showThenHideMessage('There was an error updating')
  
  const createPerson = (submittedValues) => {
    http.create(submittedValues)
            .then(returnedNewPerson => {
                setPersons([...persons, returnedNewPerson])
                addDone(submittedValues.name)
                setNewValues(emptyValue)
            })
            .catch(err => addFailed(submittedValues.name))
  }
  
  const recreatePerson = (submittedValues) => {
    http.create(submittedValues)
            .then(returnedNewPerson => {
                setPersons([...persons, returnedNewPerson])
                addDone(submittedValues.name)
                setNewValues(emptyValue)
                fetchData() //reset the view to remove duplicates
            })
            .catch(err => addFailed(submittedValues.name))
  }

  const response = (name, submittedValues) => {
    if(window.confirm(`Already deleted ${name} Do you wish to re-add ${name}?`)) {
        //re-add the deleted person and reset the view
        setMessage('')
        recreatePerson(submittedValues) //fetchData() is called first, or ...
        } else {
        //reset the view
        setMessage('')
        fetchData()
    }
  }
  const updateFailed404 = (name, submittedValues) => {
    setMessage(`Error: Already deleted ${name}`)
    setTimeout(() => response(name, submittedValues), 1000)
  }

  const fetchData = () => {
    http.getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
          setMessage('')
        })
        .catch(err => {setMessage('There was an error fetching the data from the server!')
                       setTimeout(() => setMessage(''), 2000)})
  }

  //get data on first render
  useEffect(() => {
    setMessage('Fetching Data')
    fetchData()
  }, [])

  //handle user inputs
  const handleValueChange = (e) => { 
    setNewValues({
      ...newValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      const submittedValues = {...newValues}
      const processStr = str => str.replace(/\W|\d/g, '').toLowerCase()
      //check for name duplicates
      if (persons.findIndex(({name}) => processStr(name) === processStr(submittedValues.name)) === -1) {
          createPerson(submittedValues)        
      } else {
          if (window.confirm(`${submittedValues.name} has already been added! Replace the old number with a new one?`) === false) {
            setNewValues(emptyValue)
            return
          }
          
          const personToUpdate = persons.find(person => person.name === submittedValues.name)
          
          http.update(personToUpdate.id, submittedValues)
              .then(modifiedPerson => {
                setPersons(persons
                            .map(person => 
                              person.id === modifiedPerson.id 
                              ? modifiedPerson 
                              : person))
                updateDone(personToUpdate.name)
                setNewValues(emptyValue)
              })
              .catch(err => {
                if (err.response.status === 404) {
                  updateFailed404(personToUpdate.name, submittedValues)
              } else {
                updateFailed(personToUpdate.name)
              }
        })
      }      
  }

  const handleDelete = (e) => {
    console.log(e.target.getAttribute('data-key'));
    
    const toRemovePersonID = e.target.getAttribute('data-key')
    const toRemoverPersonName = persons.filter(({id}) => id.toString() === toRemovePersonID)[0].name
    http.remove(toRemovePersonID)
        .then(res => {setPersons(persons.filter(({id}) => id.toString() !== toRemovePersonID))
                      deleteDone(toRemoverPersonName)
        })
        .catch(err => deleteFailed(toRemoverPersonName))
  }

  const handleSearchPhrase = (e) => setSearchPhrase(e.target.value)

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={message}/>
      
      <Filter newSearchPhrase={newSearchPhrase}
              handleSearchPhrase={handleSearchPhrase}
      />
      
      <h2>New Entry</h2>
      <Form newValues={newValues} handleSubmit={handleSubmit} handleValueChange={handleValueChange}/>
      
      {/* Display added persons */}
      <h3>Added</h3>
      <ul>

          { persons.length === 0 
            ? <h4>Fetching Data</h4>
            : <Display persons={persons} 
                       searchPhrase={newSearchPhrase}
                       handleDelete={handleDelete} />
          }
          
      </ul>
    </div>
  )
}

export default App