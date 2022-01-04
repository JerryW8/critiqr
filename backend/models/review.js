const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  text: {
    type: String,
    minLength: 10,
    required: true
  },
}, {
  timestamps: true
})

module.exports = mongoose.model("Review", reviewSchema)
