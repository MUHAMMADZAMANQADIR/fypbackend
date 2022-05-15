const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const policeStationAuth = require('../../../middleware/policeStationAuth')

// police station model for accessing Users collection
const PoliceStation = require('../../../models/policeStation/PoliceStation')

// @route          POST  /api/users
// description     register users
//access           public

router.post('/', async (req, res) => {

    const { userName, name, phone, city, password } = req.body
     
    try {
        // see if account already exist
        let policeStation = await PoliceStation.findOne({ userName: userName })
        if (policeStation) {
           return res.status(400).json({errors: [{msg: 'police station already exists'}] })
        }

        policeStation = new PoliceStation({
            userName,
            name,
            phone,
            city,
            password
        })

        // Encrypt password

        const salt = await bcrypt.genSalt(10);
        policeStation.password = await bcrypt.hash(password, salt)

        //save user in the db
        await policeStation.save();
        // Return jsonwebtokken
        const payload = {
            policeSation: {
                id: policeStation.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err
                res.json({token})
            }
        )

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})


// @route          GET  /api/users
// description     Get all the police stations
//access           private

router.get('/', async (req, res) => {
    try {
        const policeStations = await PoliceStation.find()
        res.json(policeStations)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

// @route          POST /api/users
// description     Delete user
//access           private

router.delete('/:id',  async (req, res) => {
    try {
        const policeStation = await PoliceStation.findOneAndRemove({ _id: req.params.id })
        res.json('police station deleted')
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})


// @route          POST  /api/users/update
// description     update police station account
//access           private

router.put('/:id', async (req, res) => {
    
    const { userName, name, phone, city, password } = req.body

    //Build new data
    const newData = {}
    if (userName) newData.userName = userName
    if (name) newData.name = name
    if (phone) newData.phone = phone
    if (city) newData.city = city
    if (password) {
        newData.password = password
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        newData.password = await bcrypt.hash(password, salt)
    } 
    
     
    try {
            const policeStation = await PoliceStation.findOneAndUpdate(
                { _id: req.params.id },
                { $set: newData },
                { new: true })
            
            return res.json(policeStation)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})



module.exports = router