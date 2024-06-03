const mongoose = require("mongoose")
const GHBSchema = new mongoose.Schema({
    title: { type: String, required: true },
    chap_no: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    publicationDate: { type: Date, default: Date.now },
    keywords: [{ type: String }]
})

const GHB = mongoose.model('GameHackingBook', GHBSchema)

module.exports = GHB;