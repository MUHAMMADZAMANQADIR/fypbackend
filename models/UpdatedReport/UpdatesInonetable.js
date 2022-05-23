const mongoose = require('mongoose')
const Schema = mongoose.Schema

const updatedReportschema = new Schema({
    Repoterid: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }, 
    ReportType:{
       type: String,

    },
    investigationteam: {
        type: Schema.Types.ObjectId,
        ref: 'investigationTeams'
    },
    caseID: {
        type: String,
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
    Files: [{ }]
     
})

module.exports = updatedReport = mongoose.model('updatedReport', updatedReportschema)