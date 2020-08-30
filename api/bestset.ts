const router = require('express').Router();
import db from '../config/db';

router.post('/',
    async(req: { body: { userId: any; category: any; name: any; date: any; weight: any; unit: any; count: any; }; }, res: { send: (arg0: string) => void; }) => {
        const { userId, category, name, date, weight, unit, count } = req.body;
        try{     
            const prevMaxWeight = await db.getDb().collection('maxweights').find({ userId: userId, name: name }).toArray();
            if(prevMaxWeight.length == 0 || prevMaxWeight[0].weight < weight || (prevMaxWeight[0].weight == weight && prevMaxWeight[0].count < count)){
                const maxWeightRemoved = await db.getDb().collection('maxweights').deleteOne({ userId: userId, name: name });
                let maxWeight = {
                    'userId': userId,
                    'category': category,
                    'name': name,
                    'date': new Date(date),
                    'weight': weight,
                    'unit': unit,
                    'count': count
                };
                await db.getDb().collection('maxweights').insertOne(maxWeight);
            }
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
            const prevBestSet = await db.getDb().collection('bestsets').find({ userId: userId, name: name }).toArray();
            const total = weight * count;
            if(prevBestSet.length == 0 || prevBestSet[0].total < total){
                const bestSetRemoved = await db.getDb().collection('bestsets').deleteOne({ userId: userId, name: name });
                let bestSet = {
                    'userId': userId,
                    'category': category,
                    'name': name,
                    'date': new Date(date),
                    'weight': weight,
                    'unit': unit,
                    'count': count,
                    'total': total
                };
                await db.getDb().collection('bestsets').insertOne(bestSet);
            }
            res.send('Best sets updated');         
        }
        catch(err){
            console.log(err);
        }
    }
)

router.post('/set',
    async(req: { body: { userId: any; name: any; }; }, res: { json: (arg0: { maxWeight: any; maxReps: any; bestSet: any; }) => void; }) => {
        try{
            const { userId, name } = req.body;
            const maxWeight = await db.getDb().collection('maxweights').findOne({ userId: userId, name: name });
            const maxReps = await db.getDb().collection('maxreps').findOne({ userId: userId, name: name });
            const bestSet = await db.getDb().collection('bestsets').findOne({ userId: userId, name: name });
            const bestSets = {
                maxWeight: maxWeight,
                maxReps: maxReps,
                bestSet: bestSet
            }
            res.json(bestSets);
        }
        catch(err){
            console.log(err);
        }
    }
)

module.exports = router;