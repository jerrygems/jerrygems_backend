const KHBMod = require("../../models/KHBMod")
const jwt = require("jsonwebtoken")

async function khbCreate(req, resp) {
    try {
        const { chap_no, title, description, content, publicationDate, tags } = req.body
        const decodedToken = jwt.decode(req.headers.authorization)
        console.log(decodedToken)
        const newChap = new KHBMod({
            chap_no: chap_no,
            title,
            description,
            content,
            author: decodedToken.userId,
            publicationDate,
            tags
        })
        await newChap.save().catch(err => { console.log(err) })
        console.log("done")
        return resp.status(200).json({ message: "done" })
    } catch (err) {
        return resp.status(500).json({ message: err.message })
    }

}

async function khbUpdate(req, resp) {
    try {
        const { khbid, chap_no, title, description, content, publicationDate, keywords } = req.body

        const existingChap = await KHBMod.findById(khbid)
        console.log(khbid)
        if (!existingChap) {
            return resp.status(500).json("document doesn't exist already")
        }


        existingChap.chap_no = chap_no
        existingChap.title = title
        existingChap.description = description
        existingChap.content = content
        existingChap.publicationDate = publicationDate
        existingChap.keywords = keywords

        await existingChap.save()
        resp.status(200).json({ message: "chapter updated successfully" })
    } catch (err) {
        resp.status(500).json({ message: "something went wrong ",err })
    }
}


async function khbDelete(req, resp) {
    try {
        const chap_id = req.params.id

        const existingChap = await KHBMod.findById(chap_id)
        if (!existingChap) {
            return resp.status(500).json("document doesn't exist already")
        }
        existingChap.remove()


        resp.status(200).json({ message: "chapter updated successfully" })
    } catch (err) {
        resp.status(500).json({ message: "something went wrong " })
    }
}

async function getkhbChap(req, resp) {
    try {
        const { khbid } = req.params
        data = await KHBMod.findById(khbid)
        if (!data) {
            return resp.status.json({ message: "writeup not found" })
        }
        resp.status(200).json({ message: data })
    } catch (err) {
        console.log(err)
        resp.status(401).json({ message: err.message })
    }
}

async function getkhbChaps(req, resp) {
    try {
        data = await KHBMod.find()
        resp.status(200).json({ message: data })
    } catch (err) {
        console.log(err)
        resp.status(401).json({ message: err.message })
    }
}


module.exports = {
    create: khbCreate,
    update: khbUpdate,
    delete: khbDelete,
    getkhbchaps: getkhbChaps,
    getkhbchap: getkhbChap
}