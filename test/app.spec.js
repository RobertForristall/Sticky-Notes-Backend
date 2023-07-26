const request = require('supertest')
const assert = require('assert')
const app = require('../app')
const { before } = require('mocha')
const db = require("../db_connection")

let test_user_signup = {
    "email": "final@test.com",
    "name": "Tester",
    "dob": "2023-04-24",
    "is_verified": true,
    "pass": "e806a291cfc3e61f83b98d344ee57e3e8933cccece4fb45e1481f1f560e70eb1"
}

let test_user_login = {
    "email": "final@test.com",
    "pass": "e806a291cfc3e61f83b98d344ee57e3e8933cccece4fb45e1481f1f560e70eb1"
}

before('Wait for database to be connected', function(done) {
    var flag = false
    while(!flag) {
        db.ping((err) => {
            if (err){console.log(err)}
            else {flag=true}
        })
    }
    console.log("Berfore All End...")
})

describe("POST /users/signup", () => {

    it("Returns that the user was successfully added", done => {
        request(app)
            .post('/users/signup')
            .send(test_user_signup)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                return done()
            })
    })

})