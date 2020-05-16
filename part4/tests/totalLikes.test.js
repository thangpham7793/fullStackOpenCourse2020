const {totalLikes} = require('../utils/list_helper')

describe('the total likes of', () => {
  test('a list of zero blog should be 0', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('a list of one blog should be the total likes of that blog', () => {
    
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    expect(totalLikes(listWithOneBlog)).toBe(5)
  })

  test('a list of many blogs should return the total likes of ALL blogs', () => {
    
    const listWithManyBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },

      {
        _id: "5eb5da446c25e6298c00ca53",
        title: "Metaphor meets Closure",
        author: "Thang Pham",
        url: "link to gatsby blogpost",
        likes: 20,
        __v: 0
      }
    ]

    expect(totalLikes(listWithManyBlogs)).toBe(25)
  })
})