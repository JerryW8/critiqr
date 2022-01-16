const mongoose = require('mongoose')
const Review = require('./review')
const Schema = mongoose.Schema

const ResumeSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  key: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
}, {
  timestamps: true
})

ResumeSchema.index({ title: "text" })

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
