const mongoose = require('mongoose')
const Schema = mongoose.Schema

const updatedCrimeReportschema = new Schema({
    Repoterid: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }, 
   ReportType:{
       type: String,
       default: 'CRIME REPORT',
    },
    investigationteam: {
        type: Schema.Types.ObjectId,
        ref: 'investigationTeams'
    },
    caseID: {
        type: Schema.Types.ObjectId,
        ref: 'crimeReported'
    },
    Bayans:[{
      PersonName: String,
      BayanofPerson: String,
    }    
    ],
    detailedDescription:{
        type: String,
    },
    closingdate: {
        type: String,
         
    },
    FinalRemarks:{
        type: String,
         
    },
   
  
     
})

module.exports = updatedcrimeReported = mongoose.model('updatedcrimeReported', updatedCrimeReportschema)