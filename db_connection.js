const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

const timeNow = new Date().getSeconds;
let isConnected = false;

async function testConnection() {
    while(new Date().getSeconds < timeNow + 20000) {
        await new Promise(r => setTimeout(r, 5000))
        db.connect(err => {
            if (err) {
                console.error("database connection failed: " + err)
                isConnected = false
            } else {
                console.log("Database connection established Successfully!")
                isConnected = true
            }
        })
        if (isConnected) {
            break
        }
    }
}

testConnection();

if (!isConnected) {
    console.error("Failed to connect to database...")
}

module.exports = db