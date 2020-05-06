const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//remove deprecated warning
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)


const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  // eslint-disable-next-line no-unused-vars
  .then(_result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (raw, processed) => {
    processed.id = raw._id.toString()
    delete processed._id
    delete processed.__v
  }
})

module.exports = mongoose.model('Person', personSchema)