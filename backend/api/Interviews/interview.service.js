const pool = require('../../Config/database')

module.exports = {
    CreateRecord: async (data, callBack) => {
        try {
            var query = `INSERT INTO Interview(userid, company, interviewer, interviewee, job_title, expected_salary, interview_date, create_time) 
                     VALUES ('${data.userid}', N'${data.company}', N'${data.interviewer}', N'${data.interviewee}', N'${data.jobtitle}', '${data.salary}', '${data.interview_date}', CURDATE())`
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
            var query = `SELECT 1 as record FROM Interview WHERE userid = '${data.userid}' AND ((interviewer = N'${data.interviewer}' AND interview_date = '${data.interview_date}') OR (interviewee = N'${data.interviewee}' AND interview_date = '${data.interview_date}')) `;                     
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
            var query = `SELECT company, interviewer, interviewee, job_title, expected_salary, interview_date FROM Interview 
                        WHERE userid = '${data.userid}' AND interview_date BETWEEN '${data.startdatesql}' AND '${data.enddatesql}'`;                     
                        
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