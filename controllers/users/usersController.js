const Users = require("../../models/UsersMod")

async function getAllUsersInfo(req, resp) {
    try {
        const allUsers = await Users.find();
        return resp.status(200).json(allUsers);
    } catch (err) {
        console.log(err);
        return resp.status(500).json({ message: "An error occurred while fetching users" });
    }
}

async function verifyRole(req, resp) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return resp.status(401).send('Access Denied');
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        resp.json({ role: verified.role });

    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getAllUsersInfo: getAllUsersInfo,
    verifyRole : verifyRole
}