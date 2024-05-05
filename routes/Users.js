const express = require("express")
const router = express.Router()
const usersController = require("../controllers/users/usersController")
const verifyAdmin = require("../middlewares/verifyAdmin")

router.get("/uinfo", verifyAdmin, (req, resp, next) => {
    usersController.getAllUsersInfo(req, resp, next)
})// goes to corresponding controller

module.exports = router