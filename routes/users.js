var express = require('express')
var router = express.Router()
const db = require('../db_connection')
const jwt = require('jsonwebtoken')
const sha256 = require('crypto-js').SHA256
// const funs = requrie('../functions')

router.route('/signup').post((req, res) => {
    Object.keys(req.body).forEach(key => {
        if (typeof(req.body[key]) === typeof('') && req.body[key].length === 0) {
            return res.send(400, {msg: `Error: ${String.toString(key)} field is missing.`})
        }
    })

    query_string = `
    insert into Users (email, name, dob, is_verified, pass)
    values ("${req.body.email}", "${req.body.name}", "${req.body.dob}", ${req.body.is_verified}, "${req.body.pass}");
    `

    db.query(query_string, (err, results, fields) => {
        if (err) {
            console.log(err)
            return res.status(400).json(err)
        }

        res.set('Content-Type', 'application/json')
        res.json('User Added!')
    })
})

router.route('/login').post((req, res) => {
    query_string = `select name, dob, id from Users where email = "${req.body.email}" and pass = "${req.body.pass}"`
    console.log(req.body.email)
    console.log(req.body.pass)

    db.query(query_string, (err, results, fields) => {
        if (err) return res.status(400).json(err)
        console.log(results)
        if (results[0] === undefined) return res.status(400).json('Invalid Login Credentials! Please try again.')

        token = jwt.sign({data: req.body.email}, process.env.SECRET_KEY, {expiresIn: '1h'})
        refresh_token = jwt.sign({data: req.body.email}, process.env.REFRESH_KEY, {expiresIn: '1d'})
        const roles = ['user']

        res.set('Content-Type', 'application/json')
        res.cookie('todo-jwt', refresh_token, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000})
        res.json({
            token: token,
            refresh_token: refresh_token,
            roles: roles
        })
    })
})

router.route('/delete/:id').delete((req, res) => {

})

router.route('/verify/:id/:token').put((req, res) => {

})

router.route('/sendVerification/:email').get((req, res) => {

})

router.route('/ping').get((req, res) => {
    console.log("pinged!")
    res.json("Pinged!")
})

module.exports = router