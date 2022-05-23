const mongoose = require('mongoose')
const Schema = mongoose.Schema
const NotificationSchema = new mongoose.Schema({
    Subject: {
        type: String,
    },
    CaseID: {
        type: String,
    },
    CNIC : {
        type: String,
    },
    investigationteam: {
        type: Schema.Types.ObjectId,
        ref: 'investigationTeams'
    },
    StartTime : {
        type: String,
         
    },
    EndTime: {
        type: String,
    },
    Description : {
        type: String,
    },
    NotificationBody : {
        type: String,
        default: "Your next meeting ID is This"
    },
    CallID: {
        type: String,
    },
    SendDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = notification = mongoose.model('notification', NotificationSchema )