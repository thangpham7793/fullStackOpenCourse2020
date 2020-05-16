const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api =  supertest(app)

const initialBlogs = [
  {
      "title": "Metaphor meets Closure",
      "author": "Thang Pham",
      "url": "link to gatsby blogpost",
      "likes": 20,
  },
  {
      "title": "What is Prototypal Inheritance?",
      "author": "Tom",
      "url": "some link",
      "likes": 34,
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const titleInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(({title}) => title)
}

const blogWithNo = arrOfRequiredField => {
  const validBlog = {
    "title": "Try/Catch is simple but effective",
    "author": "Thang Pham",
    "url": "link to post",
    "likes": 30,
  }
  
  const arrOfInvalidBlogs = arrOfRequiredField.map(field => {
      let invalidBlog = {...validBlog}
      delete invalidBlog[field]
      return invalidBlog
    }
  )
  return arrOfInvalidBlogs
}

const usersInDb = async () => {
  users = await User.find({})
  return users.map(user => user.toJSON())
}

const getUserInfo = async () => {
  let token, userId
  const newUser = {
    username: 'amaterrapper',
    name: 'Thang Pham',
    password: 'thangbapham'
  }

  const returnedUser = await api
    .post('/api/users')
    .send(newUser)
  
  const result = await api
    .post('/api/login')
    .send({
      username: 'amaterrapper',
      password: 'thangbapham'
    })
  
  token = result.body.token
  userId = returnedUser.body.id
  return {token, userId}
}

module.exports = {
  initialBlogs, 
  blogsInDb,
  titleInDb,
  blogWithNo,
  usersInDb,
  getUserInfo
}