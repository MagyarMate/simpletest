import { QuizresultComponent } from './components/quizresult/quizresult.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionviewComponent } from './components/questionview/questionview.component';
import { ResultComponent } from './components/result/result.component';
import { HomeComponent } from './components/home/home.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ResultsSummaryComponent } from './components/results-summary/results-summary.component';

@NgModule({
   declarations: [
      AppComponent,
      TopBarComponent,
      LoginComponent,
      HomeComponent,
      ResultsSummaryComponent,
      ResultComponent,
      QuestionviewComponent,
      QuizComponent,
      QuizresultComponent
   ],
   imports: [
	 BrowserModule,
	 AppRoutingModule,
	 MaterialModule,
   HttpClientModule,
   FormsModule, ReactiveFormsModule,
	 BrowserAnimationsModule
	],
   providers: [
     {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
     FormBuilder,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
