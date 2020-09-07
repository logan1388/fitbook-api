const router = require('express').Router();
import db from '../config/db';

router.post(
  '/',
  async (
    req: { body: { userId: any; category: any; name: any; date: any; weight: any; unit: any; count: any; time: any } },
    res: { send: (arg0: string) => void }
  ) => {
    const { userId, category, name, date, weight, unit, count, time } = req.body;
    try {
      const prevmaxTime = await db.getDb().collection('maxtime').find({ userId: userId, name: name }).toArray();
      if (
        time != 0 &&
        (prevmaxTime.length == 0 ||
          prevmaxTime[0].time < time ||
          (prevmaxTime[0].time == time && prevmaxTime[0].count < count))
      ) {
        const maxTimeRemoved = await db.getDb().collection('maxtime').deleteOne({ userId: userId, name: name });
        let maxTime = {
          userId: userId,
          category: category,
          name: name,
          date: new Date(date),
          weight: weight,
          unit: unit,
          count: count,
          time: time,
        };
        await db.getDb().collection('maxtime').insertOne(maxTime);
      }
      res.send('Best sets updated');
    } catch (err) {
      console.log(err);
    }
  }
);

router.post('/time', async (req: { body: { userId: any; name: any } }, res: { json: (arg0: any) => void }) => {
  try {
    const { userId, name } = req.body;
    const maxTime = await db.getDb().collection('maxtime').findOne({ userId: userId, name: name });
    res.json(maxTime);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
