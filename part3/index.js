if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} //load env vars, so must be imported first!
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person') //closure in action
//could require some library to generate unique ids
const app = express()
//define custom token
//name, followed by the function that returns the value of the said token
//don't forget to stringify, since the output of morgan() is string
morgan.token('post-data', (req) => JSON.stringify(req.body))

//an example of middleware (processing incoming requests before dispatching to server)
//order of middleware is very important! => this is where HOC and FP come into play, since there's so much chaining going on!
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))


//ROUTE HANDLERS

//landing page
app.get('/', (req, res) => {
  res.send('<h1>You have reached the backend of the Phone Book!</h1>')
})

//about page
app.get('/info', (req, res) => {
  const mess = `Phonebook has info for ${Person.length} people.`
  const dateTime = `The current time is ${new Date()}`
  res.send(`<p>${mess}</p>
            <p>${dateTime}</p>`)
})

//get ONE
app.get('/api/persons/:id', (req, res, next) => {
  //mongoose method?
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch((error) =>  next(error)) //pass the error to middleware error()
})

//get ALL
app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons.map(person => person.toJSON()))
    })
})


//post ONE

//can be replaced by Math.random() * Number.MAX_SAFE_INTEGER

//helper func to remove

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  //create a new person object based on the imported Person model and the data supplied by the req.body
  const person = new Person ({
    name: body.name,
    number: body.number,
  })
  //add new person. The savedPerson will be returned as a Mongoose object and passed to the callback

  //promise chaining
  person
    .save()
    .then(savedPerson => {
      return savedPerson.toJSON()
    })
    .then(formattedPerson => {
      return res.json(formattedPerson)
    })
    .catch(err => {
      next(err)})
})

//delete one
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(_result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

//put One

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(err => next(err))
})

//middleware for unhandled request
function unknownEndPoint (req, res) {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndPoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(404).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on ${PORT}`))

//link to page
//https://fullstackopen.com/en/part3/node_js_and_express
//link to app: https://peaceful-retreat-41072.herokuapp.com/