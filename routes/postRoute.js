const Router = require("express")
require('dotenv').config()


const { authenticate } = require("../middlewares/authentication")
const { UserModel } = require("../models/userModel")
const { PostModel } = require("../models/postModel")

const post = Router()


post.use(authenticate)

post.get("/posts/:id", async (req, res) => {
    let ID = req.params.id
    try {
        let post = await PostModel.findOne({ _id: ID });
        res.send(post)

    } catch (error) {
        res.send(error)
    }
})

post.patch("/posts/:id", async (req, res) => {
    try {
        await PostModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.send("Post Updaed successfully")

    } catch (error) {
        res.send("nothing found wiht the given id")
    }
})

post.delete("/posts/:id", async (req, res) => {
    try {
        await PostModel.findByIdAndDelete({ _id: req.params.id });
        res.send("Post deleted successfully")
    } catch (error) {
        res.send("nothing availabve with the given id")
    }
})


module.exports = { post }