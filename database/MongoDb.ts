// Copyright FitBook

import IDatabase from '../commonlib/database/IDatabase';
import db from '../config/db';
import ServiceResponse from '../commonlib/models/ServiceResponse';

export default class MongoDb implements IDatabase {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  public async GetAsync(id: string): Promise<Record<string, any>> {
    const data = await db.getDb().collection(this.tableName).findOne({ id });

    return data;
  }

  public async GetListByUserId(
    userId: string,
    params?: Record<string, any>
  ): Promise<Record<string, any>[] | ServiceResponse> {
    const data = await db
      .getDb()
      .collection(this.tableName)
      .find({ userId, ...params })
      .toArray();

    return data;
  }

  public async GetListAsync(): Promise<Record<string, any>[]> {
    return await [
      {
        foo: 'bar',
      },
    ];
  }

  public async PostAsync(data: Record<string, any>): Promise<any> {
    const response = await db.getDb().collection(this.tableName).insertOne(data);

    if (response.result.ok === 1) {
      return response.ops[0];
    }

    let serviceResponse = new ServiceResponse();
    serviceResponse.responseCode = 500;
    serviceResponse.responseMessage = 'Something went wrong. Please try again later.';

    return serviceResponse;
  }
}
