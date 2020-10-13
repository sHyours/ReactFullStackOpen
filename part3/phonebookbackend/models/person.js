require("dotenv").config()
const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(
    result => {
        console.log('connected to MongoDB');
    }
).catch(
    result => {
        console.log('error connecting to MongoDB', result.message);
    }
)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
personSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})
module.exports = mongoose.model('Person', personSchema)