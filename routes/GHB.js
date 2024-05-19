const express = require("express")
const router = express.Router()
const verifyAdmin = require("../middlewares/verifyAdmin")
const ghbController = require("../controllers/books/ghbController")

router.post("/create", verifyAdmin, (req, resp, next) => {
    ghbController.create(req, resp, next)
})// goes to corresponding controller

router.put("/update", verifyAdmin, (req, resp, next) => {
    ghbController.update(req, resp, next)
})// goes to corresponding controller

router.delete("/delete", verifyAdmin, (req, resp, next) => {
    ghbController.delete(req, resp, next)
})// goes to corresponding controller

router.get("/getghbchaps",verifyAdmin, (req, resp, next) => {
    ghbController.getghbchaps(req, resp, next)
})// goes to corresponding controller

router.get("/getghbchap/:ghbid",verifyAdmin, (req, resp, next) => {
    ghbController.getghbchap(req, resp, next)
})// goes to corresponding controller

router.get("/ghbchaps", (req, resp, next) => {
    ghbController.getghbchaps(req, resp, next)
})// goes to corresponding controller

router.get("/ghbchap/:ghbid", (req, resp, next) => {
    ghbController.getghbchap(req, resp, next)
})// goes to corresponding controller

module.exports = router