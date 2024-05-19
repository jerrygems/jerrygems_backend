const Users = require("../../models/UsersMod")
const jwt = require("jsonwebtoken")

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
        const token = req.headers.authorization;

        if (!token) {
            return resp.status(401).send('Access Denied: Malformed token');
        }

        const verified = jwt.verify(token, process.env.SECRET_KEY)
        if (verified.role === "admin") {
            return resp.status(200).json({ message: 'admin' })
        }
        return resp.status(401).json({ message: "You don't have permission to access this content" });
        next();
    } catch (err) {
        console.log('Error:', err);
        resp.status(400).json({ message: "Invalid Token" });
    }
}


module.exports = {
    getAllUsersInfo: getAllUsersInfo,
    verifyRole: verifyRole
}