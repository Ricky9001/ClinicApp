const router = require("express").Router();
const { verifyAccessToken } = require("../../auth/token_validation");
const {
    createUser,
    login,
} = require("./user.controller");

router.post("/register", createUser)
router.post("/login", login);

module.exports = router;