const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const db = require('../config/db');
const { ObjectId } = require('mongodb');
const moment = require('moment');

//@route POST api/workoutlog
//@desc Insert workoutlog for a particular exercise
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('date', 'Date is required').not().isEmpty(),
        check('weight', 'Weight is required').not().isEmpty(),
        check('unit', 'Unit is required').not().isEmpty(),
        check('count', 'Count is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { userId, category, name, date, weight, unit, count } = req.body;
        try {
            let workoutlog = {
                'userId': userId,
                'category': category,
                'name': name,
                'date': new Date(date),
                'weight': weight,
                'unit': unit,
                'count': count
            };
            let log;
            let woCategory = category.toLowerCase();
            log = await db.getDb().collection(`${woCategory}workoutlogs`).insertOne(workoutlog);
            workoutlog.logId = log.insertedId
            await db.getDb().collection('workoutlogs').insertOne(workoutlog);
            res.send('Workoutlog added!');
        }
        catch (err) {
            console.log(err);
        }
    }
)

//@route GET api/workoutlog/:category/:name
//@desc Get logs for an exercise
router.post('/log',
    async (req, res) => {
        try {
            const { userId, category, name } = req.body;
            let exerciselogs = await db.getDb().collection(`${category.toLowerCase()}workoutlogs`)
                .find({ userId: userId, name: name }).sort({ date: -1 }).toArray();
            const maxWeight = await db.getDb().collection('maxweights').findOne({ userId: userId, name: name });
            exerciselogs.map(logs => logs.maxWeight = maxWeight ? maxWeight.weight : '');
            res.json(exerciselogs);
        }
        catch (err) {
            console.log(err);
        }
    }
)

//@route GET api/workoutlog/logs
//@desc Get logs of all exercises
router.post('/logs',
    async (req, res) => {
        try {
            const { userId } = req.body;
            let exercise = {};
            let logs = await db.getDb().collection('workoutlogs').find({ userId: userId }).sort({ date: -1 }).toArray();
            for (let log of logs) {
                if (exercise[log.name]) {
                    log.maxWeight = exercise[log.name];
                }
                else {
                    const maxWt = await db.getDb().collection('maxweights').findOne({ userId: userId, name: log.name });
                    exercise[log.name] = maxWt.weight;
                    log.maxWeight = exercise[log.name];
                    log.maxWeightCount = maxWt.count;
                }
            }
            res.json(logs);
        }
        catch (err) {
            console.log(err);
        }
    }
);

//@route GET api/workoutlog/logsWeek
//@desc Get logs of all exercises for a week
router.post('/logsWeek',
    async (req, res) => {
        try {
            const { userId } = req.body;
            let start = new Date(moment().subtract(7, 'days').startOf('day'));
            let end = new Date(moment().subtract(1, 'days').endOf('day'));
            let logs = await db.getDb().collection('workoutlogs')
                .find({ userId, date: { $gte: start, $lt: end } }).sort({ date: -1 }).toArray();
            res.json(logs);
        }
        catch (err) {
            console.log(err);
        }
    }
);

//@route PUT api/workoutlog/note
//@desc Update note for a log
router.put('/note',
    async (req, res) => {
        try {
            const { id, category, note } = req.body;
            let updateNote = await db.getDb().collection(`${category.toLowerCase()}workoutlogs`)
                .updateOne({ "_id": ObjectId(id) }, { $set: { "note": note } });
            res.json(updateNote);
        }
        catch (err) {
            console.log(err);
        }
    }
);

module.exports = router;