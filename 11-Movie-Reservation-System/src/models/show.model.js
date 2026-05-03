import mongoose from "mongoose";
import { startTimer } from "winston";

const showSchema = new mongoose.Schema(
    {
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
            required: true,
            index: true
        },
        theaterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Theater',
            required: true,
            index: true,
        },
        screenId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Screen',
            required: true,
            index: true,
        },
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        },
        ticketPrice: {
            silver: Number,
            gold: Number,
            platinum: Number,
        }
    }, { timestamps: true }
)

showSchema.index(
    { screenId: 1, startTime: 1, endTime: 1 },
    { unique: false }
);

export default mongoose.model("Show", showSchema);