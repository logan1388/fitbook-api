const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/db');

var corsOption = {
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running!'));

app.use('/api/exercises', require('./api/exercises'));
app.use('/api/workout', require('./api/workout'));
app.use('/api/workoutlog', require('./api/workoutlog'));
app.use('/api/bestset', require('./api/bestset'));
app.use('/api/awards', require('./api/awards'));

db.initDb((err, db) => {
    if (err) {
        console.log(err);
    }
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

module.exports = { app };