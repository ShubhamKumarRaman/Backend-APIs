import type { Response } from "express";
import Order from "../models/Order.js";
import stripe from "../config/stripe.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export const createOrder = async (req: AuthRequest, res: Response) => {
    const { items, amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "inr"
    })

    const order = await Order.create({
        user: req.user._id,
        orderItems: items,
        totalPrice: amount,
        isPaid: true,
    });

    res.json(
        {
            order,
            clientSecret: paymentIntent.client_secret
        }
    )
}