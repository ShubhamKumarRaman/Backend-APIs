const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    exercises: [
        {
            exerciseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exercise"
            },
            sets: Number,
            reps: Number,

            completed: {
                type: Boolean,
                default: false
            }
        }
    ],
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    }
}, { timestamps: true })

module.exports = mongoose.model("Workout", workoutSchema);