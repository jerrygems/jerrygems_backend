const mongoose = require("mongoose")
const ASBSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    publicationDate: { type: Date, default: Date.now },
    ketwords: [{ type: String }]
})

const ASB = mongoose.model('ASB', ASBSchema)

module.exports = ASB;