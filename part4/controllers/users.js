const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const logger = require('../utils/logger')


//get all
usersRouter.get('/', async(request, response) => {
  
  logger.info('GET request received, processing...')
  const users = await User.find({})
                          .populate('blogs', 
                                    {title: 1, url: 1})

  logger.info('Successfully returned', users)
  response.json(users.map(u => u.toJSON()))
})

// get one
usersRouter.get('/:id', async(request, response) => {
  
  logger.info('GET request received, processing...')
  const user = await (await User.findById(request.params.id))
                                .populate('blogs')
  
  logger.info('Successfully returned', user.toJSON())
  response.json(user.toJSON())
})

usersRouter.post('/', async(request, response) => {
  logger.info('GET request received, processing...')
  const body = request.body

  if (body.username.length < 3) {
    return response.status(400).json({error: 'username must be at least 3 characters long!'})
  }

  if (body.password.length < 3) {
    return response.status(400).json({error: 'password must be at least 3 characters long!'})
  }

  //hashing
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  //oh so you can mix and match when declaring props
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  logger.info(`Successfully created ${savedUser}`)
  response.json(savedUser.toJSON())
})

module.exports = usersRouter