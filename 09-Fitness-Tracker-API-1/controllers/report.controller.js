const Workout = require('../models/workout.model')

exports.getReport = async (req, res) => {
    try {
        const { start, end } = req.query;

        const workouts = await Workout.find({
            user: req.user,
            date: {
                $gte: new Date(start),
                $lte: new Date(end)
            }
        })

        const total = workouts.length;

        const completed = workouts.filter(
            w => w.status === "completed"
        ).length;

        const percentage = total === 0
            ? 0
            : (completed / total) * 100;

        res.json({
            total,
            completed,
            percentage
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}