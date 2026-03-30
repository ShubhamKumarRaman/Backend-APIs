const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    countInStock: Number,
    image: String,
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);