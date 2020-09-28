// Copyright FitBook

export enum WorkoutTypes {
  CHEST = 'chest',
  LEG = 'leg',
  SHOULDER = 'shoulder',
  BACK = 'back',
  BICEPS = 'biceps',
  TRICEPS = 'triceps',
}

export interface CreateWorkoutModel {
  userId: string;
  type: WorkoutTypes;
  subType: string;
  date: Date;
  weight?: number;
  unit?: string;
  count?: number;
  note?: string;
}

export interface WorkoutModel {
  _id: string;
  userId: string;
  type: WorkoutTypes;
  subType: string;
  date: Date;
  weight: number;
  unit: string;
  count: number;
  note: string;
}

export interface WorkoutHistoryModel {
  _id: string;
  userId: string;
  type: WorkoutTypes;
  date: Date;
}

export interface WorkoutSummaryModel {
  _id: string;
  userId: string;
  subType: string;
  date: Date;
  weight: number;
  unit: string;
  count: number;
}

export const getWorkoutType = (param: string): WorkoutTypes => {
  switch (param.toLocaleUpperCase()) {
    case 'CHEST':
      return WorkoutTypes.CHEST;
    case 'LEG':
      return WorkoutTypes.LEG;
    case 'SHOULDER':
      return WorkoutTypes.SHOULDER;
    case 'BACK':
      return WorkoutTypes.BACK;
    case 'BICEPS':
      return WorkoutTypes.BICEPS;
    case 'TRICEPS':
      return WorkoutTypes.TRICEPS;
    default:
      return WorkoutTypes.CHEST;
  }
};
