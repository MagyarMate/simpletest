import { IQuestionResult } from './IQuestionResult';

export interface IQuizResult {
    quizId?: string;
    userId: string;
    questions?: IQuestionResult[];
}