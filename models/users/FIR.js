const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FIRSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    caseID:{
        type: String,
        required: true,
    },
    ReportType:{
       type: String,
       default: 'FIR',
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
    gender: {
        type: String
    },
    crimeType:{
        type: String
    },
    policeStation: {
         type: String
    },
    investigationteam: {
        type: Schema.Types.ObjectId,
        ref: 'investigationTeams'
    },
    address: {
        type: String,
    },
    state: {
        type: String
    },
    province: {
        type: String
    },
    zipPostalCode: {
        type: String
    },
    subject: {
        type: String,
    },
    city: {
        type: String,
    },
    firAgainst: {
        firstName: String,
        lastName: String,
        gender: String,
        address: String,
        state: String,
        province: String,
    },
    status:{
       type: String,
       default: 'In Progress',
    },
    description: {
        type: String
    },
    ReportedDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = FIR = mongoose.model('fir', FIRSchema)