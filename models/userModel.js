const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [],
    friends: [],
    friendRequests: []
}, {
    versionKey: false
});

const UserModel = mongoose.model("userdata", userSchema);

module.exports = {
    UserModel
}