const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')

const InvestigationTeam = require('../../../models/investigationTeam/investigationTeam')
const CrimeReported = require('../../../models/users/CrimeReported')
const FIR = require('../../../models/users/FIR')
const User = require('../../../models/users/Users')
const Mukhbir = require('../../../models/users/Mukhbir')
const PoliceStation = require('../../../models/policeStation/PoliceStation')

//to count investigation team
router.get('/countinvestigationteam', async (req, res) => {
    try {
        const investigationTeams = await InvestigationTeam.find().count()
        res.json(investigationTeams)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})
//to count PoliceStation team
router.get('/countPoliceStation', async (req, res) => {
    try {
        const investigationTeams = await PoliceStation.find().count()
        res.json(investigationTeams)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})


//to count PoliceStation team
router.get('/countUnderInvestigation', async (req, res) => {
    try {
        const investigationTeams = await InvestigationTeam.find( )
        let count=0
        investigationTeams.map((num)=>
              count =count + num.UnderInvestigation
        );
        res.json(count)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

//to count PoliceStation team
router.get('/countTotalAssigncase', async (req, res) => {
    try {
        const investigationTeams = await InvestigationTeam.find( )
        let count=0
        investigationTeams.map((num)=>
              count =count + num.TotalAssigncase
        );
        res.json(count)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

//To get all Cases
let allasinged=[]
router.get('/policeassinged', async (req, res) => {
    const { policeStation } = req.body
    try {
        const firs = await FIR.find( ).sort({ ReportedDate: -1 })
        allasinged.push(firs)
        const Reportedcrimes = await CrimeReported.find( ).sort({ ReportedDate: -1 })
        allasinged.push(Reportedcrimes)
        const  Mukhbirs = await Mukhbir.find( ).sort({ ReportedDate: -1 })
        allasinged.push(Mukhbirs)
        let loacakcaselist =[]
      
        res.json(allasinged)
        allasinged.splice(0, allasinged.length)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})


router.get('/allinvestigationteams', async (req, res) => {
     
    try {
         
        const investigationTeams = await InvestigationTeam.find()
         
        res.json(investigationTeams)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

module.exports = router