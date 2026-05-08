const {Pool} = require('pg');

const pool = new Pool({
    user:process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

const ConnectDB = async () => {
    try{
        await pool.connect()
        console.log("Database connected successfully");
    }catch(error){
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
}


module.exports = {pool, ConnectDB}

