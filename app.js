const express = require('express');
const cors = require('cors')
const multer = require('multer')
const upload = multer()

require('dotenv').config()

app = express()
app.use(cors())
app.use(express.json())
app.use(upload.array('file'))
app.use(express.static('public'))

port = process.env.SERVER_PORT || 5000

const users = require('./routes/users')
const todos = require('./routes/todos')

app.use('/users', users)
app.use('/todos', todos)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = app