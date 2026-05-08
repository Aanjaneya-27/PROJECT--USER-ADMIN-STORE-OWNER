require('dotenv').config();
const app = require('./src/app')
const { ConnectDB } = require('./src/config/database')


ConnectDB();

app.listen(5000, () => {
    console.log("server is running");
    
})