const mongoose = require("mongoose")
const WriteUpsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    publicationDate: { type: Date, default: Date.now },
    tags: [{ type: String }]
})

const WriteUps = mongoose.model('WriteUps', WriteUpsSchema)

module.exports = WriteUps;