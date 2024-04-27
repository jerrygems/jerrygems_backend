const Users = require("../models/UsersMod")
require('dotenv').config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function loginController(req, resp) {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ email })
        if (!user) {
            return resp.status(500).json({ message: "user not found please check your email" })
        }
        const validatePass = await bcrypt.compare(password, user.password)
        if (!validatePass) {
            return resp.status(500).json({ message: "sometimes i also forget my passwords Xd." })
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '4h' })
        return resp.status(201).json({ message: "successfully logged in here is your token " })
    } catch (err) {
        console.log(err)
        return resp.status(500).json({ message: "error occured while logging in" })
    }
}

module.exports = loginController