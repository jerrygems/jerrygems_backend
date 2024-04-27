const express = require("express")
const router = express.Router()
const registerController = require("../controllers/registerController")
const loginController = require("../controllers/loginController")

router.post("/register", (req, resp, next) => {
    registerController(req, resp, next)
}) // goes to the corresponding controller


router.post("/login", (req, resp, next) => {
    loginController(req, resp, next)
}) // goes to the corresponding controller




module.exports = router