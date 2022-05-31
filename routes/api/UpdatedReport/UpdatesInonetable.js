const express = require('express')
const router = express.Router()
const multer = require('multer')
const GridFsStorage= require('multer-gridfs-storage');
const auth = require('../../../middleware/auth')
const path = require('path')

const CrimeReported = require('../../../models/users/CrimeReported')
const FIR = require('../../../models/users/FIR')
const User = require('../../../models/users/Users')
const Mukhbir = require('../../../models/users/Mukhbir')
const InvestigationTeam = require('../../../models/investigationTeam/investigationTeam')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log(1)
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    console.log(2)
    cb(null,  file.fieldname + '_' + Date.now() 
          + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  console.log(3)
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'  ||file.mimetype === "video/mp4" ) {
    cb(null, true);
  } else {
    cb(new Error('Wrong file type'));
  }
};

const upload = multer({
   
  storage: storage,
  limits: {
    fileSize: 100000000  
  },
  fileFilter: fileFilter
});


const updatedReport = require('../../../models/UpdatedReport/UpdatesInonetable');
const { request } = require('http');


//post updatedReported using updated investigationid 
router.post('/updatedReport/:id' ,  async (req, res) => {
 try {
        
        console.log("-------------", req.body)
        const { Bayans,Repoterid,IFiles,VFiles,caseID, detailedDescription,closingdate, FinalRemarks ,ReportType} =req.body
        //mukhbir model 
        console.log(5)
        let  updateorpost=  await updatedReport.findOne({caseID:caseID})
        console.log(6)
        if(updateorpost){
        console.log(7)
         const newData = {}
        if (Bayans) { 
              newData.Bayans = Bayans}
        if (detailedDescription){
             newData.detailedDescription = detailedDescription
            }
        if(FinalRemarks){
          newData.FinalRemarks = FinalRemarks
        }
        if(closingdate){
          newData.closingdate = closingdate
        }    
        if(IFiles){
            newData.IFiles = IFiles
        } 
        if(VFiles){
          newData.VFiles = VFiles
        }  
        if (caseID){
             newData.caseID = caseID
            }
         const user = await updatedReport.findOneAndUpdate(
                { caseID:caseID },
                { $set: newData },
                { new: true }
               
                )
            
            return res.json(user)

        }
        else{
            console.log(8)
            const newcrimeReported  = new updatedReport({
            Bayans, Repoterid, caseID, detailedDescription,closingdate, FinalRemarks,ReportType,
            investigationteam: req.params.id,  IFiles, VFiles
        })
        const crimeReported = await newcrimeReported.save()
        res.json(crimeReported)
        }
       

        
        
    } catch (err) {
        console.log(9)
        res.status(500).send('server error')
        console.log(err.message)
    }
})


//get  updated using updated case id 
router.get('/updatedReport', async (req, res) => {
    try {
        const updatedReported = await updatedfir.find()
        res.json(updatedReported)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})
router.post('/updatecase/:id', async (req, res) => {
    
    console.log("body 2" ,req.body)

    const {status ,ReportType, caseID} = req.body
    
    console.log(req.params.id)
    const newd={}
    let investigationTeam = await InvestigationTeam.findById(req.params.id)
    console.log("investigationTeam" , investigationTeam)
     if(investigationTeam){
          newd.TotalResolvedcase= investigationTeam.TotalResolvedcase+1
          newd.UnderInvestigation= investigationTeam.UnderInvestigation-1
     }
    await InvestigationTeam.findOneAndUpdate(
                { _id: req.params.id},
                { $set: newd },
                { new: true })
    //Build new data
    const newData = {}
    if (status) newData.status = status
    if(ReportType=="CRIME REPORT"){
    try {
            console.log("CRIME REPORT")
            const user = await CrimeReported.findOneAndUpdate(
                {_id:caseID},
                { $set: newData },
                { new: true })
            console.log("CRIME REPOR")
            return res.json(user)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }}
    if(ReportType=="Mukhbir"){
    try {
            console.log("Mukhbir")
            const user = await Mukhbir.findOneAndUpdate(
                { _id: caseID },
                { $set: newData },
                { new: true })
            
            return res.json(user)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }}
    if(ReportType=="FIR"){
    try {
      console.log("Fir")       
      const user = await FIR.findOneAndUpdate(
                { _id: caseID},
                { $set: newData },
                { new: true })
            
            return res.json(user)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }}
})

module.exports = router
