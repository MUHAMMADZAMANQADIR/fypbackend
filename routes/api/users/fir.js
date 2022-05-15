const express = require('express')
const router = express.Router()
const auth = require('../../../middleware/auth')
const { check, validationResult } = require('express-validator')
// get FIR and users model
const FIR = require('../../../models/users/FIR')
const User = require('../../../models/users/Users')


// @route          GET /api/fir
// description     file fir
//access           private

router.post('/:id', async (req, res) => {
    
    try {
        //get the user who file fir
       const user = await User.findById(req.params.id).select('-password')

        //get fir data 
        const { 
            firstName,
            lastName,
            phone,
            email,
            CNIC,
            gender,
            policeStation ,
            investigationteam ,
            address, 
            state,
            province,
            zipPostalCode,
            description,
            subject,
            status,
            firAgainst,
            ReportType,
            ReportedDate, 
            FIRID,

              date 
             city crimeType,location ,description,ReportedDate,caseID,ReportType
        } = req.body
        
        //post model 
        const newFir = new FIR({
            firstName,
            lastName,
            phone,
            email,
            CNIC,
            gender,
            address,
            policestation,
            state,
            province,
            zipPosta,
            description,
            subject,
            firAgainst,
            user: req.params.id
        })

        const fir = await newFir.save()
        res.json({msg:'your fir is submitted'})

    } catch (err) {
        res.status(500).send('server error')
        console.log(err.message)
    }
})

// @route          GET /api/fir
// description     get all fir
//access           public

router.get('/all', async (req, res) => {
    try {
        const firs = await FIR.find().sort({ date: -1 })
        res.json(firs)
    } catch (err) {
        res.status(500).send('server error')
        console.log(err.message)
    }
})

// @route          GET /api/fir:id
// description     get fir by id
//access           private

router.get('/:id', async (req, res) => {
    try {
        const fir = await FIR.findById(req.params.id)
        //check if any fir is present or not
        if (!fir) {
            return res.status(404).json({msg: 'fir not found'})
        }
        res.json(fir)
    } catch (err) {
        if (err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'fir not found'})
        }
        res.status(500).send('server error')
        console.log(err.message)
    }
})

// @route          GET /api/fir:id
// description     get fir of single user
//access           private

router.get('/', auth,  async (req, res) => {
    try {
        const fir = await FIR.find({ user: req.user.id })
        //check if any fir is present or not
        if (!fir) {
            return res.status(404).json({msg: 'fir not found'})
        }
        res.json(fir)
    } catch (err) {
        if (err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'fir not found'})
        }
        res.status(500).send('server error')
        console.log(err.message)
    }
})

// @route          POST /api/fir
// description     delete fir
//access           public

router.delete('/:id', async (req, res) => {
    try {
        const fir = await FIR.findOneAndRemove(req.params.id)
        res.json('fir deleted')
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})


module.exports = router