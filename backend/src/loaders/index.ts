import { Container } from 'typedi';
import express from 'express';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('simpletest:app');
export default async ({ expressApp }: { expressApp: express.Application }) => {
    log('Creating database connection');
    const mongoConnection = await mongooseLoader();

    const userModel = {
        name: 'userModel',
        model: require('../models/user').default,
    };

    const questionModel = {
        name: 'questionModel',
        model: require('../models/question').default,
    };

    log('Loading models');
    Container.set(userModel.name, userModel.model);
    Container.set(questionModel.name, questionModel.model);

    log('Loading controllers');
    Container.set('userController', require('../api/controller/users.controller').default);
    Container.set('quizController', require('../api/controller/quiz.controller').default);

    await expressLoader({ app: expressApp });
}