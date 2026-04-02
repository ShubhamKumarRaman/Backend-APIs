import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId,
    orderItems: any[],
    totalPrice: number,
    isPaid: boolean
}

const orderSchema = new mongoose.Schema<IOrder>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        orderItems: [],
        totalPrice: Number,
        isPaid: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

export default mongoose.model<IOrder>("Order", orderSchema);