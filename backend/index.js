const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// enable env vars earlier
require('dotenv').config()

const resumeRoutes = require('./routes/resume.js')
const reviewRoutes = require('./routes/review.js')

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/resume', resumeRoutes)
app.use('/resume/:id/review', reviewRoutes)

// connecting to MongoDB Atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri)

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Successfully connected to MongoDB")
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
