const mongoose = require("mongoose")
const BlogsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    // author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    // publicationDate: { type: Date, default: Date.now },
    tags: [{ type: String }]
})

const Blogs = mongoose.model('Blogs', BlogsSchema)

module.exports = Blogs;