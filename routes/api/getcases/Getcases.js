const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const InvestigationTeam = require('../../../models/investigationTeam/investigationTeam')
const CrimeReported = require('../../../models/users/CrimeReported')
const FIR = require('../../../models/users/FIR')
const User = require('../../../models/users/Users')
const Mukhbir = require('../../../models/users/Mukhbir')

// @route          POST  /api/to get all cases
// description     register investigation teams
//access           public
let allasinged=[]
router.get('/:id', async (req, res) => {
    try {
        const Reportedcrimes = await CrimeReported.find({investigationteam: req.params.id, status:"In Progress" })
        allasinged.push(Reportedcrimes)
        const firs = await FIR.find({investigationteam: req.params.id, status:"In Progress" })
        allasinged.push(firs)
        const  Mukhbirs = await Mukhbir.find({investigationteam: req.params.id, status:"In Progress" })
        allasinged.push(Mukhbirs)
        res.json(allasinged)
        allasinged.splice(0, allasinged.length)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

module.exports = router

//http://localhost:5000/api/investigationteams/627d7177867eb62da4c5f50e
//http://localhost:5000/api/fir/6281554b8381eb8ae3e7237e get
//http://localhost:5000/api/crimeReported/6280cd3bb5b04ae2d6c5c963 
//http://localhost:5000/api/getcases/627d7177867eb62da4c5f50e 