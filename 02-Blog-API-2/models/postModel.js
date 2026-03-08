const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    tags: [
        {
            type: String,
            index: true,
        },
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "published"
    },
    readTime: {
        type: Number,
    },
    views: {
        type: Number,
        default: 0,
    }
},
    { timestamps: true }

)

module.exports = mongoose.model('Post', postSchema);