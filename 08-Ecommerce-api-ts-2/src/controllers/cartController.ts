import type { Response } from "express";
import Cart from "../models/Cart.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export const addToCart = async (req: AuthRequest, res: Response) => {
    const { productId, qty } = req.body;

    let cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            items: [{ product: productId, qty }]
        })
    } else {
        cart.items.push({ product: productId, qty })
        await cart.save();
    }

    res.json(cart);
}

export const getCart = async (req: AuthRequest, res: Response) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    res.json(cart);
}