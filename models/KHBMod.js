const mongoose = require("mongoose")
const KHBSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    publicationDate: { type: Date, default: Date.now },
    ketwords: [{ type: String }]
})

const KHB = mongoose.model('KernelHackingBook', KHBSchema)

module.exports = KHB;