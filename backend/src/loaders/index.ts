import { Container } from 'typedi';
import express from 'express';
import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async ({ expressApp }: { expressApp: express.Application }) => {
    const mongoConnection = await mongooseLoader();

    const userModel = {
        username: 'userModel',
        model: require('../models/user').default,
    };

    const questionModel = {
        name: 'questionModel',
        model: require('../models/question').default,
    };

    Container.set(userModel.username, userModel.model);
    Container.set(questionModel.name, questionModel.model);

    await expressLoader({ app: expressApp });
}