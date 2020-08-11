const router = require('express').Router();
const db = require('../config/db');

router.post('/',
    async(req, res) => {
        const { userId, name, date, weight, unit, count } = req.body;
        try{     
            const prevMaxReps = await db.getDb().collection('maxreps').find({ userId: userId, name: name }).toArray();
            if(prevMaxReps.length == 0 || prevMaxReps[0].count < count || (prevMaxReps[0].count == count && prevMaxReps[0].weight < weight)){
                const maxRepsRemoved = await db.getDb().collection('maxreps').deleteOne({ userId: userId, name: name });
                let maxReps = {
                    'userId': userId,
                    'name': name,
                    'date': new Date(date),
                    'weight': weight,
                    'unit': unit,
                    'count': count
                };
                await db.getDb().collection('maxreps').insertOne(maxReps);
            }
            res.send('Best sets updated');         
        }
        catch(err){
            console.log(err);
        }
    }
)

router.post('/reps',
    async(req, res) => {
        try{
            const { userId, name } = req.body;
            const maxReps = await db.getDb().collection('maxreps').findOne({ userId: userId, name: name });
            res.json(maxReps);
        }
        catch(err){
            console.log(err);
        }
    }
)

module.exports = router;