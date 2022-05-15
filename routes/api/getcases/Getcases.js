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

router.get('/allAssignedcases', async (req, res) => {
    try {
        
        const investigationTeams = await InvestigationTeam.find()
        res.json(investigationTeams)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})