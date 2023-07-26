const mysql = require('mysql');
const MySqlContainer = require('testcontainers')

var isInTest = typeof global.it === 'function';
var container

if (isInTest) {
    console.log("In Test: Loading Test Container...")
    container = new MySqlContainer().constructor();
    console.log(container)
    startTestContainer()
    
}

const db = mysql.createConnection({
    host: (isInTest) ? container.getHost() : process.env.DB_HOST,
    port: (isInTest) ? container.getPort() : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

const timeNow = new Date().getUTCSeconds();
let isConnected = false;

testConnection();

if (!isConnected) {
    console.error("Failed to connect to database...")
}

async function testConnection() {
    while(new Date().getUTCSeconds() < timeNow + 20000) {
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

async function startTestContainer() {
    await container.start().then(res => {
        console.log("Server Started")
    })
}

module.exports = db