// Copyright FitBook

import express from 'express';
import IController from './controllers/IController';
import Database from './config/db';

// Middlewares
import errorMiddleware from './middleware/error.middleware';

class App {
  public static app: express.Application;
  public static port: string;

  constructor(controllers: IController[], port: string) {
    App.app = express();
    App.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);

    // TODO: Remove this and use controllers
    this.deprecatedInitialization();

    this.initializeErrorHandling();

    Database.initDb();
  }

  private initializeMiddlewares() {
    App.app.use(express.json());
  }

  private initializeErrorHandling() {
    App.app.use(errorMiddleware);
  }

  private deprecatedInitialization() {
    App.app.use('/api/exercises', require('./api/exercises'));
    App.app.use('/api/workout', require('./api/workout'));
    App.app.use('/api/workoutlog', require('./api/workoutlog'));
    App.app.use('/api/bestset', require('./api/bestset'));
    App.app.use('/api/awards', require('./api/awards'));
    App.app.use('/api/resistancelog', require('./api/resistancelog'));
    App.app.use('/api/maxreps', require('./api/maxreps'));
    App.app.use('/api/maxtime', require('./api/maxtime'));
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach(controller => {
      App.app.use('/', controller.router);
    });
  }

  public listen() {
    App.app.listen(App.port, () => {
      console.log(`App listening on the port ${App.port}`);
    });
  }
}

export default App;
