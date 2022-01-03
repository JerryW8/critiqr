const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResumeFileSchema = new Schema({
  url: String,
  cid: String
})

const ResumeSchema = new Schema ({
  title: {
    type: String,
    minLength: 3,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  jobType: {
    type: Number,
    required: true
  },
  field: {
    type: Number,
    required: true
  },
  file: ResumeFileSchema
}, {
  timestamps: true
})

module.exports = mongoose.model("Resume", ResumeSchema)
