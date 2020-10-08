const dailyRouter = require('express').Router()
const Daily = require('../models/daily')
// const logger = require('../utils/logger')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const config = require('../utils/config')
const path = require('path')


// configure the keys for accessing AWS
AWS.config.update({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
})
const s3 = new AWS.S3()
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.S3_BUCKET,
        // Set public read permissions
        acl: 'public-read',
        // Auto detect contet type
        contentType: multerS3.AUTO_CONTENT_TYPE,
        // Set key/ filename as original uploaded name
        key: function (req, file, cb) {
            cb(null, `bodepotUpload-${Date.now()}${path.extname(file.originalname)}`)
        }
    })
})


dailyRouter.get('/', async (req, res) => {
    const dailys = await Daily.find({})
    res.json(dailys.map(d => d.toJSON()))
})

dailyRouter.post('/', upload.single('file'), async (req, res, next) => {
    console.log('do we even get here?')
    const s3url = req.file ? req.file.location : ''
    const body = req.body
    const weight = Number(body.weight)
    if (typeof (weight) !== 'number') {
        res.status(400).json({ 'error': 'Weight must be a number' })
        return
    }
    const date = new Date()
    // let randomNumber = Math.floor(Math.random() * 90)
    // date.setDate(date.getDate() - randomNumber)
    const formattedDate = Number(date.getTime())

    const daily = new Daily({
        Weight: weight,
        Date: formattedDate,
        s3url: s3url
    })

    console.log(daily)

    const result = await daily.save()

    res.status(201).json(result.toJSON())

})

module.exports = dailyRouter
