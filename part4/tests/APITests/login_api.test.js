const bcrypt = require('bcrypt')
const User = require('../../models/user')
const helper =  require('../test_helper')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)


describe('when a user logs in, ...', () => {

  beforeEach(async () => {
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('secret', 10)
    //only username and password is required
    const user = new User({username: 'root', passwordHash})
    await user.save()
  })

  test('a token is returned if valid password and username are received', async() => {

    const result = await api
      .post('/api/login')
      .send({
        username: 'root',
        password: 'secret',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.token).toBeDefined()
  })

  test('401 is returned for an invalid username or password', async() => {

    const badCredentials = [{
        username: 'roo',
        password: 'secret',
      }, 
      {
        username: 'root',
        password: 'secre',
      }
    ]

    const promiseArray = badCredentials.map(async (b) => {
      const result = await api
        .post('/api/login')
        .send(b)
        .expect(401)
        .expect('Content-Type', /application\/json/)
      
      expect(result.body.error).toContain('invalid username or password')
    })
    
    Promise.all(promiseArray)
  })
})

afterAll(() => mongoose.connection.close())