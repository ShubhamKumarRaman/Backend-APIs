const Task = require('../models/Task')

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const task = await Task.create({
            title,
            description,
            user: req.user.id
        })

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getTasks = async (req, res) => {
    try {
        const { status } = req.query;

        let filter = { user: req.user.id }

        if (status) {
            filter.status = status;
        }

        const tasks = await Task.find(filter);

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "task not found"
            })
        }

        res.json(task);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({
            message: "Task deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}