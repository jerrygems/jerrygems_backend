const express = require("express")
const router = express.Router()
const blogsController = require("../controllers/content/blogsController")

router.post("/blogscreate", (req, resp, next) => {
    blogsController.create(req, resp, next)
})// goes to corresponding controller

router.put("/blogsupdate", (req, resp, next) => {
    blogsController.update(req, resp, next)
})// goes to corresponding controller

router.delete("/blogsdelete", (req, resp, next) => {
    blogsController.delete(req, resp, next)
})// goes to corresponding controller

module.exports = router