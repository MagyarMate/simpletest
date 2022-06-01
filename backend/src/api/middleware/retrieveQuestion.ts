import {Request, Response, NextFunction} from 'express';
import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IQuestion } from './../../interfaces/IQuestion';

const retrieveQuestion = async (req: Request, res: Response, next: NextFunction) => {
        try{
        const questionModel = Container.get('questionModel') as mongoose.Model<IQuestion & mongoose.Document>;
        const questionNumber = req.query.number;
        if(questionNumber){
            const questionRecord = await questionModel.findOne({number: questionNumber.toString()});
            // tslint:disable-next-line: no-console
            console.log(questionNumber);
            // tslint:disable-next-line: no-console
            console.log(questionRecord);
            if(!questionRecord){
                return res.status(404).send('Question not found');
            }
            return res.status(200).send(questionRecord);
        }
        return next();
    } catch (e){
        return next(e);
    }
}

export default retrieveQuestion;