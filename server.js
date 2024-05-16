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
const Blogs = require("./routes/Blogs")
const UsersInf = require("./routes/Users")
const WriteUps =  require("./routes/WriteUps")
const KHB =  require("./routes/KHB")
const GHB =  require("./routes/GHB")
const ASB =  require("./routes/ASB")
const Announcements = require("./routes/Announcements")
const Events = require("./routes/Events")

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
app.use('/blogs', Blogs) // goes to blogs route
app.use('/users', UsersInf) // goes to users route
app.use('/writeups', WriteUps) // goes to writeups route
app.use('/khb', KHB)
app.use('/ghb', GHB)
app.use('/asb', ASB)
app.use('/announcements', Announcements)
app.use('/events', Events)

app.listen(process.env.PORT || 5001, () => { console.log('server running') })



