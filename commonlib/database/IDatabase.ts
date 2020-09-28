// Copyright FitBook

import ServiceResponse from '../models/ServiceResponse';

export default interface IDatabase {
  GetAsync: (id: string) => Promise<any>;
  GetListByUserId: (
    userId: string,
    params?: Record<string, any>,
    query?: Record<string, any>
  ) => Promise<any[] | ServiceResponse>;
  GetListAsync: () => Promise<any[]>;
  PostAsync: (data: Record<string, any>) => Promise<any>;
}
