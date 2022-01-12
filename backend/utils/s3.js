import { v4 as uuidv4 } from 'uuid'
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION
})

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    contenttype: '.pdf',
    key: function(req, file, cb) {
      cb(null, uuidv4())
    }
  })
})

module.exports = { upload: upload, s3: s3 }
