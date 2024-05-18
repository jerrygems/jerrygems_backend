const WriteUpsMod = require("../../models/WriteUpsMod")
const jwt = require("jsonwebtoken")

async function writeupsCreate(req, resp) {
    try {
        const { title, description, content, publicationDate, tags } = req.body
        const decodedToken = jwt.decode(req.headers.authorization)
        console.log(req.body)
        const newWriteup = new WriteUpsMod({
            title,
            description:description,
            content,
            author: decodedToken.userId,
            publicationDate,
            keywords: tags
        })
        await newWriteup.save().catch(err => { console.log(err) })
        console.log("done")
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

// async function writeupDelete(req, resp) {
//     try {
//         const writeup_id = req.params.id
//         const existingwriteup = await writeupsMod.findById(writeup_id)
//         if (!existingwriteup) {
//             return resp.status(500).json({ message: "writeup doesn't exists" })
//         }
//         existingwriteup.remove()
//         return resp.status(200).json({ message: "removed successfully" })
//     } catch (err) {
//         return resp.status(500).json({ message: message.err })
//     }

// }

// get requests here
async function getallWriteups(req, resp) {
    try {
        data = await WriteUpsMod.find().populate("author","-_id name")
        if (!data) {
            return resp.status.json({ message: "writeup not found" })
        }
        resp.status(200).json({ message: data })
    } catch (err) {
        console.log(err)
        resp.status(401).json({ message: err.message })
    }
}

async function getWriteup(req, resp) {
    try {
        const { writeupid } = req.params
        data = await WriteUpsMod.findById(writeupid).populate("author","-_id name")
        if (!data) {
            return resp.status.json({ message: "writeup not found" })
        }
        resp.status(200).json({ message: data })
    } catch (err) {
        console.log(err)
        resp.status(401).json({ message: err.message })
    }
}
module.exports = {
    create: writeupsCreate,
    update: writeupsUpdate,
    // delete: writeupsDelete,
    getallWriteups: getallWriteups,
    getWriteup: getWriteup
}