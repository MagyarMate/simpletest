import { IQuizResult } from './../../interfaces/quizresult.interface';
import { AuthService } from './../../services/auth.service';
import { QuizService } from './../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { IQuizResultView } from 'src/app/interfaces/quizresult.view.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-results-summary',
  templateUrl: './results-summary.component.html',
  styleUrls: ['./results-summary.component.css']
})
export class ResultsSummaryComponent implements OnInit {

  constructor(private quizService: QuizService, private authService: AuthService) { }
  proba: IQuizResultView = {quizId: '', userId: '', numberOfQuestions: 0, numberOfCorrectAnswers: 0, result: 0};
  summary: IQuizResult[] = [];

  // View component properties
  summaryResults: IQuizResultView[] = [];
  displayedColumns: string[] = ['userId', 'numberOfQuestions', 'numberOfCorrectAnswers', 'result'];
  clickedRows = new Set<IQuizResultView>();
  clickedRow: IQuizResultView | null = null;


  ngOnInit() {
    const username = this.authService.loggedInUserName? this.authService.loggedInUserName : undefined;

    this.quizService.getQuizResultList(username)
    .subscribe((response) => {
      this.summary = response as IQuizResult[];
      this.summaryResults = this.getSummaryResults(this.summary);
    });
  }

  handleClick(row: IQuizResultView){
    if(this.clickedRow === row){
      this.clickedRow = null;
      return;
    }
    this.clickedRow = row;
  }

  getResultNumber(): number {
    return this.summaryResults.length;
  }

  private getSummaryResults(rawQuizResults: IQuizResult[]): IQuizResultView[] {
    let quizResults: IQuizResultView[] = [];
      this.summary.forEach(quizResult => {
        let tempResult: IQuizResultView = {
          quizId: quizResult.quizId,
          userId: quizResult.userId,
          numberOfQuestions:
          quizResult.questions.length,
          numberOfCorrectAnswers: 0,
          result: 0};
        quizResult.questions.forEach(questionResult => {
          if(questionResult.isCorrect) {
            tempResult.numberOfCorrectAnswers++;
          }
        });
        tempResult.result = tempResult.numberOfCorrectAnswers * 100 / tempResult.numberOfQuestions;
        quizResults.push(tempResult);
      });
    return quizResults;
  }

}
