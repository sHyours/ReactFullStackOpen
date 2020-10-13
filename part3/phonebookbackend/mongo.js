const mongoose = require('mongoose')
if (process.argv.length < 3) {
    console.log('Please provide the as argument : node mongo.js <password>');
    return
}
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const uri = `mongodb+srv://Akyoshi:${password}@fullstack.obviy.gcp.mongodb.net/PhoneBook?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)
if (process.argv.length < 5) {
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name,
        number,
    })
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}