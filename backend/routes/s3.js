import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import s3 from 'aws-sdk/clients/s3.js';

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

//s3 instance
const S3 = new s3({
  region,
  accessKeyId,
  secretAccessKey,
})

//uploads files to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  }

  return S3.upload(uploadParams).promise()
}


//downloads a file from s3
function getFileStream(fileKey) {
  const downloadedParams = {
    Key: fileKey,
    Bucket: bucketName,
  }

  return S3.getObject(downloadedParams).createReadStream()
}



export {
  uploadFile,
  getFileStream
};