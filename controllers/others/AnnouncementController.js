const Announcements = require("../../models/Announcements")
const jwt = require("jsonwebtoken")

async function anonCreate(req, resp) {
    try {
        const { title, description, content, publicationDate, tags } = req.body
        const decodedToken = jwt.decode(req.headers.authorization)
        console.log(decodedToken)
        const newAnon = new Announcements({
            title,
            description,
            content,
            author: decodedToken.userId,
            publicationDate,
            tags
        })
        await newAnon.save().catch(err => { console.log(err) })
        console.log("done")
        return resp.status(200).json({ message: "done" })
    } catch (err) {
        return resp.status(500).json({ message: err.message })
    }

}




async function anonDelete(req, resp) {
    try {
        const chap_id = req.params.id

        const existingChap = await Announcements.findById(chap_id)
        if (!existingChap) {
            return resp.status(500).json("document doesn't exist already")
        }
        existingChap.remove()


        resp.status(200).json({ message: "chapter updated successfully" })
    } catch (err) {
        resp.status(500).json({ message: "something went wrong " })
    }
}


async function getanons(req, resp) {
    try {
        data = await Announcements.find()
        resp.status(200).json({ message: data })
    } catch (err) {
        console.log(err)
        resp.status(401).json({ message: err.message })
    }
}


module.exports = {
    create: anonCreate,
    delete: anonDelete,
    getanons: getanons,
}