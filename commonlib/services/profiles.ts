// Copyright FitBook

import IDatabase from '../database/IDatabase';
import { CreateProfileModel, ProfileModel } from '../models/ProfileModel';
import ServiceResponse, { isServiceResponse } from '../models/ServiceResponse';

export default class ProfilesService {
  private db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  public async createProfile(data: CreateProfileModel): Promise<ProfileModel | ServiceResponse> {
    const r: ProfileModel | ServiceResponse = await this.db.PostAsync(data);

    return r;
  }

  public async getMyProfile(id: string): Promise<ProfileModel | ServiceResponse> {
    const r: ProfileModel | ServiceResponse = await this.db.GetAsync(id);

    return r;
  }

  public async getProfileById(userId: string): Promise<ProfileModel | ServiceResponse> {
    const r: ProfileModel[] | ServiceResponse = await this.db.GetListByUserId(userId);

    if (isServiceResponse(r)) {
      return r;
    }

    return r[0];
  }
}
