require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const app = express()

// here are my route modules for import
const LoginOrRegister = require("./routes/LoginOrRegister")
const Books = require("./routes/Books")


// mongo connection
mongoose.connect(process.env.DB_URL,
    {
        autoCreate: true,
    }).then(() => { console.log("mongoose connected") })
    .catch((err) => console.log(err))

// middlewares
app.use(express.json({ limit: "10mb" }))
app.use(cors());

// routes
app.use('/auth', LoginOrRegister) // goes to login or register route
app.use('/books', Books) // goes to books route


app.listen(process.env.PORT || 5001, () => { console.log('server running') })



