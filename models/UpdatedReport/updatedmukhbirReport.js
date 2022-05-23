const mongoose = require('mongoose')
const Schema = mongoose.Schema

const updatedmukhbirReportschema = new Schema({
    Repoterid: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }, 
    ReportType:{
       type: String,
       default: 'Mukhbir',
    },
    investigationteam: {
        type: Schema.Types.ObjectId,
        ref: 'investigationTeams'
    },
    caseID: {
        type: Schema.Types.ObjectId,
        ref: 'mukhbir'
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

module.exports = updatedmukhbir = mongoose.model('updatedmukhbir', updatedmukhbirReportschema)