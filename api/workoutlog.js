const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const db = require('../config/db');
const { ObjectId } = require('mongodb');

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
            switch (req.body.category) {
                case 'Chest': {
                    log = await db.getDb().collection('chestworkoutlogs').insertOne(workoutlog);
                    break;
                }
                case 'Leg': {
                    log = await db.getDb().collection('legworkoutlogs').insertOne(workoutlog);
                    break;
                }
                case 'Back': {
                    log = await db.getDb().collection('backworkoutlogs').insertOne(workoutlog);
                    break;
                }
                case 'Triceps': {
                    log = await db.getDb().collection('tricepsworkoutlogs').insertOne(workoutlog);
                    break;
                }
                case 'Shoulder': {
                    log = await db.getDb().collection('shoulderworkoutlogs').insertOne(workoutlog);
                    break;
                }
                case 'Biceps': {
                    log = await db.getDb().collection('bicepsworkoutlogs').insertOne(workoutlog);
                    break;
                }
                default: {
                    res.send(req.body.category + ' not found!');
                }
            }
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
            switch (category) {
                case 'Chest': {
                    let exerciselogs = await db.getDb().collection('chestworkoutlogs')
                        .find({ userId: userId, name: name }).sort({ date: -1 }).toArray();
                    const maxWeight = await db.getDb().collection('maxweights').findOne({ userId: userId, name: name });
                    exerciselogs.map(logs => logs.maxWeight = maxWeight ? maxWeight.weight : '');
                    res.json(exerciselogs);
                    break;
                }
                case 'Leg': {
                    let exerciselogs = await db.getDb().collection('legworkoutlogs')
                        .find({ userId: userId, name: name }).sort({ date: -1 }).toArray();
                    const maxWeight = await db.getDb().collection('maxweights').findOne({ userId: userId, name: name });
                    exerciselogs.map(logs => logs.maxWeight = maxWeight ? maxWeight.weight : '');
                    res.json(exerciselogs);
                    break;
                }
                case 'Back': {
                    let exerciselogs = await db.getDb().collection('backworkoutlogs')
                        .find({ userId: userId, name: name }).sort({ date: -1 }).toArray();
                    const maxWeight = await db.getDb().collection('maxweights').findOne({ userId: userId, name: name });
                    exerciselogs.map(logs => logs.maxWeight = maxWeight ? maxWeight.weight : '');
                    res.json(exerciselogs);
                    break;
                }
                case 'Triceps': {
                    let exerciselogs = await db.getDb().collection('tricepsworkoutlogs')
                        .find({ userId: userId, name: name }).sort({ date: -1 }).toArray();
                    const maxWeight = await db.getDb().collection('maxweights').findOne({ userId: userId, name: name });
                    exerciselogs.map(logs => logs.maxWeight = maxWeight ? maxWeight.weight : '');
                    res.json(exerciselogs);
                    break;
                }
                case 'Shoulder': {
                    let exerciselogs = await db.getDb().collection('shoulderworkoutlogs')
                        .find({ userId: userId, name: name }).sort({ date: -1 }).toArray();
                    const maxWeight = await db.getDb().collection('maxweights').findOne({ userId: userId, name: name });
                    exerciselogs.map(logs => logs.maxWeight = maxWeight ? maxWeight.weight : '');
                    res.json(exerciselogs);
                    break;
                }
                case 'Biceps': {
                    let exerciselogs = await db.getDb().collection('bicepsworkoutlogs')
                        .find({ userId: userId, name: name }).sort({ date: -1 }).toArray();
                    const maxWeight = await db.getDb().collection('maxweights').findOne({ userId: userId, name: name });
                    exerciselogs.map(logs => logs.maxWeight = maxWeight ? maxWeight.weight : '');
                    res.json(exerciselogs);
                    break;
                }
                default: {
                    res.json('Exercise not found');
                }
            }
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

//@route PUT api/workoutlog/note
//@desc Update note for a log
router.put('/note',
    async (req, res) => {
        try {
            const { id, category, name, note } = req.body;
            let updateNote = await db.getDb().collection('chestworkoutlogs').updateOne({ "_id": ObjectId(id) }, {$set: { "note": note }});
            res.json(updateNote);
        }
        catch (err) {
            console.log(err);
        }
    }
);

module.exports = router;