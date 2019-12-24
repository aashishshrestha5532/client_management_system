const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 3001
const db = require('./db')
const clientRouter=require('./routes/client-route')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', clientRouter)
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))