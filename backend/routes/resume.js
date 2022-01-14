const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const upload = multer({ storage: multer.diskStorage({}) })

const { s3, uploadFile } = require("../utils/s3.js")
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

router.get('/:field', async (req, res) => {
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
  const { title, description } = req.body
  try {
    const awsRes = await uploadFile(req.file)

    // create new resume
    let resume = new Resume({
      title: title,
      description: description,
      file: awsRes.Location,
      awsKey: awsRes.Key
    })

    await resume.save()
    res.status(201).send(resume)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

router.put('/:id', upload.single("file"), async (req, res) => {
  const { title, description } = req.body
  const { id } = req.params
  try {
    console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`)
    }

    let resume = {}
    if (req.file) {
      // find S3 key to delete old file
      const { awsKey } = await Resume.findById(id)

      // delete file from aws
      const params = { Bucket: process.env.AWS_BUCKET_NAME, Key: awsKey }
      await s3.deleteObject(params).promise()

      // upload new file to aws
      const awsRes = await uploadFile(req.file)

      // update resume in the database
      resume = await Resume.findByIdAndUpdate(id, { 
        title: title,
        description: description,
        file: awsRes.Location,
        awsKey: awsRes.Key
      })
    } else {
      // update the resume in the database
      resume = await Resume.findByIdAndUpdate(id, { 
        title: title,
        description: description
      })
    }
    
    await resume.save()
    res.status(200).send(resume)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`)
    }

    // find resume by id and delete it
    const resume = await Resume.findByIdAndDelete(id)

    // delete file from aws
    const params = { Bucket: process.env.AWS_BUCKET_NAME, Key: resume.awsKey }
    await s3.deleteObject(params).promise()

    res.status(200).send(resume)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

module.exports = router
