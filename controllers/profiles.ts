// Copyright FitBook

import express from 'express';
import IController from './IController';
import { CreateProfileModel, ProfileModel } from '../commonlib/models/ProfileModel';
import ProfileService from '../commonlib/services/profiles';
import ServiceResponse, { isServiceResponse } from '../commonlib/models/ServiceResponse';
import HttpException from '../models/httpException';

class ProfilesController implements IController {
  private static readonly PATH = '/api/profiles';
  public router: express.Router;
  private profileSvc: ProfileService;

  constructor(profileService: ProfileService) {
    this.profileSvc = profileService;

    this.router = express.Router();
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(`${ProfilesController.PATH}/:id`, this.getProfile);
    this.router.post(ProfilesController.PATH, this.createProfile);
  }

  private getProfile = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const { id: userId } = request.params;
      const r: ProfileModel | ServiceResponse = await this.profileSvc.getProfileById(userId);

      if (isServiceResponse(r)) {
        switch (r.responseCode) {
          case 404: {
            next(new HttpException(r.responseCode, 'Profile not found'));
            break;
          }
          default: {
            next(new HttpException(500, 'Unable to retrieve profile data. Please try again later.'));
            break;
          }
        }
        return;
      }

      response.status(200).json(r);
      return;
    } catch (error) {
      console.log(error);

      next(new HttpException(500, 'Unable to retrieve profile data. Please try again later.'));
    }
  };

  private createProfile = async (
    request: express.Request<null, null, CreateProfileModel>,
    response: express.Response<ProfileModel | ServiceResponse>,
    next: express.NextFunction
  ) => {
    try {
      const r: ProfileModel | ServiceResponse = await this.profileSvc.createProfile(request.body);

      if (isServiceResponse(r)) {
        next(new HttpException(500, 'Unable to create profile. Please try again later.'));
        return;
      }

      response.status(200).json(r);
    } catch (error) {
      next(new HttpException(500, 'Unable to create profile. Please try again later.'));
    }
  };
}

export default ProfilesController;
