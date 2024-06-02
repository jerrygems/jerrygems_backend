const Events = require("../../models/Events")
const jwt = require("jsonwebtoken")

async function eventCreate(req, resp) {
    try {
        const { title, description, content, publicationDate, tags } = req.body
        const decodedToken = jwt.decode(req.headers.authorization)
        console.log(decodedToken)

        const newEvent = new Events({
            title,
            description,
            content,
            author: decodedToken.userId,
            publicationDate,
            tags:tags.split(" ")
        })
        await newEvent.save().catch(err => { console.log(err) })
        console.log("done")
        return resp.status(200).json({ message: "done" })
    } catch (err) {
        return resp.status(500).json({ message: err.message })
    }

}




async function eventDelete(req, resp) {
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


async function getEvents(req, resp) {
    try {
        data = await Events.find().populate("author", "-_id name")
        resp.status(200).json({ message: data })
    } catch (err) {
        console.log(err)
        resp.status(401).json({ message: err.message })
    }
}


module.exports = {
    create: eventCreate,
    delete: eventDelete,
    getevents: getEvents,
}