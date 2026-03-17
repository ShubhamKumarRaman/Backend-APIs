const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        markdown: {
            type: String,
            required: true
        },
        html: {
            type: String,
        },
        attachments: [
            {
                filename: String,
                path: String
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Note", noteSchema);