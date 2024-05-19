const express = require("express")
const router = express.Router()
const verifyAdmin = require("../middlewares/verifyAdmin")
const AnnouncementController = require("../controllers/others/AnnouncementController")

router.post("/create", verifyAdmin, (req, resp, next) => {
    AnnouncementController.create(req, resp, next)
})// goes to corresponding controller

router.delete("/delete", verifyAdmin, (req, resp, next) => {
    AnnouncementController.delete(req, resp, next)
})// goes to corresponding controller

router.get("/getannouncements", verifyAdmin, (req, resp, next) => {
    AnnouncementController.getanons(req, resp, next)
})// goes to corresponding controller

router.get("/announcements", (req, resp, next) => {
    AnnouncementController.getanons(req, resp, next)
})// goes to corresponding controller

module.exports = router