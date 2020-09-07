// Copyright FitBook

export default interface IDatabase {
  GetAsync: (id: string) => Promise<any>;
  GetListAsync: () => Promise<Record<string, any>[]>;
  PostAsync: (data: Record<string, any>) => Promise<any>;
}
