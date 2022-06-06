import { IQuestionAnswer } from 'src/app/interfaces/questionanswer.interface';
import { QuizService } from './../../services/quiz.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IQuestion } from 'src/app/interfaces/question.interface';
import { Observer } from 'rxjs';

const exampleQuestion: IQuestion = {
  "_id": "6297c976556d4247b43abefa",
  "number": "1",
  "question": "Melyik NEM jellemzi a polgári jogi normákat?",
  "answer_a": "a mellérendeltség és egyenjogúság",
  "answer_b": "abszolút és relatív jogviszonyok",
  "answer_c": "eltérést engedő normák",
  "answer_d": "kizárólag kógens szabályok ",
  "correct": 4,
  "omit": false
}

export interface IQuestionView{
  onlyShowResults: boolean;
  answer: number
}

@Component({
  selector: 'app-questionview',
  templateUrl: './questionview.component.html',
  styleUrls: ['./questionview.component.css']
})
export class QuestionviewComponent implements OnInit {

  @Input() questionInput: IQuestion|null = null;
  @Input() questionView: IQuestionView | null = null;
  @Output() questionUpdateEvent: EventEmitter<IQuestionAnswer> = new EventEmitter<IQuestionAnswer>();

  isDisabled: boolean = false;
  questionNumber: string = '';
  question: string='';
  answers: string[] = [];
  omitQuestion: boolean = false;

  correctAnswer: number=0;
  selectedAnswer: number=0;

  constructor(private quizService: QuizService) { }

  ngOnInit() {

    if(this.questionInput) {
      this.setQuestion(this.questionInput);
      this.setAnswers(this.questionInput);
    }else{
      this.setQuestion(exampleQuestion);
      this.setAnswers(exampleQuestion);
    }

    if(this.questionView) {
      this.isDisabled = this.questionView.onlyShowResults;
      this.selectedAnswer = this.questionView.answer;
    }

    this.setAnswer();
  }

  answerColor(index: number): string {
    if(!this.isDisabled){
      return 'color:black';
    }
    let color: string = 'black';
    if(this.selectedAnswer === index) {
      color = 'red';
    }
    if(this.correctAnswer === index){
      color = 'green';
    }
    return 'color:' + color;
  }

  questionObserver: Observer<any> = {
    next: (value: IQuestion) => {},
    error: (error: any) => {},
    complete: () => {console.log('Question omission completed');}
  }

  setQuestionOmission(){
    this.quizService.setQuestionOmission(this.questionNumber, this.omitQuestion).subscribe(this.questionObserver)
  }

  private setQuestion(question: IQuestion) {
    this.question = question.question;
    this.questionNumber = question.number;
  }

  private setAnswers(question: IQuestion) {
    this.answers.push(question.answer_a);
    this.answers.push(question.answer_b);
    this.answers.push(question.answer_c);
    this.answers.push(question.answer_d);
    this.correctAnswer = question.correct;
    this.omitQuestion = question.omit;
  }

  setAnswer(){
    let answer: IQuestionAnswer = { questionNumber: parseInt(this.questionNumber, 10), answer: this.selectedAnswer };
    this.questionUpdateEvent.emit(answer);
  }

}
