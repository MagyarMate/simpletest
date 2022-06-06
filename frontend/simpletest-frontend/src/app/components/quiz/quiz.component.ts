import { QuizService } from './../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { IQuestion } from 'src/app/interfaces/question.interface';
import { IQuestionAnswer, IQuestionAnswerPayload } from 'src/app/interfaces/questionanswer.interface';
import { Observer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quiz: IQuestion[] = [];
  answerList: IQuestionAnswer[] = [];


  constructor(private quizService: QuizService, private router: Router) {
    this.getQuiz();
  }

  ngOnInit() {
  }


  updateAnswerList(answerItem: IQuestionAnswer) {
    const itemIndex = this.answerList.findIndex(item => item.questionNumber === answerItem.questionNumber);
    if(itemIndex === -1) {
      this.answerList.push(answerItem);
    }
    else{
      this.answerList[itemIndex] = answerItem;
    }
  }

  getQuiz() {
    this.quizService.getQuestionList().subscribe(
      data => {
        this.quiz.push(...data);
      });
  }

  handleSubmit() {
    interface IQuizId{
      quizId: string;
    }
    const questionObserver: Observer<any> = {
      next: (data: IQuizId) => {console.log('Quiz id: ', data.quizId); this.router.navigate(['/result', data.quizId]);},
      error: (error) => {},
      complete: () => {console.log('Quiz result created');}
    }

    let payload: IQuestionAnswerPayload = {answerList: this.answerList};
    this.quizService.createQuizResult(payload).subscribe(questionObserver);
  }

}
