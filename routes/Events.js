const express = require("express")
const router = express.Router()
const verifyAdmin = require("../middlewares/verifyAdmin")
const EventsController = require("../controllers/others/EventsController")

router.post("/create", verifyAdmin, (req, resp, next) => {
    EventsController.create(req, resp, next)
})// goes to corresponding controller

router.delete("/delete", verifyAdmin, (req, resp, next) => {
    EventsController.delete(req, resp, next)
})// goes to corresponding controller

router.get("/getevents", verifyAdmin, (req, resp, next) => {
    EventsController.getevents(req, resp, next)
})// goes to corresponding controller

module.exports = router