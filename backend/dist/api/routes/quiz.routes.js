"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const express_1 = require("express");
const debug_1 = __importDefault(require("debug"));
const route = (0, express_1.Router)();
const log = (0, debug_1.default)('simpletest:quiz_routes');
exports.default = (app) => {
    log('Setup quiz routes');
    app.use('/quiz', route);
    const quizController = typedi_1.Container.get('quizController');
    const authController = typedi_1.Container.get('authController');
    route.all('/', (req, res, next) => {
        next();
    })
        .get('/question', authController.verifyUser, quizController.getQuestionByNumber)
        .patch('/question', authController.verifyUser, quizController.checkQuestion, quizController.updateQuestionByNumber)
        .get('/', authController.verifyUser, quizController.getRandomQuestionList)
        .get('/result/:resultId', authController.verifyUser, quizController.getQuizResult)
        .get('/result', authController.verifyUser, quizController.getQuizResultList)
        .post('/result', authController.verifyUser, quizController.createQuizResult);
};
//# sourceMappingURL=quiz.routes.js.map