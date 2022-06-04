import {Request, Response, NextFunction} from 'express';
import quizService from '../../services/quiz.service';
import debug from 'debug';

const log: debug.IDebugger = debug('simpletest:quiz_controller');
export class QuizController{
    async getQuestionByNumber(req: Request, res: Response){
        log(req.body);
        const question = await quizService.readById(req.body.number.toString() as string);
        if(!question){
            return res.status(404).send('Question not found');
        }
        return res.status(200).send(question);
    }

    async updateQuestionByNumber(req: Request, res: Response){
        quizService.patchById(req.body.number.toString() as string, req.body);
        return res.status(200).send('Question updated');
    }

    async checkQuestion(req: Request, res: Response, next: NextFunction){
        try{
            const question = await quizService.readById(req.body.number.toString() as string);
            if(!question){
                return res.status(404).send('Question not found');
            }
        return next();
        }catch(err){
            return next(err);
        }
    }

}

export default new QuizController();