require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
// here are my route modules for import
const Auth= require('./routes/Auth')

const app = express()

// mongo connection
mongoose.connect(process.env.DB_URL,
    {
        autoCreate: true
    }).then(() => { console.log("mongoose connected") }).catch((err) => console.log(err))

// middlewares
app.use(express.json({ limit: "10mb" }))
app.use(cors());

// routes
app.use('/api/auth', Auth)


app.listen(process.env.PORT || 5001, () => { console.log('server running') })



