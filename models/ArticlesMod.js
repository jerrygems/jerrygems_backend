const mongoose = require("mongoose")
const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    publicationDate: { type: Date, default: Date.now },
    tags: [{ type: String }]
})

const Articles = mongoose.model('Article', ArticleSchema)

module.exports = Articles;