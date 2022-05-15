const mongoose = require('mongoose')

const PoliceStationSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    PoliceStationname: {
        type: String,
        required: true,
         
    },
    City: {
        type: String,
        required: true
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

module.exports = PoliceStation = mongoose.model('policeStations', PoliceStationSchema)