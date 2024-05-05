const GHBMod = require("../../models/GHBMod")

async function ghbCreate(req, resp) {
    try {
        const { chap_no, title, description, content, author, publicationDate, keywords } = req.body
        const newGHBChap = new GHBMod({
            chap_no,
            title,
            description,
            content,
            author,
            publicationDate,
            keywords
        })
        console.log(newGHBChap)
        await newGHBChap.save().catch(err => console.log(err))
        resp.status(200).json({ message: "chapter created successfully" })
    } catch (err) {
        resp.status(500).json({ message: "something went wrong " })
    }
}

async function ghbUpdate(req, resp) {
    try {
        const { chap_no, title, description, content, author, publicationDate, keywords } = req.body
        const chap_id = req.params.id

        const existingChap = await GHBMod.findById(chap_id)
        if (!existingChap) {
            return resp.status(500).json("document doesn't exist already")
        }


        existingChap.chap_no = chap_no
        existingChap.title = title
        existingChap.description = description
        existingChap.content = content
        existingChap.author = author
        existingChap.publicationDate = publicationDate
        existingChap.keywords = keywords

        await existingChap.save()
        resp.status(200).json({ message: "chapter updated successfully" })
    } catch (err) {
        resp.status(500).json({ message: "something went wrong " })
    }
}


async function ghbDelete(req, resp) {
    try {
        const chap_id = req.params.id

        const existingChap = await ghbMod.findById(chap_id)
        if (!existingChap) {
            return resp.status(500).json("document doesn't exist already")
        }
        existingChap.remove()


        resp.status(200).json({ message: "chapter updated successfully" })
    } catch (err) {
        resp.status(500).json({ message: "something went wrong " })
    }
}

module.exports = {
    create: ghbCreate,
    update: ghbUpdate,
    delete: ghbDelete,
}