const { CreateRecord, CheckRecordDuplicate, GetRecordsInRange } = require("./interview.service")

module.exports = {
    CreateRecord: async (req, res) => {
        let data = req.body;
        data.userid = req.user.userid;
        console.log('CreateRecord')
        console.log(data);
        // console.log(req)
        await CheckRecordDuplicate(data, async(err, results) => {
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
                    message: "Interview already exists on the specified time!"
                });
            }
            else {
                await CreateRecord(data, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: false,
                            message: "DB connection error",
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Interview Record is created",
                            //data: results
                        })
                    }
                })
            }
        });
    },
    GetRecordsInRange: async (req, res) => {
        let data = req.body;
        data.userid = req.user.userid;
        await GetRecordsInRange(data, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "DB connection error",
                });
            }
            else {                
                console.log(result)
                return res.status(200).json({
                    success: true,
                    message: "Get Data",
                    data: result
                })
            }
        });
    }
}