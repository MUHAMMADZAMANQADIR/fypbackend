const express = require('express')
const router = express.Router()
const auth = require('../../../middleware/auth')

const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

//Get User Model
const User = require('../../../models/users/Users')



// @route          POST  /api/auth
// description     authenticate user (login) and get token
//access           public

router.post('/', [
    //check('email', 'please enter valid email').isEmail(),
    check('CNIC', 'Invalid CNIC').exists(),
    check('password', 'password does not match').exists(),
    
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { CNIC, password } = req.body
    
    try {
        // see if user already exist
        let user = await User.findOne({ CNIC: req.body.CNIC })
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        }

        // Return jsonwebtokken
        const payload = {
            user: {
                id: user.id
            }
        }

        if (user) {
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                (err, token) => {
                    if (err) throw err
                    res.json({user,token})
                }
            )
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
});


// @route          /api/auth
// description     get user by jwt
//access           public

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})


// @route          POST  /api/auth
// description     refresh token and get new token
//access           private


module.exports = router