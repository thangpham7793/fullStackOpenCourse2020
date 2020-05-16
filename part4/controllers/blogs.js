const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
require('express-async-errors') //place it here because the routes use it




//get ALl
blogsRouter.get('/', async (req, res) => {
  logger.info('GET request received, processing ...')
  const blogs = await Blog.find({})
                          .populate('user', {name: 1, username: 1})
  res.json(blogs.map(blog => blog.toJSON()))
})

//post ONE 
blogsRouter.post('/', async (request, response) => {
  logger.info('POST request received, processing...')

  //security gate-checking using token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  //find user based on decoded id and proceed as usual
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({...request.body, user: user._id})
  const returnedBlog = await blog.save()
  
  //add the id of the new blog to the users' list of blog ids
  user.blogs = user.blogs.concat(returnedBlog._id)
  await user.save()

  logger.info('POST operation successful', returnedBlog, 'is saved to', user)
  response.status(201).json(returnedBlog.toJSON())
})

//get ONE (doesn't return an error if the requested note doesn't exist so needs to be defined within the route handler)
//delete ONE
blogsRouter.delete('/:id', async (request, response) => {
  logger.info('DELETE request received, processing...')

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  logger.info(`Successfully deleted blog id ${request.params.id}`)
  response.status(204).end()
})

//put ONE
blogsRouter.put('/:id', async (request, response) => {
  logger.info('PUT request received, processing...')
  const blog = {
    likes: request.body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  logger.info(`Successfully updated blog ${updatedBlog}`)
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter