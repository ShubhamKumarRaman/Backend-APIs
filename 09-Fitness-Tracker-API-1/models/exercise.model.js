const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        reuqired: true
    },
    description: String,

    defaultSets: Number,
    defaultReps: Number,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
})

module.exports = mongoose.model("Exercise", exerciseSchema);