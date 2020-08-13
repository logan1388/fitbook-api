const router = require('express').Router();
const db = require('../config/db');

router.post('/',
    async(req, res) => {
        const { userId, name, date, weight, unit, count, time } = req.body;
        try{     
            const prevmaxTime = await db.getDb().collection('maxtime').find({ userId: userId, name: name }).toArray();
            if(time != 0 && (prevmaxTime.length == 0 || prevmaxTime[0].time < time || (prevmaxTime[0].time == time && prevmaxTime[0].count < count))){
                const maxTimeRemoved = await db.getDb().collection('maxtime').deleteOne({ userId: userId, name: name });
                let maxTime = {
                    'userId': userId,
                    'name': name,
                    'date': new Date(date),
                    'weight': weight,
                    'unit': unit,
                    'count': count,
                    'time': time
                };
                await db.getDb().collection('maxtime').insertOne(maxTime);
            }
            res.send('Best sets updated');         
        }
        catch(err){
            console.log(err);
        }
    }
)

router.post('/time',
    async(req, res) => {
        try{
            const { userId, name } = req.body;
            const maxTime = await db.getDb().collection('maxtime').findOne({ userId: userId, name: name });
            res.json(maxTime);
        }
        catch(err){
            console.log(err);
        }
    }
)

module.exports = router;