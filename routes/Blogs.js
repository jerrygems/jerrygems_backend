const express = require("express")
const router = express.Router()
const verifyAdmin = require("../middlewares/verifyAdmin")
const blogsController = require("../controllers/content/blogsController")

router.post("/create", verifyAdmin, (req, resp, next) => {
    blogsController.create(req, resp, next)
})// goes to corresponding controller

router.put("/update", verifyAdmin, (req, resp, next) => {
    blogsController.update(req, resp, next)
})// goes to corresponding controller

router.delete("/delete", verifyAdmin, (req, resp, next) => {
    blogsController.delete(req, resp, next)
})// goes to corresponding controller

router.get("/getblogs", verifyAdmin, (req, resp, next) => {
    blogsController.getallblogs(req, resp, next)
})// goes to corresponding controller

router.get("/getblog/:blogid", verifyAdmin, (req, resp, next) => {
    blogsController.getblog(req, resp, next)
})// goes to corresponding controller

module.exports = router