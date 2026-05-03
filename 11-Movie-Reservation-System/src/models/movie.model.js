import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            index: true
        },
        description: String,
        duration: {
            type: Number,
            required: true,
        },
        genre: {
            type: [String],
            index: true
        },
        cast: [String],
        language: {
            type: String,
            index: true
        },
        releasedDate: Date,
        poster: String,
        isActive: {
            type: Boolean,
            default: true
        }
    }, { timestamps: true }
)

movieSchema.index({
    title: 'text',
    genre: 'text',
    cast: 'text'
})

export default mongoose.model("Movie", movieSchema);