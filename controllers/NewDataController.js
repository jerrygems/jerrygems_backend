const GHB = require("../models/GHBMod")
const KHB = require("../models/KHBMod")
const ASB = require("../models/ASBMod")
const Blogs = require("../models/BlogsMod")
const Writeups = require("../models/WriteUpsMod")

async function latest(req, resp) {
    try {

        d1 = await GHB.find().populate("author", "-_id name").sort({ createdAt: -1 }).limit(7).exec()
        tagd1 = d1.map(doc => ({ ...doc.toObject(), source: 'ghb' }));

        d2 = await KHB.find().populate("author", "-_id name").sort({ createdAt: -1 }).limit(7).exec()
        tagd2 = d2.map(doc => ({ ...doc.toObject(), source: 'khb' }));

        d3 = await ASB.find().populate("author", "-_id name").sort({ createdAt: -1 }).limit(7).exec()
        tagd3 = d3.map(doc => ({ ...doc.toObject(), source: 'asb' }));

        d4 = await Blogs.find().populate("author", "-_id name").sort({ createdAt: -1 }).limit(7).exec()
        tagd4 = d4.map(doc => ({ ...doc.toObject(), source: 'blogs' }));

        d5 = await Writeups.find().populate("author", "-_id name").sort({ createdAt: -1 }).limit(7).exec()
        tagd5 = d5.map(doc => ({ ...doc.toObject(), source: 'writeups' }));

        const data = [...tagd1, ...tagd2, ...tagd3, ...tagd4, ...tagd5].sort((a, b) => b.publicationDate - a.publicationDate).slice(0, 7)
        resp.status(200).json({ message: data })
    } catch (err) {
        console.log(err)
        resp.status(401).json({ message: err.message })
    }
}




async function getLatestSearch(req, resp) {
    try {
        let query = req.query.key;
        query = query.trim();
        query = query.replace(/\s+/g, ' ');
        query = query.replace(/[^\w\s]/gi, '');

        const regexQuery = new RegExp(query, 'i');
        const rest1 = await ASB.find({
            $or: [
                { chap_no: { $regex: regexQuery } },
                { title: { $regex: regexQuery } },
                { description: { $regex: regexQuery } },
                { content: { $regex: regexQuery } },
                { keywords: { $regex: regexQuery } }
            ]
        });

        const rest2 = await GHB.find({
            $or: [
                { chap_no: { $regex: regexQuery } },
                { description: { $regex: regexQuery } },
                { content: { $regex: regexQuery } },
                { keywords: { $regex: regexQuery } }
            ]
        });

        const rest3 = await KHB.find({
            $or: [
                { chap_no: { $regex: regexQuery } },
                { description: { $regex: regexQuery } },
                { content: { $regex: regexQuery } },
                { keywords: { $regex: regexQuery } }
            ]
        });

        const rest4 = await Blogs.find({
            $or: [
                { title: { $regex: regexQuery } },
                { description: { $regex: regexQuery } },
                { content: { $regex: regexQuery } },
                { tags: { $regex: regexQuery } }
            ]
        });

        const rest5 = await Writeups.find({
            $or: [
                { title: { $regex: regexQuery } },
                { description: { $regex: regexQuery } },
                { content: { $regex: regexQuery } },
                { tags: { $regex: regexQuery } }
            ]
        });
        // Note: Since we're using regex, we don't have a relevance score to sort by
        // If you have a way to determine relevance, you can sort based on that criteria

        const taggedResults = [
            ...rest1.map(doc => ({ ...doc.toObject(), source: 'asb' })),
            ...rest2.map(doc => ({ ...doc.toObject(), source: 'ghb' })),
            ...rest3.map(doc => ({ ...doc.toObject(), source: 'khb' })),
            ...rest4.map(doc => ({ ...doc.toObject(), source: 'blogs' })),
            ...rest5.map(doc => ({ ...doc.toObject(), source: 'writeups' }))
        ];

        resp.status(200).json({ results: taggedResults });
    } catch (err) {
        console.log(err);
        resp.status(401).json({ message: err.message });
    }
}









async function latestEventsAndAnons(req, resp) {
    try {

        d1 = await GHB.find().populate("author", "-_id name").sort({ createdAt: -1 }).limit(7).exec()
        tagd1 = d1.map(doc => ({ ...doc.toObject(), source: 'ghb' }));

        d2 = await KHB.find().populate("author", "-_id name").sort({ createdAt: -1 }).limit(7).exec()
        tagd2 = d2.map(doc => ({ ...doc.toObject(), source: 'khb' }));

        const data = [...tagd1, ...tagd2].sort((a, b) => b.publicationDate - a.publicationDate).slice(0, 7)
        resp.status(200).json({ message: data })
    } catch (err) {
        console.log(err)
        resp.status(401).json({ message: err.message })
    }
}


module.exports = {
    latest: latest,
    search: getLatestSearch,
    eventandanons: latestEventsAndAnons
}