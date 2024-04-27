const express = require("express")
const router = express.Router()
const asbController = require("../controllers/books/asbController")

router.post("/asbcreate", (req, resp, next) => {
    asbController.create(req, resp, next)
})// goes to corresponding controller

module.exports = router