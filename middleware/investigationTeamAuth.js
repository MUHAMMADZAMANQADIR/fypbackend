const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next){
    // Get token from the header
    const token = req.header('x-auth-token')

    //check if no token
    if (!token) {
        return res.status(401).json({msg: 'No token , autherization denied'})
    }
    //verify the token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.investigationTeam = decoded.investigationTeam
        next()
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}