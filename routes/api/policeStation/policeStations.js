const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const policeStationAuth = require('../../../middleware/policeStationAuth')

// police station model 
const PoliceStation = require('../../../models/policeStation/PoliceStation')
 

// @route          POST  /api/policeStation
// description     register investigation teams
//access           public

router.post('/registerpoliceStation', async (req, res) => {

    const { UserName, Password , PoliceStationname, City} = req.body
    
    //get the police station who creates investigation team
    //const policeStation = await PoliceStation.findById(req.policeStation.id)
     
    try {
        // see if account already exist
        let policeStation = await PoliceStation.findOne({ UserName: UserName })
        if (policeStation) {
           return res.status(400).json({errors: [{msg: 'PoliceStation already exists'}] })
        }
        
        policeStation = new PoliceStation({
            UserName,
            Password,
            PoliceStationname,
            City,
        })

        // Encrypt password

        const salt = await bcrypt.genSalt(10);
        policeStation.Password = await bcrypt.hash(Password, salt)

        //save user in the db
        await policeStation.save();
        res.send('investigation team account is created')
       /** 
        * 
        * // Return jsonwebtokken
        const payload = {
             policeStation: {
                id: policeStation.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err
                //res.json({token})
                res.send('investigation team account is created')
            }
        )
       */
        

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})


// @route          GET  /api/users
// description     Get all the Police station
//access           private

router.get('/allPolicestations', async (req, res) => {
    try {
        const policeStation = await PoliceStation.find()
        res.json(policeStation)
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
        const investigationTeam = await PoliceStation.findOneAndRemove({ _id: req.params.id })
        res.json('investigation team deleted')
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})


// @route          POST  /api/policeStation/update
// description     update investigation team account
//access           private

router.put('/:id', async (req, res) => {
    
    const { userName, password } = req.body

    //Build new data
    const newData = {}
    if (userName) newData.userName = userName
    if (password) {
        newData.password = password
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        newData.password = await bcrypt.hash(password, salt)
    } 
    
     
    try {
            const investigationTeam = await InvestigationTeam.findOneAndUpdate(
                { _id: req.params.id },
                { $set: newData },
                { new: true })
            
            return res.json(investigationTeam)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})



module.exports = router