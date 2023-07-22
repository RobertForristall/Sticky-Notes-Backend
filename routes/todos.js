var express = require('express')
var router = express.Router()
const db = require('../db_connection')
const jwt = require('jsonwebtoken')
const sha256 = require('crypto-js').SHA256
// const funs = requrie('../functions')

router.route("/add").post((req, res) => {
    
})

module.exports = router