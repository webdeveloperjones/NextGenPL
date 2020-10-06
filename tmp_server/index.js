const express = require('express')
const app = express()
require('express-async-errors')
const dailyRouter = require('./controllers/daily')
const cors = require('cors')
const mongoose = require('mongoose')
// const config = require('./utils/config')

const morgan = require('morgan')
app.use(express.static('build'))


const mongoUrl = process.env.MONGO_URI
console.log('connecting to: ', mongoUrl)
mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error.message)
    })


app.use(express.json())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        req.method === 'POST' ? JSON.stringify(req.body) : ''
    ].join(' ')
}))
app.use(cors())



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use('/api/daily', dailyRouter)


app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'SyntaxError') {
        return response.status(400).send({ error: 'malformed request' })
    }


    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})