const supertest = require('supertest')
const app = require('../../app')
const api =  supertest(app)
const {initialBlogs, blogsInDb, titleInDb} = require('../test_helper')
const Blog = require('../../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  
  const newPromisedBlogs = initialBlogs.map(blog => new Blog(blog).save())
  //const promiseArray = newBlogs.map(blog => blog.save())
  await Promise.all(newPromisedBlogs) 
  //Promise.all() doesn't respect order, which can be guaranteed using a for...of loop
})

describe('blogs saved in database should', () => {

  //check GET working?
  test('be returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  //check GET TOTAL
  test('have 2 in total', async () => {
    const response = await blogsInDb()
    expect(response).toHaveLength(initialBlogs.length)
  })

  //check GET CONTENT
  test('one of the blogs should contain the title of', async () => {
    const titles = await titleInDb() 
    expect(titles).toContain('What is Prototypal Inheritance?')
  })

  //check ID
  test('have an id prop', async() => {
    const blogs = await blogsInDb()
    blogs.forEach(({id}) => {
      expect(id).toBeDefined()
    })
  })
})
