import express from 'express';
import Cors from 'cors';
import Database from './config/db';
const app = express();


var corsOption: Cors.CorsOptions = {
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};

app.use(Cors(corsOption));
app.use(express.json());

app.get('/', (_, response) => response.send('API running!'));

app.use('/api/exercises', require('./api/exercises'));
app.use('/api/workout', require('./api/workout'));
app.use('/api/workoutlog', require('./api/workoutlog'));
app.use('/api/bestset', require('./api/bestset'));
app.use('/api/awards', require('./api/awards'));
app.use('/api/homeworkoutlog', require('./api/homeworkoutlog'));
app.use('/api/maxreps', require('./api/maxreps'));
app.use('/api/maxtime', require('./api/maxtime'));
app.use('/api/profiles', require('./api/profiles'));

Database.initDb();

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

module.exports = { app };