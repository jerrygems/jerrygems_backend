const mongoose = require("mongoose")
const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    phone_no: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'] },
    ip_addr: { type: String, required: false },
    browser_info: { type: String, required: false },
    user_os: { type: String, required: false }

})

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users;