const Order = require('../models/Order')
const stripe = require('../config/stripe')

exports.getOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
}

exports.createOrder = async (req, res) => {
    const { items, amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "inr",
    })

    const order = await Order.create({
        user: req.user._id,
        orderItems: items,
        totalPrice: amount,
        isPaid: true
    })

    res.json({
        order,
        clientSecret: paymentIntent.client_secret
    })
}