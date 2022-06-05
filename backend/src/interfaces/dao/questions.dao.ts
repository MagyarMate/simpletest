import { IListResultParameters } from './../IListResultParameters';
import { RetrieveQuestionDto } from '../dto/retrieve.question.dto';
import { UpdateQuestionDto } from '../dto/update.question.dto';
import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IQuestion } from '../IQuestion';
import { IQuizResult } from '../IQuizResult';
import debug from 'debug';

const log: debug.IDebugger = debug('simpletest:question_dao');

class QuestionsDAO {
    private readonly questionModel: mongoose.Model<IQuestion & mongoose.Document>;
    private readonly quizResultModel: mongoose.Model<IQuizResult & mongoose.Document>;

    constructor() {
        log('QuestionDAO created');
        this.questionModel = Container.get('questionModel') as mongoose.Model<IQuestion & mongoose.Document>;
        this.quizResultModel = Container.get('quizResultModel') as mongoose.Model<IQuizResult & mongoose.Document>;
    }

    async getQuestionByNumber(questionNumber: string): Promise<IQuestion|null> {
        log('getQuestionByNumber: %o', questionNumber);
        try{
            const questionRecord = await this.questionModel.findOne({number: questionNumber});
            return questionRecord as IQuestion;
        } catch(err){
            log('getQuestionByNumber: %o', err);
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

    async getQuestionAmount(): Promise<number> {
        return this.questionModel.countDocuments();
    }

    async getQuizResult(quizId: string): Promise<IQuizResult|null> {
        log('getQuizResult: %o', quizId);
        try{
            const quizRecord = await this.quizResultModel.findOne({quizId});
            return quizRecord as IQuizResult;
        }catch(err){
            return null
        }
    }

    async getQuizResultList({limit = 15, page = 1, username}: IListResultParameters): Promise<IQuizResult[]> {
        log('getQuizResultList: %o', limit, page);
        try{
            if(!username){
                const quizRecordList = await this.quizResultModel.find({}).skip(limit * (page - 1)).limit(limit);
                return quizRecordList as IQuizResult[];
            }
            const quizRecordListFiltered = await this.quizResultModel.find({userId: username}).skip(limit * (page - 1)).limit(limit);
            return quizRecordListFiltered as IQuizResult[];
        }catch(err){
            return [];
        }
    }

    async createQuizResult(quizResult: IQuizResult): Promise<string|null> {
        log('createQuizResult: %o', quizResult);
        try{
            const quizRecord = await this.quizResultModel.create(quizResult);
            return quizRecord.quizId as string;
        }catch(err){
            return null
        }
    }

}

export default new QuestionsDAO();