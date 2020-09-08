// Copyright FitBook

import express from 'express';
import IController from './IController';

class ExercisesController implements IController {
  private static readonly PATH = '/api/exercises';
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(ExercisesController.PATH, this.getExercises);
    this.router.post(ExercisesController.PATH, this.createExercise);

    this.router.get(`${ExercisesController.PATH}/:category`, this.getExerciseByCategory);
  }

  private getExercises = (request: express.Request, response: express.Response) => {
    response.send('NOT IMPLEMENTED');
  };

  private createExercise = (request: express.Request, response: express.Response) => {
    response.send('NOT IMPLEMENTED');
  };

  private getExerciseByCategory = (request: express.Request, response: express.Response) => {
    response.send('NOT IMPLEMENTED');
  };
}

export default ExercisesController;
