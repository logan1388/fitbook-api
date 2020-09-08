// Copyright FitBook

import ServiceResponse from '../models/ServiceResponse';

export default interface IDatabase {
  GetAsync: (id: string) => Promise<any>;
  GetListByUserId: (userId: string) => Promise<any[] | ServiceResponse>;
  GetListAsync: () => Promise<any[]>;
  PostAsync: (data: Record<string, any>) => Promise<any>;
}
