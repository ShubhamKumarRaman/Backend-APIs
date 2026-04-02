const Workout = require("../models/workout.model")

//Create Workout
exports.createWorkout = async (req, res) => {
    try {
        const workout = await Workout.create({
            user: req.user,
            date: req.body.date,
            exercises: req.body.exercises
        })

        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//get workouts(sorted by date)
exports.getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user })
            .sort({ date: 1 })
            .populate("exercises.exerciseId");

        res.json(workouts);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//Toggle exercise completion
exports.updateExercise = async (req, res) => {
    try {
        const { workoutId, exerciseId } = req.params;

        const workout = await Workout.findById(workoutId);

        const exercise = workout.exercises.id(exerciseId);

        exercise.completed = !exercise.completed;

        //update workout status
        workout.status = workout.exercises.every(e => e.completed)
            ? "completed"
            : "pending";

        await workout.save();

        res.json(workout);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//Add notes
exports.addNotes = async (req, res) => {
    try {
        const { workoutId, exerciseId } = req.params;

        const workout = await Workout.findById(workoutId);

        const exercise = workout.exercises.id(exerciseId);

        exercise.notes = req.body.notes;

        await workout.save();
        res.json(workout);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}