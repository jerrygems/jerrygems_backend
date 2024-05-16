const express = require("express")
const router = express.Router()
const verifyAdmin = require("../middlewares/verifyAdmin")
const writeupsController = require("../controllers/content/writeupsController")

router.post("/create", verifyAdmin, (req, resp, next) => {
    writeupsController.create(req, resp, next)
})// goes to corresponding controller

router.put("/update", verifyAdmin, (req, resp, next) => {
    writeupsController.update(req, resp, next)
})// goes to corresponding controller

router.delete("/delete", verifyAdmin, (req, resp, next) => {
    writeupsController.delete(req, resp, next)
})// goes to corresponding controller

router.get("/getwriteups", (req, resp, next) => {
    writeupsController.getallWriteups(req, resp, next)
})// goes to corresponding controller

router.get("/getwriteup/:writeupid", (req, resp, next) => {
    writeupsController.getWriteup(req, resp, next)
})// goes to corresponding controller

module.exports = router