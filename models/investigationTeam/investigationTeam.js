const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvestigationTeamSchema = new Schema({
    PoliceStation: {
        type: Schema.Types.ObjectId,
        ref: 'policestations',
        default: '61b6437dda9915f4d7f69097',
    },
    PoliceStationID: {
        type: String,
        required: true
    },
    TeamLeadCNIC: {
        type: String,
        required: true
    },
    PoliceStationLocation: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone:{
        type: String,
        required: true
    },
    Address:{
        type: String,
        required: true
    },
    TeamName: {
        type: String,
        required: true
    },
    LeaderName:{
        type: String,
        required: true
    },
    TotalAssigncase:{
        type: Number,
        required: true,
        default: 0,
    },
    TotalResolvedcase:{
        type: Number,
        required: true,
        default: 0,
    },
    UnderInvestigation:{
        type: Number,
        required: true,
        default: 0,
    },
    Password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = InvestigationTeam = mongoose.model('investigationTeams', InvestigationTeamSchema)