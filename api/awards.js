const router = require('express').Router();
const db = require('../config/db');
const moment = require('moment');

router.post('/',
    async (req, res) => {
        try {
            const { userId } = req.body;
            const bestSet = await db.getDb().collection('bestsets').find({ userId }).sort({ date: -1 }).toArray();
            res.json(bestSet);
        }
        catch (err) {
            console.log(err);
        }
    }
);

router.post('/week',
    async (req, res) => {
        try {
            const { userId } = req.body;
            let start = new Date(moment().subtract(20, 'days').startOf('day'));
            let end = new Date(moment().endOf('day'));
            const awards = [];
            const bestSet = await db.getDb().collection('bestsets')
                .find({ userId, date: { $gte: start, $lt: end } }).sort({ date: -1 }).toArray();
            bestSet.forEach(set => awards.push(set));
            const maxReps = await db.getDb().collection('maxreps')
                .find({ userId, date: { $gte: start, $lt: end } }).sort({ date: -1 }).toArray();
            maxReps.forEach(rep => rep.category === 'resistance' && awards.push(rep));
            // const maxTime = await db.getDb().collection('maxtime')
            //     .find({ userId, date: { $gte: start, $lt: end } }).sort({ date: -1 }).toArray();
            // maxTime.forEach(time => awards.push(time));
            res.json(awards);
        }
        catch (err) {
            console.log(err);
        }
    }
)

module.exports = router;