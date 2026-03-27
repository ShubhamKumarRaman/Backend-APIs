const Poll = require('../models/Poll')

//Create Poll
exports.createPoll = async (req, res) => {
    try {
        const { question, options } = req.body;

        const poll = await Poll.create({
            question,
            options: options.map(opt => ({ text: opt }))
        })

        res.status(201).json(poll)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//get all polls
exports.getPolls = async (req, res) => {
    try {
        const polls = await Poll.find();
        res.json(polls);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}