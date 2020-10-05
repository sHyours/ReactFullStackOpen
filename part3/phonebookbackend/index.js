const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
morgan.token('body',(req)=>JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
const PORT = 3001
let persons = [
    {
        "name": "arto hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "ada lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "dan abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "mary poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
]
app.get("/", (request, response) => {
    response.send(`Is running successful on ${PORT}`)
})
app.get("/info", (request, response) => {
    response.send(`PhoneBook has info for ${persons.length} people <br> ${(new Date())}`)
})
app.get("/api/persons", (request, response) => {
    response.json(persons)
})
app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id == Number(id));
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
app.post("/api/persons", (request, response) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "must have name and number"
        })
    }
    if (persons.find(p => p.name === body.name || p.number === body.number)) {
        return response.status(400).json({
            error: "name or number must be unique"
        })
    }
    persons = persons.concat({
        name: body.name,
        number: body.number,
        id: Math.random() * 10000 | 0
    })
    response.status(204).end()
})
app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    persons = persons.filter(p => p.id !== Number(id))
    response.status(204).end()
})
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})