const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: String,
    },
    quantity: {
        type: String,
    },
    create: {
        type: Date,
        default: Date.now
    }
   
})

const Products = mongoose.model('Products', productSchema)
module.exports = Products