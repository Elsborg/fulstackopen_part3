const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type:String,
    minLength: 3,
    required: true,
  },
  number: {
    type:String,
    validate: {
      validator: function (value) {
        return /^\d{2,3}-\d{8}/.test(value)
      },
      message: props => `${props.value} is not a valid number`
    },
    required: true,
  }
})

phonebookSchema.plugin(uniqueValidator)

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', phonebookSchema)
