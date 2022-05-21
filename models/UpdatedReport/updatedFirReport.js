const mongoose = require('mongoose')
const Schema = mongoose.Schema

const updatedFIRReportschema = new Schema({
    Repoterid: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }, 
   ReportType:{
       type: String,
       default: 'FIR',
    },
    investigationteam: {
        type: Schema.Types.ObjectId,
        ref: 'investigationTeams'
    },
    caseID: {
        type: Schema.Types.ObjectId,
        ref: 'fir'
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

module.exports = updatedfir = mongoose.model('updatedfir', updatedFIRReportschema)