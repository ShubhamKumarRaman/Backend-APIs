const User = require('../models/user.models')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/jwt')

exports.register = async (data) => {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await User.create({ ...data, password: hashed })
    return user;
}

exports.login = async (data) => {
    const user = await User.findOne({ email: data.email })
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials')
    }

    const token = generateToken({ id: user._id })
    return { user, token };
}