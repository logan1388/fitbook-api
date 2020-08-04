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
            let start = new Date(moment().subtract(7, 'days').startOf('day'));
            let end = new Date(moment().subtract(1, 'days').endOf('day'));
            const bestSet = await db.getDb().collection('bestsets')
                .find({ userId, date: { $gte: start, $lt: end } }).sort({ date: -1 }).toArray();
            res.json(bestSet);
        }
        catch (err) {
            console.log(err);
        }
    }
)

module.exports = router;