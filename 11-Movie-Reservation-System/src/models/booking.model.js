import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        showId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Show",
            required: true,
            index: true,
        },
        seats: {
            type: [String],
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        bookingStatus: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending',
            index: true
        },
        paymentId: {
            type: String,
        }
    }, { timestamps: true }
)

bookingSchema.index(
    { showId: 1, seats: 1, bookingStatus: 1 }
)

export default mongoose.model('Booking', bookingSchema);