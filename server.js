// imports

const express = require('express')
const journalController = require('./controllers/journalController')
const cors = require('cors')
const port = process.env.PORT || 4000
const app = express()
const rowdy = require('rowdy-logger')
const rowdyResults = rowdy.begin(app)
const db = require('./models')

// middleware 

app.use(cors())
app.use(express.json())

// api routes
app.use('/api/journal', journalController)
// listen

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    rowdyResults.print()
})