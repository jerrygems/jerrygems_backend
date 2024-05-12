const express = require("express")
const router = express.Router()
const verifyAdmin = require("../middlewares/verifyAdmin")
const asbController = require("../controllers/books/asbController")

router.post("/create", verifyAdmin, (req, resp, next) => {
    asbController.create(req, resp, next)
})// goes to corresponding controller

router.put("/update", verifyAdmin, (req, resp, next) => {
    asbController.update(req, resp, next)
})// goes to corresponding controller

router.delete("/delete", verifyAdmin, (req, resp, next) => {
    asbController.delete(req, resp, next)
})// goes to corresponding controller

router.get("/getasbchaps", verifyAdmin, (req, resp, next) => {
    asbController.getasbchaps(req, resp, next)
})// goes to corresponding controller

router.get("/getasbchap/:khbid", verifyAdmin, (req, resp, next) => {
    asbController.getasbchap(req, resp, next)
})// goes to corresponding controller

module.exports = router