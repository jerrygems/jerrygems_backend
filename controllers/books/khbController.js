const KHBMod = require("../../models/KHBMod")

async function khbCreate(req, resp) {
    try {
        const { chap_no, title, description, content, author, publicationDate, keywords } = req.body
        const newKHBChap = new KHBMod({
            chap_no,
            title,
            description,
            content,
            author,
            publicationDate,
            keywords
        })
        console.log(newKHBChap)
        await newKHBChap.save().catch(err => console.log(err))
        resp.status(200).json({ message: "chapter created successfully" })
    } catch (err) {
        resp.status(500).json({ message: "something went wrong " })
    }
}

async function khbUpdate(req, resp) {
    try {
        const { chap_no, title, description, content, author, publicationDate, keywords } = req.body
        const chap_id = req.params.id

        const existingChap = await KHBMod.findById(chap_id)
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

module.exports = {
    create: khbCreate,
    update: khbUpdate,
    delete: khbDelete,
}