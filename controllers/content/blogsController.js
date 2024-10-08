const BlogsMod = require("../../models/BlogsMod")
const Users = require("../../models/UsersMod")
const jwt = require("jsonwebtoken")

async function blogsCreate(req, resp) {
    try {
        const { title, description, content, publicationDate, tags } = req.body
        const decodedToken = jwt.decode(req.headers.authorization)
        console.log(decodedToken)
        const newBlog = new BlogsMod({
            title,
            description,
            content,
            author: decodedToken.userId,
            publicationDate,
            tags: tags.split(" ")
        })
        await newBlog.save().catch(err => { console.log(err) })
        console.log("done")
        return resp.status(200).json({ message: "done" })
    } catch (err) {
        return resp.status(500).json({ message: message.err })
    }

}
async function blogsUpdate(req, resp) {
    try {
        const { blogid, title, description, content, publicationDate, tags } = req.body

        const existingBlog = await BlogsMod.findById(blogid)
        if (!existingBlog) {
            return resp.status(500).json({ message: "blog doesn't exist" })
        }
        existingBlog.title = title
        existingBlog.description = description
        existingBlog.content = content
        existingBlog.publicationDate = publicationDate
        existingBlog.tags = tags

        await existingBlog.save()
        return resp.status(200).json({ message: "saved successfully" })
    } catch (err) {
        return resp.status(500).json({ message: message.err })
    }
}

async function blogsDelete(req, resp) {
    const chap_id = req.query.sid
    try {
        const deletedChap = await BlogsMod.deleteOne({ _id: chap_id });

        if (deletedChap.deletedCount === 0) {
            return resp.status(404).json({ message: "Document not found" });
        }

        resp.status(200).json({ message: "blog deleted successfully" })
    } catch (err) {
        resp.status(500).json({ message: "something went wrong " })
    }
}

// get requests here
async function getallblogs(req, resp) {
    const page = parseInt(req.query.page) || 1;
    const perPage = 9;

    try {
        const totalChaps = await BlogsMod.countDocuments();
        const maxPage = Math.ceil(totalChaps / perPage);
        if (page > maxPage) {
            return resp.status(404).json({ message: 'Invalid page number' });
        }
        const offset = (page - 1) * perPage

        data = await BlogsMod.find().populate("author", "-_id name").skip(offset).limit(perPage)

        if (!data || data.length === 0) {
            return resp.status(401).json({ message: "asb not found" })
        }

        resp.status(200).json({ message: data, maxPage })
    } catch (err) {
        console.log(err)
        resp.status(401).json({ message: err.message })
    }
}

async function getblog(req, resp) {
    try {
        const { blogid } = req.params
        data = await BlogsMod.findById(blogid).populate("author", "-_id name")
        if (!data) {
            return resp.status.json({ message: "blog not found" })
        }

        resp.status(200).json({ message: data })
    } catch (err) {
        console.log(err)
        resp.status(401).json({ message: err.message })
    }
}
module.exports = {
    create: blogsCreate,
    update: blogsUpdate,
    delete: blogsDelete,
    getallblogs: getallblogs,
    getblog: getblog
}