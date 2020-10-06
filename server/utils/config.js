require('dotenv').config()

let MONGO_URI = process.env.MONGO_URI
let MONGO_DEV_URI = process.env.MONGO_DEV_URI
let S3_BUCKET = process.env.S3_BUCKET
let AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
let AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
module.exports ={
    MONGO_URI,
    MONGO_DEV_URI,
    S3_BUCKET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
}