const router = require('express').Router();
const db = require('../config/db');
const { check, validationResult} = require('express-validator');

router.get('/', async (req, res) => {
    try{
        const exercises = await db.getDb().collection('exercises').find().toArray();
        res.json(exercises);
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/:category', async (req, res) => {
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
async (req, res) => {
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

router.delete('/:name', async (req, res) => {
    try{
        const exercise = await db.getDb().collection('exercises').deleteOne({ name: req.params.name });
        res.json(exercise);
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;