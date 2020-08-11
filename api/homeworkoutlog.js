const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const db = require('../config/db');
const { ObjectId } = require('mongodb');
const moment = require('moment');

//@route POST api/homeworkoutlog
//@desc Insert workoutlog for a particular exercise
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('date', 'Date is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { userId, category, name, date, weight, count, time } = req.body;
        try {
            let workoutlog = {
                'userId': userId,
                'category': category,
                'name': name,
                'date': new Date(date),
                'weight': weight,
                'count': count,
                'time': time
            };
            await db.getDb().collection('homeworkoutlogs').insertOne(workoutlog);
            res.send('HomeWorkoutlog added!');
        }
        catch (err) {
            console.log(err);
        }
    }
)

//@route GET api/homeworkoutlog/:category/:name
//@desc Get logs for an exercise
router.post('/log',
    async (req, res) => {
        try {
            const { userId, category, name } = req.body;
            let exerciselogs = await db.getDb().collection(`homeworkoutlogs`)
                .find({ userId: userId, name: name }).sort({ date: -1 }).toArray();
            res.json(exerciselogs);
        }
        catch (err) {
            console.log(err);
        }
    }
)

//@route GET api/homeworkoutlog/logsWeek
//@desc Get logs of all exercises for a week
router.post('/logsWeek',
    async (req, res) => {
        try {
            const { userId } = req.body;
            let start = new Date(moment().subtract(7, 'days').startOf('day'));
            let end = new Date(moment().subtract(1, 'days').endOf('day'));
            let logs = await db.getDb().collection('homeworkoutlogs')
                .find({ userId, date: { $gte: start, $lt: end } }).sort({ date: -1 }).toArray();
            res.json(logs);
        }
        catch (err) {
            console.log(err);
        }
    }
);

//@route PUT api/homeworkoutlog/note
//@desc Update note for a log
router.put('/note',
    async (req, res) => {
        try {
            const { id, category, note } = req.body;
            let updateNote = await db.getDb().collection(`homeworkoutlogs`)
                .updateOne({ "_id": ObjectId(id) }, { $set: { "note": note } });
            res.json(updateNote);
        }
        catch (err) {
            console.log(err);
        }
    }
);

module.exports = router;