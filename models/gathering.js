const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attendeesSchema = new Schema({
  name: String,
  instagram: String,
  snapchat: String,
}, { timestamps: true })

const gatheringSchema = new Schema({
  attendees: [
    attendeesSchema
  ]
}, { timestamps: true })

const Gathering = mongoose.model('Gathering', gatheringSchema)
module.exports = Gathering