const router = require('express').Router();
import db from '../config/db';

router.post('/',
    async(req: { body: { userId: any; category: any; name: any; date: any; weight: any; unit: any; count: any; }; }, res: { send: (arg0: string) => void; }) => {
        const { userId, category, name, date, weight, unit, count } = req.body;
        try{     
            const prevMaxReps = await db.getDb().collection('maxreps').find({ userId: userId, name: name }).toArray();
            if(prevMaxReps.length == 0 || prevMaxReps[0].count < count || (prevMaxReps[0].count == count && prevMaxReps[0].weight < weight)){
                const maxRepsRemoved = await db.getDb().collection('maxreps').deleteOne({ userId: userId, name: name });
                let maxReps = {
                    'userId': userId,
                    'category': category,
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
    async(req: { body: { userId: any; name: any; }; }, res: { json: (arg0: any) => void; }) => {
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