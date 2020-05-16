//util
const logger = require('./utils/logger')
const {MONGODB_URI} = require('./utils/config')
const middleware = require('./utils/middleware')
//server-related
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const express = require('express')
const app = express()

//middleware
const cors = require('cors')

//database-related

const mongoose = require('mongoose')

//CONNECT TO DATABASE

logger.info(`connecting to ${MONGODB_URI}`)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(_result => logger.info(`connected to MongoDB`))
        .catch(error => logger.error(`error connecting to MongoDB: ${error.message}`))

//BEFORE REQUESTS HIT

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


//ERRORS GET HANDLED

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app