const ASBMod = require("../../models/ASBMod")

async function asbCreate(req, resp) {
    try {
        const { chap_no, title, description, content, author, publicationDate, keywords } = req.body
        const newASBChap = new ASBMod({
            chap_no,
            title,
            description,
            content,
            author,
            publicationDate,
            keywords
        })
        console.log(newASBChap)
        await newASBChap.save().catch(err => console.log(err))
        return resp.status(200).json({ message: "chapter created successfully" })
    } catch (err) {
        return resp.status(500).json({ message: "something went wrong " })
    }
}

async function asbUpdate(req, resp) {
    try {
        const { chap_no, title, description, content, author, publicationDate, keywords } = req.body
        const chap_id = req.params.id

        const existingChap = await ASBMod.findById(chap_id)
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
        return resp.status(200).json({ message: "chapter updated successfully" })
    } catch (err) {
        return resp.status(500).json({ message: "something went wrong " })
    }
}


async function asbDelete(req, resp) {
    try {
        const chap_id = req.params.id

        const existingChap = await ASBMod.findById(chap_id)
        if (!existingChap) {
            return resp.status(500).json("document doesn't exist already")
        }
        existingChap.remove()


        return resp.status(200).json({ message: "chapter updated successfully" })
    } catch (err) {
        return resp.status(500).json({ message: "something went wrong " })
    }
}

module.exports = {
    create: asbCreate,
    update: asbUpdate,
    delete: asbDelete,
}