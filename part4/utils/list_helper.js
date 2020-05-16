const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  return blogs
    .reduce((totalLikes, blog) => {
      return blog.likes + totalLikes
    }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  if (blogs.length === 1) return blogs[0]

  const highestLikes = (likesArray) => {
    return Math.max(null, ...likesArray)
  }
  const likesArray = blogs.map(({likes}) => likes)

  const reducer = (result, {title, author, likes}) => {
    const trimmedBlogs = {
      title,
      author,
      likes
    }
    result.push(trimmedBlogs)
    return result
  }
  
  return blogs.filter(blog => blog.likes === highestLikes(likesArray))
              .reduce(reducer, [])
}

const mostBlogs = (blogs) => {
  
  if (blogs.length === 0) return null
  
  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1
    }
  }
  const hashTable = {}
  const arrOfAuthorNames = blogs.forEach(({author}) => {
    return hashTable[author] 
          ? hashTable[author]++
          : hashTable[author] = 1
  })
  const highestBlogPosts = Math.max(null, ...Object.values(hashTable))
  const mostProductiveAuthors = Object.keys(hashTable)
                                      .filter(key => hashTable[key] === highestBlogPosts)
                                                             
  const result = mostProductiveAuthors.map(authorName => {
    return {author: authorName, blogs: highestBlogPosts}
  })
    
  return result
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  
  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  }

  const highestLikes = Math.max(null, ...blogs.map(({likes}) => likes))
  const result = blogs.filter(({likes}) => likes === highestLikes)
                      .map(({author, likes}) => {
                        return {author, likes}
                      })
  return result
}

module.exports = {  
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}