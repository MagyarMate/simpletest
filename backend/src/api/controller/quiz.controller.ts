import {Request, Response, NextFunction} from 'express';
import quizService from '../../services/quiz.service';
import debug from 'debug';

const log: debug.IDebugger = debug('simpletest:quiz_controller');
export class QuizController{
    async getQuestionByNumber(req: Request, res: Response){
        log(req.body);
        const question = await quizService.readById(req.query.number?.toString() as string);
        if(!question){
            return res.status(404).send('Question not found');
        }
        return res.status(200).send(question);
    }

    async updateQuestionByNumber(req: Request, res: Response){
        quizService.patchById(req.query.number?.toString() as string, req.body);
        return res.status(200).send('Question updated');
    }

    async checkQuestion(req: Request, res: Response, next: NextFunction){
        try{
            const question = await quizService.readById(req.query.number?.toString() as string);
            if(!question){
                return res.status(404).send('Question not found');
            }
        return next();
        }catch(err){
            return next(err);
        }
    }

    async getRandomQuestionList(req: Request, res: Response){
        const question = await quizService.list();
        if(!question){
            return res.status(500).send('Internal server error');
        }
        return res.status(200).send(question);
    }

    async getQuizResultList(req: Request, res: Response){
        log('Req body currentUser:%o',req.query.username);
        const currentUser = req.query.username?.toString() as string;
        const results = await quizService.listResults({username: currentUser});
        if(!results){
            return res.status(500).send('Internal server error');
        }
        return res.status(200).send(results);
    }

    async getQuizResult(req: Request, res: Response){
        const currentUser = req.body.currentUser;
        const resultId = req.params.resultId;
        const result = await quizService.getQuizResultById(resultId as string);
        if(!result){
            return res.status(404).send('Result not found');
        }
        return res.status(200).send(result);
    }

    async createQuizResult(req: Request, res: Response){
        const userName = req.body.currentUser;
        const answerList = req.body.answerList;
        log('Req body answerlist:%o',req.body.answerList);
        log('Req body currentUser:%o',req.body.currentUser);
        const quizId = await quizService.createQuizResult(answerList, userName);
        if(!quizId){
            return res.status(500).send('Internal server error');
        }
        return res.status(200).send(quizId);
    }

}

export default new QuizController();