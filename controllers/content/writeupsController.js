const WriteUpsMod = require("../../models/WriteUpsMod")
const jwt = require("jsonwebtoken")

async function writeupsCreate(req, resp) {
    try {
        const { title, description, content, publicationDate, tags } = req.body
        const decodedToken = jwt.decode(req.headers.authorization)
        console.log(req.body)
        const newWriteup = new WriteUpsMod({
            title,
            description: description,
            content,
            author: decodedToken.userId,
            publicationDate,
            keywords: tags.split(" ")
        })
        await newWriteup.save().catch(err => { console.log(err) })
        return resp.status(200).json({ message: "done" })
    } catch (err) {
        return resp.status(500).json({ message: message.err })
    }

}
async function writeupsUpdate(req, resp) {
    try {
        const { writeupid, title, description, content, publicationDate, tags } = req.body

        const existingWriteup = await WriteUpsMod.findById(writeupid)
        if (!existingWriteup) {
            return resp.status(500).json({ message: "writeup doesn't exist" })
        }
        existingWriteup.title = title
        existingWriteup.description = description
        existingWriteup.content = content
        existingWriteup.publicationDate = publicationDate
        existingWriteup.tags = tags

        await existingWriteup.save()
        return resp.status(200).json({ message: "saved successfully" })
    } catch (err) {
        return resp.status(500).json({ message: message.err })
    }
}

async function writeupsDelete(req, resp) {
    const chap_id = req.query.sid
    try {
        const deletedWriteup = await WriteUpsMod.deleteOne({ _id: chap_id });

        if (deletedWriteup.deletedCount === 0) {
            return resp.status(404).json({ message: "Document not found" });
        }

        resp.status(200).json({ message: "blog deleted successfully" })
    } catch (err) {
        resp.status(500).json({ message: "something went wrong " })
    }
}

// get requests here
async function getallWriteups(req, resp) {
    const page = parseInt(req.query.page) || 1;
    const perPage = 9;

    try {
        const totalChaps = await WriteUpsMod.countDocuments();
        const maxPage = Math.ceil(totalChaps / perPage);
        if (page > maxPage) {
            return resp.status(404).json({ message: 'Invalid page number' });
        }
        const offset = (page - 1) * perPage

        data = await WriteUpsMod.find().populate("author", "-_id name").skip(offset).limit(perPage)

        if (!data || data.length === 0) {
            return resp.status(401).json({ message: "asb not found" })
        }

        resp.status(200).json({ message: data, maxPage })
    } catch (err) {
        resp.status(401).json({ message: err.message })
    }
}

async function getWriteup(req, resp) {
    try {
        const { writeupid } = req.params
        data = await WriteUpsMod.findById(writeupid).populate("author", "-_id name")
        if (!data) {
            return resp.status.json({ message: "writeup not found" })
        }
        resp.status(200).json({ message: data })
    } catch (err) {
        resp.status(401).json({ message: err.message })
    }
}
module.exports = {
    create: writeupsCreate,
    update: writeupsUpdate,
    delete: writeupsDelete,
    getallWriteups: getallWriteups,
    getWriteup: getWriteup
}