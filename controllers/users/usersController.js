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

module.exports = {
    getAllUsersInfo: getAllUsersInfo
}