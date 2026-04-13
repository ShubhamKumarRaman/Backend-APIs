const authService = require('../services/auth.service')

exports.register = async (req, res) => {
    const user = await authService.register(req.body);
    res.json(user);
}

exports.login = async (req, res) => {
    try {
        const data = await authService.login(req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}