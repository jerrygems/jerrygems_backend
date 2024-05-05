const BlogsMod = require("../../models/BlogsMod")

async function blogsCreate(req, resp) {
    try {
        const { title, description, content, author, publicationDate, tags } = req.body
        const newBlog = new BlogsMod({
            title,
            description,
            content,
            author,
            publicationDate,
            tags
        })
        await newBlog.save().catch(err => { console.log(err) })
        return resp.status(200).json({ message: message.err })
    } catch (err) {
        return resp.status(500).json({ message: message.err })
    }

}
async function blogsUpdate(req, resp) {
    try {
        const { title, description, content, author, publicationDate, tags } = req.body
        const blog_id = req.params.id
        const existingBlog = await BlogsMod.findById(blog_id)
        if (!existingBlog) {
            return resp.status(500).json({ message: "blog doesn't exist" })
        }
        existingBlog.title = title
        existingBlog.description = description
        existingBlog.content = content
        existingBlog.author = author
        existingBlog.publicationDate = publicationDate
        existingBlog.tags = tags

        await existingBlog.save()
        return resp.status(200).json({ message: "saved successfully" })
    } catch (err) {
        return resp.status(500).json({ message: message.err })
    }

}
async function blogsDelete(req, resp) {
    try {
        const blog_id = req.params.id
        const existingBlog = await BlogsMod.findById(blog_id)
        if (!existingBlog) {
            return resp.status(500).json({ message: "blog doesn't exists" })
        }
        existingBlog.remove()
        return resp.status(200).json({ message: "removed successfully" })
    } catch (err) {
        return resp.status(500).json({ message: message.err })
    }

}

module.exports = {
    create: blogsCreate,
    update: blogsUpdate,
    delete: blogsDelete
}