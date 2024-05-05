const Users = require("../models/UsersMod")
require('dotenv').config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


async function loginController(req, resp) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return resp.status(401).json("please provide details")
        } else {
            const user = await Users.findOne({ email })
            if (!user) {
                return resp.status(500).json({ message: "invalid credential!" })
            }
            const validatePass = await bcrypt.compare(password, user.password)
            if (!validatePass) {
                return resp.status(500).json({ message: "invalid credential!" })
            }
            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '4h' })
            return resp.status(201).json({ message: "successfully logged in here is your token ", token })
        }
    } catch (err) {
        console.log(err)
        resp.status(500).json({ message: "error occured while logging in" })
    }
}

module.exports = loginController