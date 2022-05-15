const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FIRSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    ReportType:{
       type: String,
       default: 'FIR',
    },
    name: {
        first: String,
        last: String
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
    policeStation: {
        type: Schema.Types.ObjectId,
        ref: 'policeStations'
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
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = FIR = mongoose.model('fir', FIRSchema)