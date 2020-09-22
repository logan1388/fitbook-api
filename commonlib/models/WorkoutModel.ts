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
