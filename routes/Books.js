const express = require("express")
const router = express.Router()
const asbController = require("../controllers/books/asbController")

router.post("/asbcreate", (req, resp, next) => {
    asbController.create(req, resp, next)
})// goes to corresponding controller

router.put("/asbupdate", (req, resp, next) => {
    asbController.update(req, resp, next)
})// goes to corresponding controller

router.delete("/asbdelete", (req, resp, next) => {
    asbController.delete(req, resp, next)
})// goes to corresponding controller

module.exports = router