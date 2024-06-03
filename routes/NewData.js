const express = require("express")
const router = express.Router()
const NewDataController = require("../controllers/NewDataController")

router.get("/latest", (req, resp, next) => {
    NewDataController.latest(req, resp, next)
})

router.get("/search", (req, resp, next) => {
    NewDataController.search(req, resp, next)
})

module.exports = router