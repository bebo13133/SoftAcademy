const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        // match: [/^https?:\/\/.+/, 'ImageUrl is not valid!'],
    },
})

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = { Quote }