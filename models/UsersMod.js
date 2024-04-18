const mongoose = require("mongoose")
const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    phone_no: { type: String, required: true },
    ip_addr: { type: String, required: true },
    browser_info: { type: String, required: true },
    user_os: { type: String, required: true }

})

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users;