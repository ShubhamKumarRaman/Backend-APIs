import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
    name: string,
    price: number,
    description: string,
    countInStock: number,
    image?: string,
}

const productSchema = new mongoose.Schema<IProduct>(
    {
        name: String,
        price: Number,
        description: String,
        countInStock: Number,
        image: String,
    }, { timestamps: true }
)

export default mongoose.model<IProduct>("Product", productSchema);