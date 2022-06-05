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

    const quizResultModel = {
        name: 'quizResultModel',
        model: require('../models/quizresult').default,
    }

    log('Loading models');
    Container.set(userModel.name, userModel.model);
    Container.set(questionModel.name, questionModel.model);
    Container.set(quizResultModel.name, quizResultModel.model);

    log('Loading controllers');
    Container.set('userController', require('../api/controller/users.controller').default);
    Container.set('quizController', require('../api/controller/quiz.controller').default);
    Container.set('authController', require('../api/controller/auth.controller').default);

    await expressLoader({ app: expressApp });
}