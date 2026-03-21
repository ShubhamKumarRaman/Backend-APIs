const mongoose = require('mongoose')

const versionSchema = new mongoose.Schema({
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
    },
    markdown: String,

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Version", versionSchema);