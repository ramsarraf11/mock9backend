const Router = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require('dotenv').config()


const { UserModel } = require("../models/userModel")
const { PostModel } = require("../models/postModel")
const { authenticate } = require("../middlewares/authentication")

const user = Router()


user.post("/register", async (req, res) => {
    let { name, email, password, dob, bio } = req.body
    try {
        let allData = await UserModel.findOne({ email })
        if (allData.length === 0) {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(201).send(`something wrong`)
                } else {
                    let obj = {
                        name: name,
                        email: email,
                        password: hash,
                        dob: dob,
                        bio: bio,
                        posts: [],
                        friends: [],
                        friendRequests: []
                    }
                    const user = new UserModel(obj);
                    await user.save()
                    res.send("User registered Successfully")
                }
            })
        } else {
            res.send("Already Registerd ! Please Login")
        }
    } catch (error) {
        res.send(error)
    }
})

user.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email });
        const hashed_pass = user[0].password;
        if (user.length > 0) {
            bcrypt.compare(password, hashed_pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userid: user[0]._id }, process.env.secretKey);
                    res.status(201).send({ "msg": "Login Successfull", Token: token })
                } else {
                    res.send("Wrong Credntials")
                }
            })
        } else {
            res.send("User Not registered")
        }
    } catch (error) {
        res.send("some thing went wrong in login")
    }
})

user.get("/users", async (req, res) => {
    let all_data = await UserModel.find({});
    try {
        res.send(all_data)
    } catch (error) {
        res.send(error)
    }
})

user.get("/users/:id/friends", async (req, res) => {
    let id = req.params.id
    let all_data = await UserModel.findOne({ _id: id });
    try {
        res.send(all_data.friends)
    } catch (error) {
        res.send(error)
    }
})

user.use(authenticate)

user.post("/users/:id/friends", async (req, res) => {
    res.send("posting data")
})

user.post("/users/:id/friends/:friendId", async (req, res) => {
    res.send("posting data")
})



module.exports = { user }