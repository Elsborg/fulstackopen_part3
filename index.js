require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

morgan.token("payload", function (request) {
    return JSON.stringify(request.body)
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :payload"))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
  app.get('/info', (request, response) => {
    const personAmount = persons.length
    const dateTime = new Date()

    response.send(`<p>Phonebook has info for ${personAmount} people </br> <p>${dateTime}</p>`)
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = persons.find(person => person.id === id)
    
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    return Math.floor(Math.random() * 100000000000);
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
 
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name is missing' 
      })
    } 
    else if (!body.number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    } 
    else if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'person already exists'
        })
    }
  
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number || false,
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })


  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  