const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.dyfow6f.mongodb.net/?retryWrites=true&w=majority`
  

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)



if (process.argv.length === 3) {
    /* List all people in phone book */
    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
  }
  else if (process.argv.length === 5) {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4]
    })


    person.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook}`)
    mongoose.connection.close()
    })
}