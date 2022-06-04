import { Container } from 'typedi';
import { NextFunction} from 'express';
import {Router, Request, Response, json} from 'express';
import QuizController from '../controller/quiz.controller';
import quizMiddleware from '../middleware/quiz.middleware';
import debug from 'debug';


const route = Router();
const log: debug.IDebugger = debug('simpletest:quiz_routes');

export default (app: Router) => {
    log('Setup quiz routes');
    app.use('/questions', route);

    const quizController = Container.get('quizController') as typeof QuizController;

    route.all('/', (req: Request, res: Response, next: NextFunction) => {
        next();
    })
    .get('/', quizController.getQuestionByNumber)
    .patch('/', quizController.checkQuestion, quizController.updateQuestionByNumber);
}