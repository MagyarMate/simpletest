import { IListResultParameters } from './../interfaces/IListResultParameters';
import { IQuestionResult } from './../interfaces/IQuestionResult';
import { IQuizResult } from './../interfaces/IQuizResult';
import { IAnswers } from './../interfaces/IAnswers';
import { IQuestion } from './../interfaces/IQuestion';
import { CRUD } from '../interfaces/ICrud';
import QuestionsDao from '../interfaces/dao/questions.dao';
import { RetrieveQuestionDto } from '../interfaces/dto/retrieve.question.dto';
import { UpdateQuestionDto } from '../interfaces/dto/update.question.dto';
import debug from 'debug';

const log = debug('simpletest:quiz_service');

class QuizService implements CRUD {
    async list(limit: number = 15, page: number = 1){
        const questionAmount = await QuestionsDao.getQuestionAmount();
        let questionList: IQuestion[] = [];

        // Creating a list of question numbers
        let questonNumberArray = Array.from({length: questionAmount}, (_, i) => i + 1);
        questonNumberArray = this.fisherYates(questonNumberArray).slice(0, limit + 10); // +10 to gracefully handle corrupted data in the database

        for (const questionNumber of questonNumberArray) {
            const question = await QuestionsDao.getQuestionByNumber(questionNumber.toString()) as IQuestion;
            if (question && !question.omit) {
                questionList.push(question);
            }
        }
        questionList = questionList.slice(0, limit);
        log('Returned question amount: %o', questionList.length);
        return questionList;
    }

    async listResults({limit = 15, page = 1, username}: IListResultParameters){
        log('listResults: %o; not implemented', limit, page);
        const resultList = await QuestionsDao.getQuizResultList({limit, page, username});
        return resultList;
    }

    async getQuizResultById(id: string){
        log('getQuizResultById: %o', id);
        return QuestionsDao.getQuizResult(id);
    }

    async createQuizResult(answers: IAnswers[], username: string){
        log('createQuizResult: %o', answers, username);
        const result: IQuizResult = {userId: username, questions: []};
        for(const answer of answers){
            log('Answer: %o', answer);
            const question = await QuestionsDao.getQuestionByNumber(answer.questionNumber.toString());
            if(question){
                const questionResult: IQuestionResult = {
                    questionNumber: answer.questionNumber,
                    answer: answer.answer,
                    isCorrect: (question.correct === answer.answer)
                }
                result.questions!.push(questionResult);
            }
        }
        return QuestionsDao.createQuizResult(result);
    }

    async create(resource: any){
        log('create: %o; not implemented', resource);
    }

    async putById(id: string, resource: any){
        log('putById: %o; not implemented', id, resource);
        return 'not implemented';
    }

    async readById(id: string){
        log('readById: %o', id);
        return QuestionsDao.getQuestionByNumber(id);
    }

    async deleteById(id: string){
        log('deleteById: %o; not implemented', id);
        return 'not implemented';
    }

    async patchById(id: string, resource: UpdateQuestionDto){
        QuestionsDao.updateQuestionByNumber(id, resource);
        return 'Question updated';
    }

    // Helper functions
    private fisherYates(array: number[]): number[]{
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}

export default new QuizService();