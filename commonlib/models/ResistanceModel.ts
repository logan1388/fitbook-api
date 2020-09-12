// Copyright FitBook

// eslint-disable-next-line no-shadow
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
  date: Date;
  weight?: number;
  count?: number;
  time?: string;
  note?: string;
}

export interface ResistanceModel {
  id: string;
  userId: string;
  type: ResistanceTypes;
  date: Date;
  weight: number;
  count: number;
  time: string;
  note: string;
}
