const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../../../middleware/auth')

// Contact model
const Contact = require('../../../models/users/ContactUs')

// User model for accessing Users collection
const User = require('../../../models/users/Users')

// @route          POST  /api/users
// description     register users
//access           public

router.post('/', [
    check('name', 'name is required')
        .not()
        .isEmpty(),
    check('email', 'please enter valid email').isEmail(),
    check('password', 'please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('CNIC', 'please enter an valid CNIC').isLength({ min: 13 }),
    check('phone', 'please enter an valid phone number').isLength({ min: 11 }),
    check('city', 'please enter a city').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() })
    }

    const { name, phone, email, password, city, CNIC } = req.body
     
    try {
        // see if user already exist
        let user = await User.findOne({ CNIC: CNIC })
        if (user) {
           return res.status(400).json({errors: [{msg: 'User already exists'}] })
        }

        user = new User({
            name,
            phone,
            email,
            CNIC,
            city,
            password
        })

        // Encrypt password

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)

        //save user in the db
        await user.save();
        // Return jsonwebtokken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            (err, token) => {
                if (err) throw err
                res.json({token:token,user:user})
            }
        )

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

// @route          GET  /api/users
// description     Get all the users
//access           public

router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.json(users)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

// @route          POST /api/users
// description     Delete user
//access           private

router.post('/contact',  async (req, res) => {
    try {
        const { name, email, message } = req.body
        const contact = new Contact({
            name,
            email,
            message
        })
        const contacts = await contact.save()
        res.json('message recieved')
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})


// @route          POST  /api/users/update
// description     update user profile
//access           private

router.post('/update/:id', [
    // check('name', 'name is required').not().isEmpty(),
    // check('email', 'please enter valid email').isEmail(),
    // check('city', 'city is required').not().isEmpty(),
    // check('password', 'please enter a password with 6 or more characters').isLength({ min: 6 }),
    // check('CNIC', 'please enter an valid CNIC').isLength({ min: 13 }),
    // check('phone', 'please enter an valid phone number').isLength({ min: 11 }),
    ], async (req, res) => {
    
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, phone, email, password, city} = req.body

    //Build new data
    const newData = {}
    if (name) newData.name = name
    if (phone) newData.phone = phone
    if (email) newData.email = email
    if (city) newData.city = city
    if (password) {
        newData.password = password
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        newData.password = await bcrypt.hash(password, salt)
    } 
    
     
    try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: newData },
                { new: true })
            
            return res.json(user)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})


// @route          POST /api/users
// description     Contact us
//access           public

router.delete('/', async (req, res) => {
    try {
        const users = await User.findOneAndRemove({ _id: req.user.id })
        res.json('user deleted')
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})



module.exports = router