require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const app = express()

// here are my route modules for import
const LoginOrRegister = require("./routes/LoginOrRegister")
const Books = require("./routes/Books")
const Blogs = require("./routes/Blogs")
const UsersInf = require("./routes/Users")
const WriteUps =  require("./routes/WriteUps")


// mongo connection
mongoose.connect(process.env.DB_URL,
    {
        autoCreate: true,
    }).then(() => { console.log("mongoose connected") })
    .catch((err) => console.log(err))

// middlewares
app.use(express.json({ limit: "10mb" }))
app.use(cors());
app.use(cookieParser())

// routes
app.use('/auth', LoginOrRegister) // goes to login or register route
app.use('/books', Books) // goes to books route
app.use('/blogs', Blogs) // goes to blogs route
app.use('/users', UsersInf) // goes to blogs route
app.use('/writeups', WriteUps) // goes to blogs route


app.listen(process.env.PORT || 5001, () => { console.log('server running') })



