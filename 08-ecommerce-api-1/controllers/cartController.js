const Cart = require('../models/Cart')

exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
        return res.json({ items: [] });
    }
    res.json(cart);
}

exports.addToCart = async (req, res) => {
    const { productId, qty } = req.body;

    let cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            items: [{ product: productId, qty }]
        })
    } else {
        const existItem = cart.items.find(item => item.product.toString() === productId);
        if (existItem) {
            existItem.qty = qty;
        } else {
            cart.items.push({ product: productId, qty })
        }
        await cart.save();
    }

    res.json(cart);
}

exports.removeFromCart = async (req, res) => {
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
        cart.items = cart.items.filter(item => item.product.toString() !== req.params.id);
        await cart.save();
    }
    res.json(cart);
}