const router = require('express').Router();
import db from '../config/db';
import { check, validationResult } from 'express-validator';
import moment from 'moment';
import { Request } from 'express-validator/src/base';

// @route   POST api/workout
// @desc    Insert today's workout
router.post(
  '/',
  [
    check('userId', 'User ID is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
  ],
  async (
    req: Request,
    res: {
      status: (
        arg0: number
      ) => {
        (): any;
        new(): any;
        json: { (arg0: { errors: import('express-validator').ValidationError[] }): any; new(): any };
      };
      send: (arg0: string) => void;
    }
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId, category, date } = req.body;
    try {
      let start = new Date(moment().startOf('day').format());
      let end = new Date(moment().endOf('day').format());
      let todayWorkout = await db
        .getDb()
        .collection('workouts')
        .find({ userId, date: { $gte: start, $lt: end } })
        .toArray();
      let exists = false;
      for (let wo of todayWorkout) {
        if (wo.category == category) {
          exists = true;
          res.send('Workout already exists');
          break;
        }
      }
      if (!exists) {
        let workout = {
          userId: userId,
          category: category,
          date: new Date(date),
        };
        await db.getDb().collection('workouts').insertOne(workout);
        res.send('Workout added!');
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.post('/workoutHistory', async (req: { body: { userId: any } }, res: { json: (arg0: any[]) => void }) => {
  const userId = req.body.userId;
  try {
    let start = new Date(moment().startOf('day').format());
    const workoutHistory = await db
      .getDb()
      .collection('workouts')
      .find({ userId, date: { $lt: start } })
      .sort({ date: -1 })
      .toArray();
    workoutHistory.forEach(hist => (hist.type = hist.category));
    res.json(workoutHistory);
  } catch (err) {
    console.log(err);
  }
});

router.post('/workoutSummary', async (req: { body: { userId: any } }, res: { json: (arg0: any[]) => void }) => {
  const userId = req.body.userId;
  try {
    let start = new Date(moment().startOf('day').format());
    const workoutSummary = await db
      .getDb()
      .collection('workouts')
      .find({ userId, date: { $gt: start } })
      .sort({ date: -1, category: 1 })
      .toArray();
    res.json(workoutSummary);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
