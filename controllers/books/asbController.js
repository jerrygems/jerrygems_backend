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
        await newASBChap.save()
        resp.status(200).json({message:"chapter created successfully"})
    } catch (err) {
        resp.status(500).json({ message: "something went wrong " })
    }
}

module.exports = {
    create: asbCreate
}