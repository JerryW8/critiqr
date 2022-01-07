const express = require('express')
const router = express.Router()
const cloudinary = require("../utils/cloudinary")
const mongoose = require('mongoose')
const upload = require("../utils/multer")
const Resume = require('../models/resume.js')

router.get('/', async (req, res) => {
  try {
    let resumes = []
    if (req.query.q) {
      resumes = await Resume.find({ $text: { $search: req.query.q } })
    } else {
      resumes = await Resume.find()
    }
    res.status(200).send(resumes)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

router.get('/field/:field', async (req, res) => {
  const { field } = req.params
  try {
    const resumes = await Resume.find({ field: field })
    res.status(200).send(resumes)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const resume = await Resume.findById(id).populate('reviews')
    res.status(200).send(resume)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

router.post('/', upload.single("file"), async (req, res) => {
  try {
    // upload resume file to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path)

    // create new file
    let resumeFile = {url: result.secure_url, cid: result.public_id}

    // create new resume
    let resume = new Resume(req.body)
    resume.file = resumeFile

    await resume.save()
    res.status(201).send(resume)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

router.put('/:id', upload.single("file"), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send(`No post with id: ${req.params.id}`)
    }

    // get resume to be deleted
    const resume = await Resume.findByIdAndUpdate(req.params.id, { ...req.body })

    // if there is a file, update the file
    if (req.file) {
      // delete image from cloudinary
      await cloudinary.uploader.destroy(resume.file.cid)

      // upload new image to cloudinary
      let result = await cloudinary.uploader.upload(req.file.path)

      await Resume.findByIdAndUpdate(req.params.id, { file: { url: result.secure_url, cid: result.public_id } })
    }
    
    await resume.save()
    res.status(200).send(resume)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params.id
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`)
    }

    // find resume by id and delete it
    const resume = await Resume.findByIdAndDelete(id)

    // delete resume from cloudinary
    await cloudinary.uploader.destroy(resume.file.cid)

    res.status(200).send(resume)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

module.exports = router
