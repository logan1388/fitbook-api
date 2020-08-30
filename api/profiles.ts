// Copyright Fitbook

import { Router } from 'express';
import db from '../config/db';
import { CreateProfileModel, ProfileModel } from "../models/profile";
import { ServiceResponse } from "../models/ServiceResponse";

const router = Router(); 

router.get('/:id', async (request, response) => {
    try {
        const { id: userId } = request.params;
        const profile: ProfileModel | null = await db.getDb().collection('profiles').findOne({ userId });
        
        if (profile) {
            response.json(profile);
            return;
        } 
        
        const serviceResponse: ServiceResponse = {
            responseCode: 404,
            responseMessage: "Profile not found.",
        };
        response.json(serviceResponse);
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/',
    async (request: { body: CreateProfileModel }, response) => {
        const serviceResponse: ServiceResponse = {
            responseCode: 500,
            responseMessage: "Unable to create profile. Please try again later.",
        };

        try {
            const dbResponse = await db.getDb().collection('profiles').insertOne(request.body);
            if (dbResponse.result.ok === 1) {
                response.status(200).send(dbResponse.ops[0]);
            } else {
                console.log(JSON.stringify(dbResponse));
                response.send(serviceResponse);
            }
        }
        catch (error) {
            console.log(error);
            response.send(serviceResponse);
        }
    }
);

module.exports = router;