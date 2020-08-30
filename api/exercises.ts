const router = require('express').Router();
import db from '../config/db';
import { check, validationResult} from'express-validator';
import { Request } from 'express-validator/src/base';

router.get('/', async (req: any, res: { json: (arg0: any[]) => void; }) => {
    try{
        const exercises = await db.getDb().collection('exercises').find().toArray();
        res.json(exercises);
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/:category', async (req: { params: { category: any; }; }, res: { json: (arg0: any[]) => void; }) => {
    try{
        const exercises = await db.getDb().collection('exercises').find({ category: req.params.category }).toArray();
        res.json(exercises);
    }
    catch (err) {
        console.log(err);
    }
});

router.post('/', 
[
    check('category', 'Category is required').not().isEmpty()
], 
async (req: Request, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors: import("express-validator").ValidationError[] | { msg: string; }[]; }): void; new(): any; }; }; send: (arg0: string) => void; }) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { category, name } = req.body;
    try{
        let exercise = await db.getDb().collection('exercises').findOne({ name });
        if(exercise){
            res.status(400).json({ 
                errors: [{ msg : 'Exercise already exists' }] 
            });
        }
        exercise = {
            'category': category,
            'name': name
        };
        await db.getDb().collection('exercises').insertOne(exercise);
        res.send('Exercise added!');
    }
    catch(err){
        console.log(err);
    }
});

router.delete('/:name', async (req: { params: { name: any; }; }, res: { json: (arg0: import("mongodb").DeleteWriteOpResultObject) => void; }) => {
    try{
        const exercise = await db.getDb().collection('exercises').deleteOne({ name: req.params.name });
        res.json(exercise);
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;