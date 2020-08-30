// Copyright FitBook

export interface CreateProfileModel {
    userId: string;
    firstName: string;
    lastName: string;
    weight?: number;
    weightUnit?: number;
    height?: number;   
}

export interface ProfileModel {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    weight: number;
    weightUnit: number;
    height: number;   
}
