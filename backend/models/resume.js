const mongoose = require('mongoose')
const Review = require('./review')
const Schema = mongoose.Schema

const ResumeFileSchema = new Schema({
  url: String,
  cid: String
})

const ResumeSchema = new Schema ({
  title: String,
  // {
  //   type: String,
  //   minLength: 3,
  //   required: true
  // },
  description: String,
  // {
  //   type: String,
  //   default: ''
  // },
  field: Number,
  // {
  //   type: Number,
  //   required: true
  // },
  file: ResumeFileSchema,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
}, {
  timestamps: true
})

ResumeSchema.post('findByIdAndDelete', async function(doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
})

module.exports = mongoose.model("Resume", ResumeSchema)
