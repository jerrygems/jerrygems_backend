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
            keywords: tags.split(" ")
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
        resp.status(500).json({ message: "something went wrong ", err })
    }
}


async function khbDelete(req, resp) {
    const chap_id = req.query.sid

    try {

        const deletedChap = await KHBMod.deleteOne({ _id: chap_id });

        if (deletedChap.deletedCount === 0) {
            return resp.status(404).json({ message: "Document not found" });
        }

        resp.status(200).json({ message: "chapter updated successfully" })
    } catch (err) {
        resp.status(500).json({ message: "something went wrong " })
    }
}

async function getkhbChap(req, resp) {
    try {
        const { khbid } = req.params
        data = await KHBMod.findById(khbid).populate("author", "-_id name")
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
    const page = parseInt(req.query.page) || 1;
    const perPage = 9;
    try {

        const totalChaps = await KHBMod.countDocuments();
        const maxPage = Math.ceil(totalChaps / perPage);
        if (page > maxPage) {
            return resp.status(404).json({ message: 'Invalid page number' });
        }
        const offset = (page - 1) * perPage

        data = await KHBMod.find().populate("author", "-_id name").skip(offset).limit(perPage)

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
    create: khbCreate,
    update: khbUpdate,
    delete: khbDelete,
    getkhbchaps: getkhbChaps,
    getkhbchap: getkhbChap
}