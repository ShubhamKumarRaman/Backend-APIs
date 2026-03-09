const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.type.ObjectId,
        ref: "User"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Blog", blogSchema);