const Users = require("../models/UsersMod")
const bcrypt = require("bcrypt")

async function registerController(req, resp) {
    try {
        const { name, email, password, dob, phone_no } = req.body

        if (!name || !email || !password || !dob || !phone_no) {
            return resp.status(401).json({ message: "you're missing some field, will you please provide the complete information" })
        }
        const browser_info = req.headers['user-agent']
        const ip_addr = req.ip || req.connection.remoteAddress
        const userexists = await Users.findOne({ email })
        if (userexists) {
            return resp.status(500).json({ message: "already used email" })
        }
        const hashedPass = await bcrypt.hash(password, 10)
        const newUser = new Users({
            name,
            email,
            password: hashedPass,
            dob,
            phone_no,
            role: "admin",
            ip_addr,
            browser_info,
        })
        await newUser.save().then(savedUser => console.log(savedUser)).catch(err => { console.log(err) });
        console.log("saved")
        return resp.status(201).json({ message: "saved successfully" })
    } catch (err) {
        console.log("error:-) ".err)
        if (err.name == "ValidationError") {
            const errors = Object.values(err.errors).map(err => err.message);
            return resp.status(400).json({ message: 'Validation error', errors })
        }
        return resp.status(500).json({ message: "error occured while registering" })

    }
}

module.exports = registerController