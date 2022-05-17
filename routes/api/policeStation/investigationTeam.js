const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const policeStationAuth = require('../../../middleware/policeStationAuth')
//zaman123
// investigation team model
const InvestigationTeam = require('../../../models/investigationTeam/investigationTeam')
const CrimeReported = require('../../../models/users/CrimeReported')
const FIR = require('../../../models/users/FIR')
const User = require('../../../models/users/Users')
const Mukhbir = require('../../../models/users/Mukhbir')

// @route          POST  /api/policeStation
// description     register investigation teams
//access           public

router.post('/registerinvestigationteams', async (req, res) => {

    const { UserName, Password ,TeamName ,LeaderName, TotalAssigncase,
        TotalResolvedcase,UnderInvestigation,Email,Phone , Address} = req.body
    
    //get the police station who creates investigation team
    //const policeStation = await PoliceStation.findById(req.policeStation.id)
     
    try {
        // see if account already exist
        let investigationTeam = await InvestigationTeam.findOne({ UserName: UserName })
        if (investigationTeam) {
           return res.status(400).json({errors: [{msg: 'investigation team already exists'}] })
        }

        investigationTeam = new InvestigationTeam({
            UserName,
            Password,
            TeamName,
            LeaderName,
            TotalAssigncase,
            TotalResolvedcase,
            UnderInvestigation,
            Email,
            Phone,
            Address,
            TeamLeadCNIC,
            PoliceStationID,
            City ,
            PoliceStationLocation, 
             
        })

        // Encrypt password

        const salt = await bcrypt.genSalt(10);
        investigationTeam.Password = await bcrypt.hash(Password, salt)

        //save user in the db
        await investigationTeam.save();
        res.send('investigation team account is created')
        /**
         * // Return jsonwebtokken
         *  const payload = {
            investigationTeam: {
                id: investigationTeam.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err
                res.json({token})
                //res.send('investigation team account is created')
            }
        )
         */
        
       

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})
// @route          GET /api/investigation:id
// description     get fir by id
//access           private

router.get('/:id', async (req, res) => {
    try {
        const investigationTeams = await InvestigationTeam.findById(req.params.id)
         
        //check if any fir is present or not
        if (!investigationTeams) {
            return res.status(404).json({msg: 'fir not found'})
        }
        res.json(investigationTeams)
    } catch (err) {
        if (err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'investigation Teams  not found'})
        }
        res.status(500).send('server error')
        console.log(err.message)
    }
})
// @route          GET  /api/investigation
// description     Get all the investigation teams
//access           private

router.get('/allinvestigationteams', async (req, res) => {
    try {
        const investigationTeams = await InvestigationTeam.find()
        res.json(investigationTeams)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})
// @route          POST /api/itm
// description     Login investigation team
//access           private

router.post('/logininvestigationteam', async (req, res) => {

    const { UserName, Password} = req.body
    
     
    try {
        // see if account already exist
        let investigationTeam = await InvestigationTeam.findOne({ UserName: UserName })
        if (!investigationTeam) {
           return res.status(400).json({errors: [{msg: 'Invalid Username'}] })
        }
           
        const isMatch = await bcrypt.compare(Password, investigationTeam.Password)

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        }

    
        // Return jsonwebtokken
        const payload = {
            investigationTeam: {
                id: investigationTeam.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err
                res.json({investigationTeam , token})
                //res.send('investigation team account is created')
            }
        )

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

// @route          POST /api/users
// description     Delete user
//access           private

router.delete('/:id',  async (req, res) => {
    try {
        const investigationTeam = await InvestigationTeam.findOneAndRemove({ _id: req.params.id })
        res.json('investigation team deleted')
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})


// @route          POST  /api/policeStation/update
// description     update investigation team account
//access           private

router.put('/updateinvestigationteam/:id', async (req, res) => {
    
    const { UserName, Password,PoliceStationID ,City ,PoliceStationLocation,TeamName,LeaderName, TotalAssigncase,
        TotalResolvedcase,UnderInvestigation,Email,Phone ,Address,TeamLeadCNIC} = req.body

    //Build new data
    const newData = {}
    if (UserName) newData.UserName = UserName
    if (TotalAssigncase) newData.TotalAssigncase = TotalAssigncase
    if (TotalResolvedcase) newData.TotalResolvedcase = TotalResolvedcase
    if (UnderInvestigation) newData.UnderInvestigation = UnderInvestigation
    if (Email) newData.Email = Email
    if (Phone) newData.Phone = Phone
    if (Address) newData.Address = Address
    if (PoliceStationID) newData.PoliceStationID = PoliceStationID
    if (City) newData.City = City
    if (PoliceStationLocation) newData.PoliceStationLocation = PoliceStationLocation
    if (TeamLeadCNIC) newData.TeamLeadCNIC = TeamLeadCNIC
    if (Password) {
        newData.Password = Password
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        newData.Password = await bcrypt.hash(Password, salt)
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

// @route          POST/api/policeStation/getallassingedcases 
// description     Get all assinged cases 
//access           private

module.exports = router