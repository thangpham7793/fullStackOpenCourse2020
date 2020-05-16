const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const api =  supertest(app)
const Blog = require('../../models/blog')
const User = require('../../models/user')
const {initialBlogs, blogsInDb, blogWithNo, getUserInfo} = require('../test_helper')

let token, userId
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const newPromisedBlogs = initialBlogs.map(blog => new Blog(blog).save())
  //const promiseArray = newBlogs.map(blog => blog.save())
  await Promise.all(newPromisedBlogs) 

  //Promise.all() doesn't respect order, which can be guaranteed using a for...of loop
  const userInfo = await getUserInfo()
  token = userInfo.token
  userId = userInfo.userId
})

describe('When a blog is posted,', () => {
  test('if valid it is added and appears in GET response', async () => {
    const newBlog = {
      "title": "Understand the new keyword in JS",
      "author": "Tom Pham",
      "url": "link to post",
      "likes": 17,
    }
    
    //confirm that a json object is returned
    const newBlogResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/) 
  
    const response = await blogsInDb() 
    expect(response).toHaveLength(initialBlogs.length + 1)
    const newlyAdded = JSON.parse(newBlogResponse.text)
    delete newlyAdded.id
    expect(newlyAdded).toEqual({...newBlog, user: userId})
  })

  //check POST validation (so there's no need to check 2, since 1 is enough to invalidate!)
  test('blog with one missing required field is not added', async () => {
    const invalidBlogs = blogWithNo(['title', 'author', 'title'])
    const promiseArray = invalidBlogs
      .map(async (invalidBlog) => {
          await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidBlog)
            .expect(400)

          const response = await blogsInDb()
          expect(response).toHaveLength(initialBlogs.length)
        }
      )

  await Promise.all(promiseArray)
  })

  //default values are added when not supplied
  test('blog with no likes should default to 0 likes', async() => {
    const newBlog = {
      "title": "Try/Catch is simple but effective",
      "author": "Th Pham",
      "url": "link to post",
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await (await blogsInDb()).pop() //nested await 
    expect(response.likes).toBeDefined()
    expect(response.likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})