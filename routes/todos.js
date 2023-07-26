var express = require('express')
var router = express.Router()
const db = require('../db_connection')
const jwt = require('jsonwebtoken')
const sha256 = require('crypto-js').SHA256
const funs = require('../functions')

router.route("/:userId").get(funs.AuthenticateToken, (req, res) => {

    query_string = `select * from Todos where userId=${req.params.userId};`

    db.query(query_string, (err, results, fields) => {
        if (err) {
            console.log(err)
            return res.status(400).json(err)
        }
        res.contentType('application/json')
        res.json(results)
    })

})

router.route("/add").post(funs.AuthenticateToken, (req, res) => {
    
    columnNames = Object.keys(req.body).join(",")
    columnValues = Object.values(req.body).map(val => {
        if (typeof(val) === typeof("")) {
            return `"${val}"`
        } else {
            return `${val}`
        }
    }).join(",")
    query_string = `insert into Todos (${columnNames}) values (${columnValues})`

    db.query(query_string, (err, results, fields) => {
        if (err) {
            console.log(err)
            return res.status(400).json(err)
        }
        res.contentType('application/json')
        res.json("Todo Added")
    })

})

router.route("/update/:id").put(funs.AuthenticateToken, (req, res) => {
    valsArray = Object.values(req.body)
    zippedArray = Object.keys(req.body).map((e, i) => {
        return [e, valsArray[i]]
    })
    query_string = `update Todos set ${zippedArray.map(e => {
        if (typeof(e[1]) === typeof("")) {
            return `${e[0]} = "${e[1]}"`
        }
        else {
            return `${e[0]} = ${e[1]}`
        }
    }).join(",")} where id = ${req.params.id};`
    db.query(query_string, (err, results, fields) => {
        if (err) {
            console.log(err)
            return res.status(400).json(err)
        }
        res.contentType('application/json')
        res.json("Todo Updated!")
    })
})

router.route("/delete/:id").delete(funs.AuthenticateToken, (req, res) => {
    query_string = `delete from Todos where id = ${req.params.id};`
    db.query(query_string, (err, results, fields) => {
        if (err) {
            console.log(err)
            return res.status(400).json(err)
        }
        res.contentType('application/json')
        res.json("Todo Deleted!")
    })
})

module.exports = router