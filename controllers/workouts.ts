// Copyright FitBook

import express from 'express';
import { CreateWorkoutModel, WorkoutModel } from '../commonlib/models/WorkoutModel';
import ServiceResponse, { isServiceResponse } from '../commonlib/models/ServiceResponse';
import WorkoutsService from '../commonlib/services/workouts';
import HttpException from '../models/httpException';
import IController from './IController';

class WorkoutsController implements IController {
  private static readonly PATH = '/api/workout';
  public router: express.Router;
  private workoutsSvc: WorkoutsService;

  constructor(workoutsService: WorkoutsService) {
    this.workoutsSvc = workoutsService;

    this.router = express.Router();
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(WorkoutsController.PATH, this.getWorkoutsList);
    this.router.post(WorkoutsController.PATH, this.createWorkout);

    this.router.get(`${WorkoutsController.PATH}/:type/:subType`, this.getWorkoutsListByType);
  }

  private getWorkoutsList = (request: express.Request, response: express.Response) => {
    response.send('NOT IMPLEMENTED');
  };

  private createWorkout = async (
    request: express.Request<null, null, CreateWorkoutModel>,
    response: express.Response<WorkoutModel | ServiceResponse>,
    next: express.NextFunction
  ) => {
    try {
      const r: WorkoutModel | ServiceResponse = await this.workoutsSvc.createWorkout(request.body);

      if (isServiceResponse(r)) {
        next(new HttpException(500, 'Unable to create workout. Please try again later.'));
        return;
      }

      response.status(200).json(r);
    } catch (error) {
      next(new HttpException(500, 'Unable to create workout. Please try again later.'));
    }
  };

  private getWorkoutsListByType = async (
    request: express.Request<{ type: string, subType: string }, WorkoutModel, null, { userId?: string }>,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const type = request.params.type;
      const subType = request.params.subType;
      const userId = request.query.userId || '';
      const r: WorkoutModel[] | ServiceResponse = await this.workoutsSvc.getWorkoutsListByUserId(type, subType, userId);

      if (isServiceResponse(r)) {
        switch (r.responseCode) {
          case 404: {
            next(new HttpException(r.responseCode, 'Workout data not found'));
            break;
          }
          default: {
            next(new HttpException(500, 'Unable to retrieve workout data. Please try again later.'));
            break;
          }
        }
        return;
      }

      response.status(200).json(r);
    } catch (error) {
      console.log(error);

      next(new HttpException(500, 'Unable to retrieve workout data. Please try again later.'));
    }
  };
}

export default WorkoutsController;
