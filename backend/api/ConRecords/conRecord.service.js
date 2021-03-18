const pool = require('../../Config/database')

module.exports = {
    CreateRecord: async (data, callBack) => {
        try {
            var query = `INSERT INTO conRecord(userid, doctor, patient, diagnosis, medication, fee, con_datetime, follow_up, create_time) 
                     VALUES ('${data.userid}', N'${data.doctor}', N'${data.patient}', N'${data.diagnosis}', N'${data.medication}', '${data.fee}', '${data.con_datetime}', '${data.follow_up}', CURDATE())`
            // console.log(query)
            await pool.query(
                query,
                [],
                (error, results, fields) => {
                    error ? callBack(error) : callBack(null, results)
                }
            );
        }
        catch (error) {            
            return callBack(error)
        }
    },
    CheckRecordDuplicate: async (data, callBack) => {
        try {
            var query = `SELECT 1 as record FROM conRecord WHERE userid = '${data.userid}' AND doctor = N'${data.doctor}' AND con_datetime = '${data.con_datetime}' `;                     
            await pool.query(
                query,
                [],
                (error, results, fields) => {
                    error ? callBack(error) : callBack(null, results)
                }
            )
        }
        catch (error) {            
            return callBack(error)
        }
    },
    GetRecordsInRange: async (data, callBack) => {
        try {
            var query = `SELECT doctor, patient, diagnosis, medication, fee, con_datetime, follow_up FROM conRecord 
                        WHERE userid = '${data.userid}' AND con_datetime BETWEEN '${data.startdatesql}' AND '${data.enddatesql}'`;                     
                        
            pool.query(
                query,
                [],
                (error, results, fields) => {
                    console.log(results)
                    error ? callBack(error) : callBack(null, results)
                }
            )
        }
        catch (error) {            
            return callBack(error)
        }
    }
}