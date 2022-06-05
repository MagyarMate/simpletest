import { Container } from 'typedi';
import { NextFunction} from 'express';
import {Router, Request, Response, json} from 'express';
import QuizController from '../controller/quiz.controller';
import quizMiddleware from '../middleware/quiz.middleware';
import AuthController from '../controller/auth.controller';
import debug from 'debug';


const route = Router();
const log: debug.IDebugger = debug('simpletest:quiz_routes');

export default (app: Router) => {
    log('Setup quiz routes');
    app.use('/quiz', route);

    const quizController = Container.get('quizController') as typeof QuizController;
    const authController = Container.get('authController') as typeof AuthController;

    route.all('/', (req: Request, res: Response, next: NextFunction) => {
        next();
    })
    .get('/question', authController.verifyUser, quizController.getQuestionByNumber)
    .patch('/question', authController.verifyUser, quizController.checkQuestion, quizController.updateQuestionByNumber)
    .get('/', authController.verifyUser, quizController.getRandomQuestionList)
    .get('/result/:resultId', authController.verifyUser, quizController.getQuizResult)
    .get('/result', authController.verifyUser, quizController.getQuizResultList)
    .post('/result', authController.verifyUser, quizController.createQuizResult)

}