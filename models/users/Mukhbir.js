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
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        // required: true
    },
    policeStation: {
        type: String,
        required: true
    },
    policeStation: {
        type: Schema.Types.ObjectId,
        ref: 'policeStations'
    },
    investigationteam: {
        type: Schema.Types.ObjectId,
        ref: 'investigationTeams'
    },
})

module.exports = Mukhbir = mongoose.model('mukhbir', MukhbirSchema)