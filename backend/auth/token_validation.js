const jwt = require("jsonwebtoken");
const { sign } = require('jsonwebtoken');

module.exports = {
    genAccessToken:  (user) => {
        // console.log('genAccessToken', user)
        return  sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30m"
        });
    },

    verifyAccessToken:  (req, res, next) => {
        const authHeader = req.headers["authorization"];
        // Remove Bearer from string
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.status(403).json({
                success: false,
                message: "Invalid Token...",
                redirect: true,
            });
        }
        else {
             jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json({
                        success: false,
                        message: "Access Denied! Unauthorized User",
                        redirect: true,
                    });
                } else {
                    console.log('verify token done')
                    console.log(user);
                    req.user = user;
                    next();
                }
            });
        }
    },
};