// Copyright FitBook

import App from './app';

// Controllers
import ProfileController from './controllers/profiles';
import ResistanceController from './controllers/resistance';
import WorkoutsController from './controllers/workouts';

// Services
import ProfilesService from './commonlib/services/profiles';
import ResistanceService from './commonlib/services/resistance';
import WorkoutsService from './commonlib/services/workouts';

// Database
import MongoDb from './database/MongoDb';

// Config
import { MongoDbTables } from './config/mongoDbTables';

const profileService = new ProfilesService(new MongoDb(MongoDbTables.PROFILES));
const resistanceService = new ResistanceService(new MongoDb(MongoDbTables.RESISTANCE));
const workoutsService = new WorkoutsService(new MongoDb(MongoDbTables.WORKOUTS));

const app = new App(
  [new ProfileController(profileService), new ResistanceController(resistanceService), new WorkoutsController(workoutsService)],
  process.env.PORT || '9000'
);

app.listen();

export default app;
