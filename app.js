// Load the dependencies
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Load config
const config = require('./config')
const port = process.env.PORT || 3000

// Express Configuration 
const app = express()

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set up the secret key variable for JWT
app.set('jwt.secret', config.secret)

// Index page for testing 
app.get('/', (req, res) => {
    res.send('Testing JWT')
})

// configure API router
app.use('/api', require('./routes/api'))

// Open server 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// Connect to MongoDB server
mongoose.connect(config.mongodbUri)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
    console.log('connected to mongodb server.')
})