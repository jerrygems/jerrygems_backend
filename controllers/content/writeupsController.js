const WriteUpsMod = require("../../models/WriteUpsMod")

async function writeupCreate(req, resp) {
    try {
        const { title, description, content, author, publicationDate, tags } = req.body
        const newWriteUp = new WriteUpsMod({
            title,
            description,
            content,
            author,
            publicationDate,
            tags
        })
        await newWriteUp.save().catch(err => { console.log(err) })
        return resp.status(200).json({ message: message.err })
    } catch (err) {
        return resp.status(500).json({ message: message.err })
    }

}
async function writeupUpdate(req, resp) {
    try {
        const { title, description, content, author, publicationDate, tags } = req.body
        const writeup_id = req.params.id
        const existingWriteup = await WriteUpsMod.findById(writeup_id)
        if (!existingWriteup) {
            return resp.status(500).json({ message: "blog doesn't exist" })
        }
        existingWriteup.title = title
        existingWriteup.description = description
        existingWriteup.content = content
        existingWriteup.author = author
        existingWriteup.publicationDate = publicationDate
        existingWriteup.tags = tags

        await existingWriteup.save()
        return resp.status(200).json({ message: "saved successfully" })
    } catch (err) {
        return resp.status(500).json({ message: message.err })
    }

}
async function writeupDelete(req, resp) {
    try {
        const writeup_id = req.params.id
        const existingWriteup = await WriteUpsMod.findById(writeup_id)
        if (!existingWriteup) {
            return resp.status(500).json({ message: "blog doesn't exists" })
        }
        existingWriteup.remove()
        return resp.status(200).json({ message: "removed successfully" })
    } catch (err) {
        return resp.status(500).json({ message: message.err })
    }

}

module.exports = {
    create: writeupCreate,
    update: writeupUpdate,
    delete: writeupDelete
}