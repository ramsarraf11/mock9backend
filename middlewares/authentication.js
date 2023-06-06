const jwt = require("jsonwebtoken");
require("dotenv").config();


async function authenticate(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (token) {
            const decoded = jwt.verify(token, process.env.secretKey);
            if (decoded) {
                const userid = decoded.userid;
                req.body.userid = userid;
                next();
            } else {
                res.send(`wrong data`)
            }
        } else {
            res.send(`wrong data`)
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    authenticate
}