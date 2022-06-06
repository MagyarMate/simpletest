import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quizresult',
  templateUrl: './quizresult.component.html',
  styleUrls: ['./quizresult.component.css']
})
export class QuizresultComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  quizId: string = '';

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.quizId = routeParams.get('quizId') as string;
  }

  handleClose(){
    this.router.navigate(['/']);
  }

}
