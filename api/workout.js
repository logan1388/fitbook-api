const router = require('express').Router();
const db = require('../config/db');
const { check, validationResult } = require('express-validator');
const moment = require('moment');

// @route   POST api/workout
// @desc    Insert today's workout
router.post('/',
    [
        check('userId', 'User ID is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty(),
        check('date', 'Date is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { userId, category, date } = req.body;
        try {
            let start = new Date(moment().startOf('day'));
            let end = new Date(moment().endOf('day'));
            let todayWorkout = await db.getDb().collection('workouts')
                .find({ userId, date: { $gte: start, $lt: end } }).toArray();
            let exists = false;
            for (let wo of todayWorkout) {
                if (wo.category == category) {
                    exists = true;
                    res.send('Workout already exists');
                    break;
                }
            }
            if (!exists) {
                let workout = {
                    'userId': userId,
                    'category': category,
                    'date': new Date(date)
                };
                await db.getDb().collection('workouts').insertOne(workout);
                res.send('Workout added!');
            }
        }
        catch (err) {
            console.log(err);
        }
    }
);

router.post('/workoutHistory',
    async (req, res) => {
        const userId = req.body.userId;
        try {
            let start = new Date(moment().startOf('day'));
            const workoutHistory = await db.getDb().collection('workouts')
                .find({ userId, date: { $lt: start } }).sort({ date: -1 }).toArray();
            res.json(workoutHistory);
        }
        catch (err) {
            console.log(err);
        }
    }
);

router.post('/workoutSummary',
    async (req, res) => {
        const userId = req.body.userId;
        try {
            let start = new Date(moment().startOf('day'));
            const workoutSummary = await db.getDb().collection('workouts')
                .find({ userId, date: { $gt: start } }).sort({ date: -1, category: 1 }).toArray();
            res.json(workoutSummary);
        }
        catch (err) {
            console.log(err);
        }
    }
);

module.exports = router;