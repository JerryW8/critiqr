const express = require('express')
const router = express.Router({ mergeParams: true })
const Resume = require('../models/resume.js')
const Review = require('../models/review.js')

router.post('/', async (req, res) => {
  try {
    // get resume the review belongs to
    const resume = await Resume.findById(req.params.id).populate('reviews')

    // create new review
    const review = new Review(req.body)
    console.log(resume)
    // add new review to list of reviews
    resume.reviews.push(review)

    // save new documents
    await review.save()
    await resume.save()

    res.status(201).send(resume)
  } catch(e) {
    res.status(400).send(e.message)
  }
})

router.delete('/:reviewId', async (req, res) => {
  const resume = await Resume.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewId }})
  await Review.findByIdAndDelete(req.params.reviewId)
  res.status(200).send(resume)
})

module.exports = router
