import { QuizresultComponent } from './../components/quizresult/quizresult.component';
import { ResultComponent } from './../components/result/result.component';
import { LogoutComponent } from './../components/logout/logout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import {AuthGuard} from '../services/auth.guard';
import { QuizComponent } from '../components/quiz/quiz.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'quiz', component: QuizComponent, canActivate: [AuthGuard]},
  {path: 'result/:quizId', component: QuizresultComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
