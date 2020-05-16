const bcrypt = require('bcrypt')
const User = require('../../models/user')
const helper =  require('../test_helper')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)

describe ('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    //only username and password is required
    const user = new User({username: 'root', passwordHash})
    await user.save()
  })

  test('a new user can be created with a new username', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'amaterrapper',
      name: 'Thang Pham',
      password: 'thangbapham'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length+1)
    
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('a new user with an already used username cannot be added', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Thang Pham',
      password: 'thangbapham'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)
    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('a username less than 3 characters long is not added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Thang Pham',
      password: 'thangbapham'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)
    expect(result.body.error).toContain('username must be at least 3 characters long!')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('a new user with password less than 3 chars is not added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'amaterrapper',
      name: 'Thang Pham',
      password: '77'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)
    expect(result.body.error).toContain('password must be at least 3 characters long!')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => mongoose.connection.close())