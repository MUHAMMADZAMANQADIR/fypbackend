const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CrimeReportedScehema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    policeStation: {
        type: Schema.Types.ObjectId,
        ref: 'policeStations'
    },
    investigationteam: {
        type: Schema.Types.ObjectId,
        ref: 'investigationTeams'
    },
    ReportType:{
       type: String,
       default: 'CRIME REPORT',
    },
    caseID:{
      type: String,
      required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },
    CNIC: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    policeStation: {
        type: String,
        required: true
    },
    crimeType: {
        type: String,
        required: true
    },
    state: {
        type: String
    },
    province: {
        type: String
    },
    date: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ReportedDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = CrimeReported = mongoose.model('crimeReported', CrimeReportedScehema)