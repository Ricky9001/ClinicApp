const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { create, getUserByUserEmail } = require("./user.service")
const { genAccessToken  } = require("../../auth/token_validation");

module.exports = {
    createUser: async (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt);

        await getUserByUserEmail(body.email, async (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "DB connection error",
                });
            }
            if (results && results.length > 0) {
                return res.json({
                    success: false,
                    message: "The specified email is already been registered. Please try another email!"
                });
            }
            else {
                await create(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "DB connection error",
                        });
                    }
    
                    return res.status(200).json({
                        success: true,
                        message: "User is created",
                        //data: results
                    })
                });
            }
        });
    },
    login: async (req, res) => {
        const body = req.body;        
        await getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                // console.log('login 1')
                return res.status(500).json({
                    success: false,
                    message: "DB Connection fail"
                });
            }
            if (!results || results.length == 0) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            const result = compareSync(body.password, results[0].password);
            if (result) {
                results[0].password = undefined;
                const userInfo = {
                    userid: results[0].autoid,
                    email: results[0].email
                }

                const accesstoken = genAccessToken(userInfo)
                return res.json({
                    success: true,
                    message: "login successfully",
                    accessToken: accesstoken,
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }
        });
    },

}