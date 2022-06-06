import { IQuestionResult } from './questionresult.interface';


export interface IQuizResult {
  quizId: string;
  userId: string;
  questions: IQuestionResult[];
}
