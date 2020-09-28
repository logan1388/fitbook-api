// Copyright FitBook

export enum ResistanceTypes {
  PUSH_UP = 'PUSHUP',
  PULL_UP = 'PULLUP',
  DIPS = 'DIPS',
  BURPEE = 'BURPEE',
  PLANK = 'PLANK',
  LUNGES = 'LUNGES',
}

export interface CreateResistanceModel {
  userId: string;
  type: ResistanceTypes;
  createdDate: Date;
  weight?: number;
  unit?: string;
  count?: number;
  time?: string;
  note?: string;
}

export interface ResistanceModel {
  _id: string;
  userId: string;
  type: ResistanceTypes;
  createdDate: Date;
  weight: number;
  unit: string;
  count: number;
  time: string;
  note: string;
}
