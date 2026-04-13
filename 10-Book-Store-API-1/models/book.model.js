const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        genre: String,
        description: String,
        price: Number,
        image: String,
    },
    { timestamps: true }
)

module.exports = mongoose.model("Book", bookSchema);