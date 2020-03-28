require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const apiHandler = require('./routes/index')

app.use(bodyParser.json())

app.use('/api/v1', apiHandler)

app.listen(process.env.PORT || 3001, () => {
    console.log('server started')    
})