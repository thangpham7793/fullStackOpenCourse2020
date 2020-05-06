const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = 
`mongodb+srv://tom77:${password}@fullstack2020-yydnr.mongodb.net/phonebook?retryWrites=true&w=majority`

//open a connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

//configure an entry

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

//create an instance of the person entity
const Person = mongoose.model('Person', personSchema)

//using process.argv (args) as input variable
const person = new Person({
    name: process.argv[4],
    number: process.argv[5],
})

//add one method
const addPerson = () => {
    return person.save().then(response => {
            console.log(`added ${person.name} number ${person.number} to phonebook`)
            mongoose.connection.close()
})}

const modifyNumber = () => {
    return person.save().then(response => {

    })
}

//get all function (excluding ID)
const getAll = () => {
    
    return Person.find({}).then(result => {
        console.log("getAll -> result", result)
            console.log('Phonebook\n')
            result.forEach(({name, number}) =>
                console.log(`${name} ${number}`)
            )

            mongoose.connection.close()
    })
}

// protocol for getAll
if (process.argv[3] === "getAll") {
    getAll()
}

//

if (process.argv[3] === "add") {
    addPerson()
}


