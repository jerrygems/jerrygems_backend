const ASBMod = require("../../models/ASBMod")
const jwt = require("jsonwebtoken")

async function asbCreate(req, resp) {
    try {
        const { chap_no, title, description, content, publicationDate, tags } = req.body
        const decodedToken = jwt.decode(req.headers.authorization)
        console.log(decodedToken)
        const newChap = new ASBMod({
            chap_no: chap_no,
            title,
            description,
            content,
            author: decodedToken.userId,
            publicationDate,
            tags: tags.split(" ")
        })
        await newChap.save().catch(err => { console.log(err) })
        console.log("done")
        return resp.status(200).json({ message: "done" })
    } catch (err) {
        return resp.status(500).json({ message: err.message })
    }

}

async function asbUpdate(req, resp) {
    try {
        const { asbid, chap_no, title, description, content, publicationDate, keywords } = req.body

        const existingChap = await ASBMod.findById(asbid)
        console.log(asbid)
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
        resp.status(500).json({ message: "something went wrong ", err })
    }
}


async function asbDelete(req, resp) {
    const chap_id = req.query.sid

    try {

        const deletedChap = await ASBMod.deleteOne({ _id: chap_id });

        if (deletedChap.deletedCount === 0) {
            return resp.status(404).json({ message: "Document not found" });
        }

        resp.status(200).json({ message: "chapter deleted successfully" })
    } catch (err) {
        resp.status(500).json({ message: "something went wrong " })
    }
}

async function getasbChap(req, resp) {
    try {
        const { asbid } = req.params
        data = await ASBMod.findById(asbid).populate("author", "-_id name")
        if (!data) {
            return resp.status(401).json({ message: "asb not found" })
        }
        resp.status(200).json({ message: data })
    } catch (err) {
        console.log(err)
        resp.status(401).json({ message: err.message })
    }
}

async function getasbChaps(req, resp) {
    const page = parseInt(req.query.page) || 1;
    console.log(page)
    const perPage = 9;
    try {

        const totalChaps = await ASBMod.countDocuments();
        const maxPage = Math.ceil(totalChaps / perPage);
        if (page > maxPage) {
            return resp.status(404).json({ message: 'Invalid page number' });
        }
        const offset = (page - 1) * perPage

        data = await ASBMod.find().populate("author", "-_id name").skip(offset).limit(perPage)

        if (!data || data.length === 0) {
            return resp.status(401).json({ message: "asb not found" })
        }

        resp.status(200).json({ message: data, maxPage })
    } catch (err) {
        console.log(err)
        resp.status(401).json({ message: err.message })
    }
}


module.exports = {
    create: asbCreate,
    update: asbUpdate,
    delete: asbDelete,
    getasbchaps: getasbChaps,
    getasbchap: getasbChap
}