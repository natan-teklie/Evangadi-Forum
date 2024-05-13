const mysql2 = require('mysql2')





const dbConnection = mysql2.createPool({
    user:"admin",
    database:"evangadi-db",
    host:"localhost",
    password:"1234567",
    connectionLimit: 10
})


dbConnection.execute("select 'test'", (err, result) =>{
    if(err){
        console.log(err.message)
    }else{
        console.log(result)
    }
})