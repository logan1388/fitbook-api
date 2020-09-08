// Copyright FitBook

import App from './app';

// Controllers
import ProfileController from './controllers/profiles';

// Services
import ProfilesService from './commonlib/services/profiles';

// Database
import MongoDb from './database/MongoDb';

// Config
import { MongoDbTables } from './config/mongoDbTables';

const profileService = new ProfilesService(new MongoDb(MongoDbTables.PROFILES));

const app = new App([new ProfileController(profileService)], process.env.PORT || '9000');

app.listen();

export default app;
