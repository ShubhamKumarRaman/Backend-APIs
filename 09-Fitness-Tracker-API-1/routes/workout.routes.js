const express = require('express')
const router = express.Router();

const auth = require("../middleware/auth.middleware")
const workout = require("../controllers/workout.controller")

router.post('/', auth, workout.createWorkout)
router.post('/', auth, workout.getWorkouts)
router.patch('/:workoutId/:exerciseId', auth, workout.updateExercise)
router.patch('/notes/:workoutId/:exerciseId', auth, workout.addNotes);

module.exports = router;