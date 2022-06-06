import { Router } from '@angular/router';
import { QuizService } from './../../services/quiz.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IQuizResult } from 'src/app/interfaces/quizresult.interface';
import { IQuestionView } from '../questionview/questionview.component';
import { Observable, of } from 'rxjs';
import { IQuestion } from 'src/app/interfaces/question.interface';

export interface IResultAnswer{
  question: IQuestion,
  questionView: IQuestionView,
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnChanges {

  @Input()
  quizId: string = undefined as unknown as string;
  quizResult: IQuizResult = undefined as unknown as IQuizResult;
  quizResultAnswers: IResultAnswer[] = [];
  quizResult$: Observable<IQuizResult> = of();
  refreshed: boolean = false;

  constructor(private quizService: QuizService, private router: Router) {
    this.refreshQuizResult();
   }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshQuizResult();
  }

  ngOnInit() {
    this.quizResult$ = this.quizService.getQuizResult(this.quizId);

  }

  refreshQuizResult(){ // Refactor this
    this.refreshed = false;
    this.quizResultAnswers = [];
    if(this.quizId){
      this.quizService.getQuizResult(this.quizId)
      .subscribe((response) => {
        this.quizResult = response as IQuizResult;
        response.questions.forEach(question => {
          let questionView: IQuestionView = {onlyShowResults: true, answer: question.answer};
          this.quizService.getQuestion(question.questionNumber).subscribe(response => {
            let resultAnswer: IResultAnswer = {question: response as IQuestion, questionView: questionView};
            this.quizResultAnswers.push(resultAnswer);
          })
        });
      }, (error) => {
        this.router.navigate(['/']);
      }, () => {this.refreshed=true;});
    }
  }
}
