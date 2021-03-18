const pool = require('../../Config/database')

module.exports = {
    create: async (data, callBack) => {
        try {
            var query = `insert into users(email, password, name, phone, address, create_time) 
            VALUES (N'${data.email}', N'${data.password}', N'${data.name}', N'${data.phone}', N'${data.address}', CURDATE())`

            pool.query(
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
    getUserByUserEmail: async (email, callBack) => {        
        try {
            var query = `select autoid, email, password, name, phone, address from users where email = '${email}'`
            pool.query(
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
    
};