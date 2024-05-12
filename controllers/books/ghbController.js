const GHBMod = require("../../models/GHBMod")
const jwt = require("jsonwebtoken")

async function ghbCreate(req, resp) {
    try {
        const { chap_no, title, description, content, publicationDate, tags } = req.body
        const decodedToken = jwt.decode(req.headers.authorization)
        console.log(decodedToken)
        const newChap = new GHBMod({
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

async function ghbUpdate(req, resp) {
    try {
        const { ghbid, chap_no, title, description, content, publicationDate, keywords } = req.body

        const existingChap = await GHBMod.findById(ghbid)
        console.log(ghbid)
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


async function ghbDelete(req, resp) {
    try {
        const chap_id = req.params.id

        const existingChap = await GHBMod.findById(chap_id)
        if (!existingChap) {
            return resp.status(500).json("document doesn't exist already")
        }
        existingChap.remove()


        resp.status(200).json({ message: "chapter updated successfully" })
    } catch (err) {
        resp.status(500).json({ message: "something went wrong " })
    }
}

async function getghbChap(req, resp) {
    try {
        const { ghbid } = req.params
        data = await GHBMod.findById(ghbid)
        if (!data) {
            return resp.status.json({ message: "writeup not found" })
        }
        resp.status(200).json({ message: data })
    } catch (err) {
        console.log(err)
        resp.status(401).json({ message: err.message })
    }
}

async function getghbChaps(req, resp) {
    try {
        data = await GHBMod.find()
        resp.status(200).json({ message: data })
    } catch (err) {
        console.log(err)
        resp.status(401).json({ message: err.message })
    }
}


module.exports = {
    create: ghbCreate,
    update: ghbUpdate,
    delete: ghbDelete,
    getghbchaps: getghbChaps,
    getghbchap: getghbChap
}