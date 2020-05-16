//logging needs its own router

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async(request, response) => {
  const body = request.body
  
  const user = await User.findOne({ username: body.username})
  //2 steps check: username and then password
  const passwordCorect = user === null
    ? false //wrong username, so not found
    : await bcrypt.compare(body.password, user.passwordHash) //correct username, checking pw

  //if both conditions are not met
  if (!(user && passwordCorect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  //the identity of the logged in user
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  //attach a token to the logged in user
  const token = jwt.sign(userForToken, process.env.SECRET)
  
  //return the userForToken and Token to the browser
  response
    .status(200)
    .send({ token, username: user.username, name: user.name})
  
})

module.exports = loginRouter