const express = require('express')
const router = express.Router()
const multer = require('multer')
const GridFsStorage= require('multer-gridfs-storage');
const auth = require('../../../middleware/auth')
const path = require('path')

const updatedmukhbir = require('../../../models/UpdatedReport/updatedmukhbirReport')
const updatedfir=require('../../../models/UpdatedReport/updatedFirReport')
const updatedcrimeReported=require('../../../models/UpdatedReport/updatedCRIMEREPORT')


//post updatedmukhbir using updated investigationid 
router.post('/updatedmukhbir/:id' ,  async (req, res) => {
    try {
         
        const { Bayans,Repoterid, caseID, detailedDescription,closingdate, FinalRemarks ,ReportType} =req.body
        //mukhbir model 
        
        let  updateorpost=  await updatedmukhbir.findOne({caseID:caseID})
        if(updateorpost){
         const newData = {}
         if (Bayans) { 
              newData.Bayans = Bayans}
         if (detailedDescription){
             newData.detailedDescription = detailedDescription
            }

         const user = await updatedmukhbir.findOneAndUpdate(
                { caseID:caseID },
                { $set: newData },
                { new: true })
            
            return res.json(user)

        }
        else{
            const newMukhbir = new updatedmukhbir({
            Bayans, Repoterid, caseID, detailedDescription,closingdate, FinalRemarks,ReportType,
            investigationteam: req.params.id

        })
        const mukhbir = await newMukhbir.save()
        res.json(mukhbir)
        }
       

        
        
    } catch (err) {
        res.status(500).send('server error')
        console.log(err.message)
    }
}

)
//post updatedFIR using updated investigationid 
router.post('/updatedFIR/:id' ,  async (req, res) => {
 try {
        const { Bayans,Repoterid, caseID, detailedDescription,closingdate, FinalRemarks ,ReportType} =req.body
        //mukhbir model 
        
        let  updateorpost=  await updatedfir.findOne({caseID:caseID})
        if(updateorpost){
         const newData = {}
        if (Bayans) { 
              newData.Bayans = Bayans}
        if (detailedDescription){
             newData.detailedDescription = detailedDescription
            }

         const user = await updatedfir.findOneAndUpdate(
                { caseID:caseID },
                { $set: newData },
                { new: true })
            
            return res.json(user)

        }
        else{
            const newfir = new updatedfir({
            Bayans, Repoterid, caseID, detailedDescription,closingdate, FinalRemarks,ReportType,
            investigationteam: req.params.id

        })
        const fir = await newfir.save()
        res.json(fir)
        }
       

        
        
    } catch (err) {
        res.status(500).send('server error')
        console.log(err.message)
    }
}

)
//post updatedcrimeReported using updated investigationid 
router.post('/updatedcrimeReported/:id' ,  async (req, res) => {
 try {
        const { Bayans,Repoterid, caseID, detailedDescription,closingdate, FinalRemarks ,ReportType} =req.body
        //mukhbir model 
        
        let  updateorpost=  await updatedcrimeReported.findOne({caseID:caseID})
        if(updateorpost){
         const newData = {}
        if (Bayans) { 
              newData.Bayans = Bayans}
        if (detailedDescription){
             newData.detailedDescription = detailedDescription
            }
        if (caseID){
             newData.caseID = caseID
            }
         const user = await updatedcrimeReported.findOneAndUpdate(
                { caseID:caseID },
                { $set: newData },
                { new: true })
            
            return res.json(user)

        }
        else{
            const newcrimeReported  = new updatedcrimeReported({
            Bayans, Repoterid, caseID, detailedDescription,closingdate, FinalRemarks,ReportType,
            investigationteam: req.params.id

        })
        const crimeReported = await newcrimeReported .save()
        res.json(crimeReported)
        }
       

        
        
    } catch (err) {
        res.status(500).send('server error')
        console.log(err.message)
    }
})
//get updatedcrimeReported using updated case id 
router.get('/updatedcrimeReported/:id', async (req, res) => {
    try {
        const updatedReported = await updatedcrimeReported.findById(req.params.id)
        res.json(updatedReported)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

//get  updatedfir using updated case id 
router.get('/updatedfir/:id', async (req, res) => {
    try {
        const updatedReported = await updatedfir.findById(req.params.id)
        res.json(updatedReported)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

//get updatedmukhbir using updated case id 
router.get('/updatedmukhbir/:id', async (req, res) => {
    try {
        const updatedReported = await updatedmukhbir.findById(req.params.id)
        res.json(updatedReported)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

//to get all updatedmukhbir
router.get('/updatedmukhbir', async (req, res) => {
    try {
        const updatedReported = await updatedmukhbir.find()
        res.json(updatedReported)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

//get updatedcrimeReported using updated case id 
router.get('/updatedcrimeReported/', async (req, res) => {
    try {
        const updatedReported = await updatedcrimeReported.find()
        res.json(updatedReported)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})
//get  updatedfir using updated case id 
router.get('/updatedfir', async (req, res) => {
    try {
        const updatedReported = await updatedfir.find()
        res.json(updatedReported)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

module.exports = router