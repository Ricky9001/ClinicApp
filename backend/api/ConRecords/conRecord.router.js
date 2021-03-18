const router = require("express").Router();
const { verifyAccessToken } = require("../../auth/token_validation");
const {
    CreateRecord,
    GetRecordsInRange
} = require("./conRecord.controller");

router.post("/create", verifyAccessToken, CreateRecord)
router.post("/GetRecords", verifyAccessToken, GetRecordsInRange)
// router.get("/", verifyAccessToken, getUsers);
// router.post("/login", login);

module.exports = router;