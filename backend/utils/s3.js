const aws = require('aws-sdk')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION
})

// uplaods files to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: uuidv4()
  }

  return s3.upload(uploadParams).promise()
}

// downloads a file from s3 by key
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME
  }

  return s3.getObject(downloadParams).createReadStream()
}


module.exports = { s3: s3, uploadFile: uploadFile, getFileStream: getFileStream }
