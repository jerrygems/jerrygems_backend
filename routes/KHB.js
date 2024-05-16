const express = require("express")
const router = express.Router()
const verifyAdmin = require("../middlewares/verifyAdmin")
const khbController = require("../controllers/books/khbController")

router.post("/create", verifyAdmin, (req, resp, next) => {
    khbController.create(req, resp, next)
})// goes to corresponding controller

router.put("/update", verifyAdmin, (req, resp, next) => {
    khbController.update(req, resp, next)
})// goes to corresponding controller

router.delete("/delete", verifyAdmin, (req, resp, next) => {
    khbController.delete(req, resp, next)
})// goes to corresponding controller

router.get("/getkhbchaps", (req, resp, next) => {
    khbController.getkhbchaps(req, resp, next)
})// goes to corresponding controller

router.get("/getkhbchap/:khbid", (req, resp, next) => {
    khbController.getkhbchap(req, resp, next)
})// goes to corresponding controller

module.exports = router