const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  text: {
    type: String,
    minLength: 10,
    required: true
  },
  votes: {
    type: Number,
    min: 0
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Resume'
  },
}, {
  timestamps: true
})

module.exports = mongoose.model("Review", reviewSchema)
