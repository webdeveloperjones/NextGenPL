const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const dailySchema = mongoose.Schema({
    Weight: {
        type: Number,
    },
    Date: {
        type: Number,
    },
    s3url: {
        type: String,
    }
})

dailySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Daily', dailySchema)