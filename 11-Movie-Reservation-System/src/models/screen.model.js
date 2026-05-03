import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
    {
        setNumber: String,
        row: String,
        column: Number,
        type: {
            type: String,
            enum: ['silver', 'gold', 'platinum'],
            required: true
        }
    },
    { _id: false }
)

const screenSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        theaterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Theater',
            required: true,
            index: true
        },
        totalSeats: Number,

        seats: [seatSchema]
    }, { timestamps: true }
)

export default mongoose.model('Screen', screenSchema);