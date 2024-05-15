const mongoose = require("mongoose")
const ANONSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    publicationDate: { type: Date, default: Date.now },
    keywords: [{ type: String }]
})

const Announcements = mongoose.model('announcements', ANONSchema)

module.exports = Announcements;