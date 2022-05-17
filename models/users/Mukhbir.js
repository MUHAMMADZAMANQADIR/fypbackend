const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MukhbirSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    policeStation: {
        type: String,
        required: true
    },
    caseID:{
      type: String,
      required: true,
    },
    date: {
        type: String,
        required: true
    },
    ReportType:{
       type: String,
       default: 'Mukhbir',
    },
    location: {
        type: String,
        // required: true
    },
    policeStation: {
        type: String,
        required: true
    },
    investigationteam: {
        type: Schema.Types.ObjectId,
        ref: 'investigationTeams'
    },
    status:{
       type: String,
       default: 'In Progress',
    },
    ReportedDate: {
        type: Date,
        default: Date.now()
    },
})

module.exports = Mukhbir = mongoose.model('mukhbir', MukhbirSchema)