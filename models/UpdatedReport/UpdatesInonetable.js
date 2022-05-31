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
      Name: String,
      Bayan: String,
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
    IFiles: [{url: String}],
    VFiles: [{url: String}],
     
})

module.exports = updatedReport = mongoose.model('updatedReport', updatedReportschema)