require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person');

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("build"))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
const PORT = process.env.PORT || 3001
app.get("/", (request, response) => {
    response.send(`Is running successful on ${PORT}`)
})
app.get("/info", (request, response) => {
    Person.find({}).then(persons => {
        response.send(`PhoneBook has info for ${persons.length} people <br> ${(new Date())}`)
    })
})
app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})
app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    // const person = persons.find(person => person.id == Number(id));
    Person.findById(id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})
app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "must have name and number"
        })
    }
    const id = request.params.id;
    // const person = persons.find(person => person.id == Number(id));
    Person.findByIdAndUpdate(id, {
        name: body.name,
        number: body.number,
    }, { new: true }).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})
app.post("/api/persons", (request, response, next) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "must have name and number"
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => next(error))
})
app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(error => next(error))
})
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
app.use(require('./models/errorHandler'))