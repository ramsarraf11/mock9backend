const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
    user: {},
    text: String,
    image: String,
    createdAt: Date,
    likes: [],
    comments: [],
    userid: String

}, {
    versionKey: false
});

const PostModel = mongoose.model("postdata", postsSchema);

module.exports = {
    PostModel
}