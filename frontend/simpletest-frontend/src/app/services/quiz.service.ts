import { IQuizResult } from './../interfaces/quizresult.interface';
import { IQuestionResult } from './../interfaces/questionresult.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IQuestion } from '../interfaces/question.interface';
import { IQuestionAnswerPayload } from '../interfaces/questionanswer.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private backendUrl: string = environment.backend_url;
  private quizUrl: string = this.backendUrl + '/quiz';
  private questionUrl: string = this.backendUrl + '/quiz/question';
  private quizResultUrl: string = this.backendUrl + '/quiz/result';

  constructor(private httpClient: HttpClient) { }

  getQuizResultList(username?: string): Observable<IQuizResult[]>{
    let queryParams = new HttpParams();

    if(username) {
      queryParams = queryParams.append('username', username);
    }
    return this.httpClient.get<IQuizResult[]>(this.quizResultUrl, {responseType:'json', params: queryParams })
  }

  getQuizResult(quizId: string): Observable<IQuizResult>{
    return this.httpClient.get<IQuizResult>(this.quizResultUrl + '/' + quizId, {responseType:'json'})
  }

  getQuestion(questionNumber: string): Observable<IQuestion>{
    let queryParams = new HttpParams();
    queryParams.append('number', questionNumber);
    return this.httpClient.get<IQuestion>(this.questionUrl + '?number=' + questionNumber, {responseType:'json', params: queryParams }); // TODO fix this
  }

  getQuestionList(): Observable<IQuestion[]>{
    return this.httpClient.get<IQuestion[]>(this.quizUrl, {responseType:'json'});
  }

  setQuestionOmission(questionNumber: string, omit: boolean): Observable<any>{
    return this.httpClient.patch<any>(this.questionUrl + '?number=' + questionNumber, {omit: omit}); // TODO fix this
  }

  createQuizResult(payload: IQuestionAnswerPayload): Observable<any>{
    return this.httpClient.post<any>(this.quizResultUrl, payload);
  }

}
