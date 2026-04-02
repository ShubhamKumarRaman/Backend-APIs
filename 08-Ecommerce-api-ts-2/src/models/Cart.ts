import mongoose, { Document } from "mongoose";
import Product from "./Product.js";

export interface ICartItem {
    product: mongoose.Schema.Types.ObjectId,
    qty: number
}

export interface ICart extends Document {
    user: mongoose.Schema.Types.ObjectId,
    items: ICartItem[]
}

const cartSchema = new mongoose.Schema<ICart>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                qty: Number
            }
        ]
    },
    { timestamps: true }
)

export default mongoose.model<ICart>("Cart", cartSchema);