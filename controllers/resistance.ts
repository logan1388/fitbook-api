// Copyright FitBook

import express from 'express';
import { CreateResistanceModel, ResistanceModel } from '../commonlib/models/ResistanceModel';
import ServiceResponse, { isServiceResponse } from '../commonlib/models/ServiceResponse';
import ResistanceService from '../commonlib/services/resistance';
import HttpException from '../models/httpException';
import IController from './IController';

class ResistanceController implements IController {
  private static readonly PATH = '/api/resistance';
  public router: express.Router;
  private resistanceSvc: ResistanceService;

  constructor(resistanceService: ResistanceService) {
    this.resistanceSvc = resistanceService;

    this.router = express.Router();
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(ResistanceController.PATH, this.getResistanceList);
    this.router.post(ResistanceController.PATH, this.createResistance);

    this.router.get(`${ResistanceController.PATH}/:type`, this.getResistanceListByType);
  }

  private getResistanceList = (request: express.Request, response: express.Response) => {
    response.send('NOT IMPLEMENTED');
  };

  private createResistance = async (
    request: express.Request<null, null, CreateResistanceModel>,
    response: express.Response<ResistanceModel | ServiceResponse>,
    next: express.NextFunction
  ) => {
    try {
      const r: ResistanceModel | ServiceResponse = await this.resistanceSvc.createResistance(request.body);

      if (isServiceResponse(r)) {
        next(new HttpException(500, 'Unable to create resistance. Please try again later.'));
        return;
      }

      response.status(200).json(r);
    } catch (error) {
      next(new HttpException(500, 'Unable to create resistance. Please try again later.'));
    }
  };

  private getResistanceListByType = async (
    request: express.Request<{ type: string }, ResistanceModel, null, { userId?: string }>,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const type = request.params.type;
      const userId = request.query.userId || '';
      const r: ResistanceModel[] | ServiceResponse = await this.resistanceSvc.getResistanceListByUserId(type, userId);

      if (isServiceResponse(r)) {
        switch (r.responseCode) {
          case 404: {
            next(new HttpException(r.responseCode, 'Resistance data not found'));
            break;
          }
          default: {
            next(new HttpException(500, 'Unable to retrieve resistance data. Please try again later.'));
            break;
          }
        }
        return;
      }

      response.status(200).json(r);
    } catch (error) {
      console.log(error);

      next(new HttpException(500, 'Unable to retrieve resistance data. Please try again later.'));
    }
  };
}

export default ResistanceController;
