import { RetrieveQuestionDto } from '../dto/retrieve.question.dto';
import { UpdateQuestionDto } from '../dto/update.question.dto';
import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IQuestion } from '../IQuestion';
import debug from 'debug';

const log: debug.IDebugger = debug('simpletest:question_dao');

class QuestionsDAO {
    private readonly questionModel: mongoose.Model<IQuestion & mongoose.Document>;

    constructor() {
        log('QuestionDAO created');
        this.questionModel = Container.get('questionModel') as mongoose.Model<IQuestion & mongoose.Document>;
    }

    async getQuestionByNuber(questionNumber: string): Promise<IQuestion|null> {
        log('getUserByName: %o', questionNumber);
        try{
            const questionRecord = await this.questionModel.findOne({number: questionNumber});
            return questionRecord as IQuestion;
        } catch(err){
            log('getUserByName: %o', err);
            return null;
        }
    }

    async updateQuestionByNumber(questionNumber: string, question: UpdateQuestionDto): Promise<IQuestion|null> {
        log('updateQuestionByNumber: %o', questionNumber, question);
        try{
            const questionRecord = await this.questionModel.findOneAndUpdate({number: questionNumber}, question);
            return questionRecord as IQuestion;
        } catch(err){
            log('updateQuestionByNumber: %o', err);
            return null;
        }
    }
}

export default new QuestionsDAO();