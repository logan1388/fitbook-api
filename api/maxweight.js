const router = require('express').Router();
const db = require('../config/db');

router.post('/',
    async(req, res) => {
        const { userId, name, date, weight, unit, count } = req.body;
        try{     
            const prevMaxWeight = await db.getDb().collection('maxweights').find({ userId: userId, name: name }).toArray();
            if(prevMaxWeight.length == 0 || prevMaxWeight[0].weight < weight || (prevMaxWeight[0].weight == weight && prevMaxWeight[0].count < count)){
                const maxWeightRemoved = await db.getDb().collection('maxweights').deleteOne({ userId: userId, name: name });
                let maxWeight = {
                    'userId': userId,
                    'name': name,
                    'date': new Date(date),
                    'weight': weight,
                    'unit': unit,
                    'count': count
                };
                await db.getDb().collection('maxweights').insertOne(maxWeight);
                res.send('Maxweight added!');
            }
            else{
                res.send('No change in max weight');
            }            
        }
        catch(err){
            console.log(err);
        }
    }
)

router.post('/weight',
    async(req, res) => {
        try{
            const { userId, name } = req.body;
            const maxWeight = await db.getDb().collection('maxweights').findOne({ userId: userId, name: name });
            res.json(maxWeight);
        }
        catch(err){
            console.log(err);
        }
    }
)

module.exports = router;