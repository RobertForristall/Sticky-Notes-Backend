const jwt = require('jsonwebtoken')

function AuthenticateToken(req, res, next) {

    const authHeader = req.headers['authorization']

    if (authHeader == null) return res.status(403).json('Error: Token Required')

    if (authHeader.split(' ')[0] !== 'bearer' && authHeader.split(' ')[0] !== 'Bearer'){
        return res.status(403).json('Error: token is not of the correct format')
    } 

    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(403).json('Error: token string missing')

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json('Error: Token failed to verify' + err)

        req.user = user
        next()
    })
}

module.exports = {
    AuthenticateToken: AuthenticateToken
}